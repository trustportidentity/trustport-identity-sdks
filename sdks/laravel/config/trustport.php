<?php

return [
    'issuer' => env('TRUSTPORT_ISSUER'),
    'client_id' => env('TRUSTPORT_CLIENT_ID'),
    'client_secret' => env('TRUSTPORT_CLIENT_SECRET'),
    'redirect_uri' => env('TRUSTPORT_REDIRECT_URI'),
    'scopes' => ['openid', 'profile', 'email'],
    'audience' => env('TRUSTPORT_AUDIENCE'),
    // callable(array $claims, array $tokens): \Illuminate\Contracts\Auth\Authenticatable, e.g. [App\Auth\Resolver::class, 'fromClaims']
    'user_resolver' => null,
    'home' => '/',
    'routes' => true,
];
