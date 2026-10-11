# trustport/identity-laravel

TrustPort Identity for PHP and Laravel: OIDC login (authorization code + PKCE, state, nonce), offline token verification,
userinfo, revoke, RP-initiated logout, a login/callback/logout controller and a bearer-token middleware.

```bash
composer require trustport/identity-laravel
php artisan vendor:publish --tag=trustport-config
```

```dotenv
TRUSTPORT_ISSUER=https://id.example.com
TRUSTPORT_CLIENT_ID=...
TRUSTPORT_CLIENT_SECRET=...
TRUSTPORT_REDIRECT_URI=https://app.example.com/auth/trustport/callback
```

- **Web login:** send users to `route('trustport.login')`. Set `config('trustport.user_resolver')` to a callable
  `fn(array $claims, array $tokens) => User` that finds or creates your user; the package then calls `Auth::login()`.
- **API protection:** `Route::get('/x', ...)->middleware('trustport.auth');` or `'trustport.auth:admin,editor'` for roles.
  Claims are on `$request->attributes->get('trustport_claims')`.
- **Plain PHP (no Laravel):** use `TrustPort\Identity\Client` directly; it needs only Guzzle and firebase/php-jwt.

Requires firebase/php-jwt ^7 (6.x is blocked by a published security advisory).
Status: 0.1.0. `Client` and the middleware are covered by tests; the service provider, routes and `AuthController`
are only syntax-checked and still need a test inside a real Laravel app.
