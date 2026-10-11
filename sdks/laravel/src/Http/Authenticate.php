<?php

namespace TrustPort\Identity\Http;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use TrustPort\Identity\Client;
use TrustPort\Identity\TrustPortException;

/** Route middleware `trustport.auth[:role1,role2]`: requires a valid bearer token (and, optionally, one of the roles). */
class Authenticate
{
    public function __construct(private Client $client)
    {
    }

    public function handle(Request $request, Closure $next, string ...$roles)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return new JsonResponse(['error' => 'invalid_request'], 401, ['WWW-Authenticate' => 'Bearer error="invalid_request"']);
        }
        try {
            $claims = $this->client->verifyAccessToken($token);
        } catch (TrustPortException) {
            return new JsonResponse(['error' => 'invalid_token'], 401, ['WWW-Authenticate' => 'Bearer error="invalid_token"']);
        }
        if ($roles && !array_intersect($roles, (array) ($claims['roles'] ?? []))) {
            return new JsonResponse(['error' => 'insufficient_role'], 403);
        }
        $request->attributes->set('trustport_claims', $claims);
        return $next($request);
    }
}
