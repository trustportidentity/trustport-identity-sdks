<?php

namespace TrustPort\Identity;

use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use GuzzleHttp\Client as Http;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Framework-free TrustPort Identity client: OIDC discovery, authorization code + PKCE, token verification.
 * Config: issuer, client_id, client_secret (omit for public clients), redirect_uri, scopes, audience, leeway.
 */
class Client
{
    private array $config;
    private ClientInterface $http;
    private ?array $discovery = null;
    private ?array $jwks = null;

    public function __construct(array $config, ?ClientInterface $http = null)
    {
        foreach (['issuer', 'client_id'] as $required) {
            if (empty($config[$required])) {
                throw new TrustPortException("$required is required", 'config');
            }
        }
        $config['issuer'] = rtrim($config['issuer'], '/');
        $this->config = $config;
        $this->http = $http ?? new Http(['timeout' => 10]);
    }

    public static function b64url(string $raw): string
    {
        return rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
    }

    public function discover(): array
    {
        if ($this->discovery !== null) {
            return $this->discovery;
        }
        $doc = $this->getJson($this->config['issuer'] . '/.well-known/openid-configuration');
        if (rtrim((string) ($doc['issuer'] ?? ''), '/') !== $this->config['issuer']) {
            throw new TrustPortException('discovery issuer mismatch', 'discovery');
        }
        return $this->discovery = $doc;
    }

    /** @return array{url:string,state:string,nonce:string,code_verifier:string} keep state/nonce/code_verifier in the session */
    public function createAuthorizationRequest(array $opts = []): array
    {
        $doc = $this->discover();
        $redirect = $opts['redirect_uri'] ?? $this->config['redirect_uri'] ?? null;
        if (!$redirect) {
            throw new TrustPortException('redirect_uri is required', 'config');
        }
        $state = self::b64url(random_bytes(24));
        $nonce = self::b64url(random_bytes(24));
        $verifier = self::b64url(random_bytes(48));
        $query = [
            'response_type' => 'code',
            'client_id' => $this->config['client_id'],
            'redirect_uri' => $redirect,
            'scope' => implode(' ', $opts['scopes'] ?? $this->config['scopes'] ?? ['openid', 'profile', 'email']),
            'state' => $state,
            'nonce' => $nonce,
            'code_challenge' => self::b64url(hash('sha256', $verifier, true)),
            'code_challenge_method' => 'S256',
        ] + (isset($opts['login_hint']) ? ['login_hint' => $opts['login_hint']] : []) + ($opts['extra'] ?? []);
        $sep = str_contains($doc['authorization_endpoint'], '?') ? '&' : '?';
        return [
            'url' => $doc['authorization_endpoint'] . $sep . http_build_query($query, '', '&', PHP_QUERY_RFC3986),
            'state' => $state,
            'nonce' => $nonce,
            'code_verifier' => $verifier,
        ];
    }

    /** @return array{tokens:array,claims:array} */
    public function handleCallback(array $params, array $saved, ?string $redirectUri = null): array
    {
        if (!empty($params['error'])) {
            $desc = isset($params['error_description']) ? ': ' . $params['error_description'] : '';
            throw new TrustPortException($params['error'] . $desc, $params['error']);
        }
        if (!isset($saved['state'], $saved['nonce'], $saved['code_verifier'])
            || !hash_equals((string) $saved['state'], (string) ($params['state'] ?? ''))) {
            throw new TrustPortException('state mismatch', 'state_mismatch');
        }
        if (isset($params['iss']) && rtrim($params['iss'], '/') !== $this->config['issuer']) {
            throw new TrustPortException('issuer mismatch in callback', 'iss_mismatch');
        }
        if (empty($params['code'])) {
            throw new TrustPortException('missing code', 'missing_code');
        }
        $redirect = $redirectUri ?? $this->config['redirect_uri'] ?? null;
        if (!$redirect) {
            throw new TrustPortException('redirect_uri is required', 'config');
        }
        $tokens = $this->tokenRequest([
            'grant_type' => 'authorization_code',
            'code' => $params['code'],
            'redirect_uri' => $redirect,
            'code_verifier' => $saved['code_verifier'],
        ]);
        if (empty($tokens['id_token'])) {
            throw new TrustPortException('no id_token returned (was the openid scope requested?)', 'no_id_token');
        }
        $claims = $this->verifyIdToken($tokens['id_token'], $saved['nonce'], $tokens['access_token']);
        return ['tokens' => $tokens, 'claims' => $claims];
    }

    public function verifyIdToken(string $idToken, ?string $nonce = null, ?string $accessToken = null): array
    {
        $claims = $this->decode($idToken, $this->config['client_id']);
        if ($nonce !== null && !hash_equals($nonce, (string) ($claims['nonce'] ?? ''))) {
            throw new TrustPortException('nonce mismatch', 'nonce_mismatch');
        }
        if ($accessToken !== null && isset($claims['at_hash'])
            && !hash_equals(self::b64url(substr(hash('sha256', $accessToken, true), 0, 16)), (string) $claims['at_hash'])) {
            throw new TrustPortException('at_hash mismatch', 'at_hash_mismatch');
        }
        return $claims;
    }

    /** Offline check of a bearer access token. ID tokens are refused. */
    public function verifyAccessToken(string $token): array
    {
        $claims = $this->decode($token, $this->config['audience'] ?? null);
        if (($claims['token_use'] ?? null) === 'id') {
            throw new TrustPortException('an ID token is not an access token', 'wrong_token_type');
        }
        return $claims;
    }

    public function refresh(string $refreshToken): array
    {
        return $this->tokenRequest(['grant_type' => 'refresh_token', 'refresh_token' => $refreshToken]);
    }

    public function userinfo(string $accessToken): array
    {
        $doc = $this->discover();
        if (empty($doc['userinfo_endpoint'])) {
            throw new TrustPortException('provider has no userinfo endpoint', 'unsupported');
        }
        return $this->getJson($doc['userinfo_endpoint'], ['Authorization' => "Bearer $accessToken"]);
    }

    public function revoke(string $token, string $hint = 'refresh_token'): void
    {
        $doc = $this->discover();
        if (empty($doc['revocation_endpoint'])) {
            throw new TrustPortException('provider has no revocation endpoint', 'unsupported');
        }
        $res = $this->clientPost($doc['revocation_endpoint'], ['token' => $token, 'token_type_hint' => $hint]);
        if ($res->getStatusCode() >= 300) {
            throw new TrustPortException('revocation failed (' . $res->getStatusCode() . ')', 'revoke');
        }
    }

    public function logoutUrl(?string $idTokenHint = null, ?string $postLogoutRedirectUri = null, ?string $state = null): ?string
    {
        $doc = $this->discover();
        if (empty($doc['end_session_endpoint'])) {
            return null;
        }
        $q = array_filter([
            'id_token_hint' => $idTokenHint,
            'post_logout_redirect_uri' => $postLogoutRedirectUri,
            'state' => $state,
        ]);
        return $doc['end_session_endpoint'] . ($q ? (str_contains($doc['end_session_endpoint'], '?') ? '&' : '?') . http_build_query($q, '', '&', PHP_QUERY_RFC3986) : '');
    }

    private function decode(string $jwt, ?string $audience): array
    {
        JWT::$leeway = $this->config['leeway'] ?? 5;
        try {
            $claims = $this->tryDecode($jwt);
        } catch (\UnexpectedValueException $e) {
            if (!str_contains($e->getMessage(), 'kid')) {
                throw new TrustPortException($e->getMessage(), 'invalid_token');
            }
            $this->jwks = null; // unknown kid: keys may have rotated, refetch once
            try {
                $claims = $this->tryDecode($jwt);
            } catch (\Throwable $e2) {
                throw new TrustPortException($e2->getMessage(), 'invalid_token');
            }
        } catch (\Throwable $e) {
            throw new TrustPortException($e->getMessage(), 'invalid_token');
        }
        if (rtrim((string) ($claims['iss'] ?? ''), '/') !== $this->config['issuer']) {
            throw new TrustPortException('invalid issuer', 'invalid_token');
        }
        if ($audience !== null && !in_array($audience, (array) ($claims['aud'] ?? []), true)) {
            throw new TrustPortException('invalid audience', 'invalid_token');
        }
        return $claims;
    }

    private function tryDecode(string $jwt): array
    {
        $this->jwks ??= $this->getJson($this->discover()['jwks_uri']);
        return (array) JWT::decode($jwt, JWK::parseKeySet($this->jwks, 'RS256'));
    }

    private function clientPost(string $url, array $form)
    {
        $opts = ['headers' => ['Accept' => 'application/json'], 'http_errors' => false];
        if (!empty($this->config['client_secret'])) {
            $opts['auth'] = [rawurlencode($this->config['client_id']), rawurlencode($this->config['client_secret'])];
        } else {
            $form['client_id'] = $this->config['client_id']; // public client: PKCE is the proof
        }
        $opts['form_params'] = $form;
        try {
            return $this->http->request('POST', $url, $opts);
        } catch (GuzzleException $e) {
            throw new TrustPortException($e->getMessage(), 'network');
        }
    }

    private function tokenRequest(array $form): array
    {
        $res = $this->clientPost($this->discover()['token_endpoint'], $form);
        $json = json_decode((string) $res->getBody(), true) ?: [];
        if ($res->getStatusCode() >= 300) {
            $desc = isset($json['error_description']) ? ': ' . $json['error_description'] : '';
            throw new TrustPortException(($json['error'] ?? 'token_error') . $desc, $json['error'] ?? 'token_error');
        }
        if (isset($json['expires_in'])) {
            $json['expires_at'] = time() + (int) $json['expires_in'];
        }
        return $json;
    }

    private function getJson(string $url, array $headers = []): array
    {
        try {
            $res = $this->http->request('GET', $url, ['headers' => $headers + ['Accept' => 'application/json'], 'http_errors' => false]);
        } catch (GuzzleException $e) {
            throw new TrustPortException($e->getMessage(), 'network');
        }
        if ($res->getStatusCode() >= 300) {
            throw new TrustPortException("GET $url failed (" . $res->getStatusCode() . ')', 'http');
        }
        return json_decode((string) $res->getBody(), true) ?: [];
    }
}
