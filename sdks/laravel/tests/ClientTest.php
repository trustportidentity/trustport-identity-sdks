<?php

namespace TrustPort\Identity\Tests;

use Firebase\JWT\JWT;
use GuzzleHttp\Client as Http;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;
use TrustPort\Identity\Client;
use TrustPort\Identity\Http\Authenticate;
use TrustPort\Identity\TrustPortException;

class ClientTest extends TestCase
{
    private const ISS = 'https://id.test';
    private $key;
    private string $pem;
    private array $jwks;
    private array $sent = [];

    protected function setUp(): void
    {
        $this->key = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
        openssl_pkey_export($this->key, $pem);
        $this->pem = $pem;
        $d = openssl_pkey_get_details($this->key)['rsa'];
        $this->jwks = ['keys' => [['kty' => 'RSA', 'kid' => 'k1', 'alg' => 'RS256', 'use' => 'sig',
            'n' => Client::b64url($d['n']), 'e' => Client::b64url($d['e'])]]];
    }

    private function sign(array $claims, string $aud, string $kid = 'k1'): string
    {
        return JWT::encode(['iss' => self::ISS, 'aud' => $aud, 'sub' => 'u1', 'iat' => time(), 'exp' => time() + 300] + $claims, $this->pem, 'RS256', $kid);
    }

    private function discovery(): Response
    {
        return new Response(200, [], json_encode([
            'issuer' => self::ISS, 'authorization_endpoint' => self::ISS . '/oauth/authorize', 'token_endpoint' => self::ISS . '/oauth/token',
            'jwks_uri' => self::ISS . '/jwks', 'userinfo_endpoint' => self::ISS . '/oidc/userinfo', 'end_session_endpoint' => self::ISS . '/oidc/logout',
        ]));
    }

    private function client(array $responses, array $extra = []): Client
    {
        $stack = HandlerStack::create(new MockHandler($responses));
        $stack->push(Middleware::history($this->sent));
        return new Client(['issuer' => self::ISS, 'client_id' => 'app1', 'client_secret' => 's3cret', 'redirect_uri' => 'http://app/cb', 'audience' => 'api'] + $extra,
            new Http(['handler' => $stack]));
    }

    public function testFullLoginVerifiesPkceStateNonceAndAtHash(): void
    {
        $access = $this->sign(['roles' => ['admin']], 'api');
        $c = $this->client([
            $this->discovery(),
            new Response(200, [], json_encode(['access_token' => $access, 'token_type' => 'Bearer', 'expires_in' => 300, 'id_token' => 'PLACEHOLDER'])),
        ]);
        $req = $c->createAuthorizationRequest();
        parse_str(parse_url($req['url'], PHP_URL_QUERY), $q);
        $this->assertSame('S256', $q['code_challenge_method']);
        $this->assertSame(Client::b64url(hash('sha256', $req['code_verifier'], true)), $q['code_challenge']);

        $half = Client::b64url(substr(hash('sha256', $access, true), 0, 16));
        $id = $this->sign(['nonce' => $req['nonce'], 'at_hash' => $half], 'app1');
        $c = $this->client([
            $this->discovery(),
            new Response(200, [], json_encode(['access_token' => $access, 'token_type' => 'Bearer', 'id_token' => $id])),
            new Response(200, [], json_encode($this->jwks)),
        ]);
        $c->createAuthorizationRequest();
        $out = $c->handleCallback(['code' => 'c1', 'state' => $req['state'], 'iss' => self::ISS], $req);
        $this->assertSame('u1', $out['claims']['sub']);
        // the token request used client_secret_basic and sent the verifier
        $tokenReq = null;
        foreach ($this->sent as $t) {
            if ($t['request']->getUri()->getPath() === '/oauth/token') {
                $tokenReq = $t['request'];
            }
        }
        $this->assertNotNull($tokenReq);
        $this->assertStringStartsWith('Basic ', $tokenReq->getHeaderLine('Authorization'));
        $this->assertStringContainsString('code_verifier=' . $req['code_verifier'], (string) $tokenReq->getBody());
    }

    public function testRejectsBadStateIssuerErrorAndNonce(): void
    {
        $c = $this->client([$this->discovery()]);
        $req = $c->createAuthorizationRequest();
        foreach ([
            [['code' => 'x', 'state' => 'nope'], 'state mismatch'],
            [['code' => 'x', 'state' => $req['state'], 'iss' => 'https://evil'], 'issuer mismatch'],
            [['error' => 'access_denied', 'state' => $req['state']], 'access_denied'],
        ] as [$params, $msg]) {
            try {
                $c->handleCallback($params, $req);
                $this->fail("expected failure: $msg");
            } catch (TrustPortException $e) {
                $this->assertStringContainsString($msg, $e->getMessage());
            }
        }
        $c2 = $this->client([$this->discovery(), new Response(200, [], json_encode($this->jwks))]);
        $this->expectExceptionMessage('nonce mismatch');
        $c2->verifyIdToken($this->sign(['nonce' => 'other'], 'app1'), 'expected');
    }

    public function testAccessTokenRefusesIdTokensWrongAudienceAndForeignKeys(): void
    {
        $c = $this->client([$this->discovery(), new Response(200, [], json_encode($this->jwks))]);
        $this->assertSame(['admin'], $c->verifyAccessToken($this->sign(['roles' => ['admin']], 'api'))['roles']);
        foreach ([
            [$this->sign(['token_use' => 'id'], 'api'), 'ID token'],
            [$this->sign([], 'someone-else'), 'audience'],
        ] as [$jwt, $msg]) {
            try {
                $c->verifyAccessToken($jwt);
                $this->fail("expected failure: $msg");
            } catch (TrustPortException $e) {
                $this->assertStringContainsString($msg, $e->getMessage());
            }
        }
        // signed by a different key but claiming kid k1: signature must fail
        $other = openssl_pkey_new(['private_key_bits' => 2048]);
        openssl_pkey_export($other, $otherPem);
        $forged = JWT::encode(['iss' => self::ISS, 'aud' => 'api', 'exp' => time() + 300], $otherPem, 'RS256', 'k1');
        $this->expectException(TrustPortException::class);
        $c->verifyAccessToken($forged);
    }

    public function testMiddleware(): void
    {
        $c = $this->client([$this->discovery(), new Response(200, [], json_encode($this->jwks))]);
        $mw = new Authenticate($c);
        $next = fn ($r) => new \Illuminate\Http\Response('ok');
        $req = fn (?string $tok) => Request::create('/x', 'GET', [], [], [], $tok ? ['HTTP_AUTHORIZATION' => "Bearer $tok"] : []);

        $this->assertSame(401, $mw->handle($req(null), $next)->getStatusCode());
        $this->assertSame(403, $mw->handle($req($this->sign(['roles' => ['viewer']], 'api')), $next, 'admin')->getStatusCode());
        $ok = $req($this->sign(['roles' => ['admin']], 'api'));
        $this->assertSame(200, $mw->handle($ok, $next, 'admin')->getStatusCode());
        $this->assertSame('u1', $ok->attributes->get('trustport_claims')['sub']);
    }
}
