# @trustport/identity-js

TrustPort Identity for single-page apps and any JS host: a **public-client** OIDC client (authorization code + PKCE, state, nonce)
with session handling, automatic refresh, userinfo, logout, and React hooks. Zero runtime dependencies. Tokens live in memory.

```ts
import { TrustPortClient, browserPlatform } from '@trustport/identity-js';

const client = new TrustPortClient({
  issuer: 'https://id.example.com',
  clientId: '...',                       // a public client from TrustPort Admin > Applications; no secret
  redirectUri: window.location.origin + '/',
  platform: browserPlatform(),
});
await client.login();                     // redirects to TrustPort
// back on the redirect URL:
if (client.isRedirectCallback(location.href)) await client.handleRedirectCallback(location.href);
const token = await client.getAccessToken();   // refreshes when close to expiry
```

React:

```tsx
import { IdentityProvider, useIdentity, SignedIn, useHasRole } from '@trustport/identity-js/react';

<IdentityProvider client={client}><App /></IdentityProvider>

function App() {
  const { status, user, login, logout } = useIdentity();
  return status === 'authenticated' ? <button onClick={() => logout()}>{user.email}: sign out</button>
                                    : <button onClick={() => login()}>Sign in with TrustPort</button>;
}
```

`IdentityProvider` completes the callback on load exactly once (safe under React StrictMode) and cleans the URL.

**Security notes**
- ID-token *claims* are validated (`iss`, `aud`, `exp`, `nonce`, `at_hash`) but the *signature* is not: the token arrives directly from the
  token endpoint over TLS, which OIDC Core 3.1.3.7 permits, and it keeps this package free of crypto dependencies (React Native has no WebCrypto).
  Verify access tokens on your **server** with the Node, Laravel, Python or .NET SDK; never trust claims from this client for authorization.
- Tokens are kept in memory only. A page reload re-runs sign-in, which is silent while the TrustPort session is alive.
- `Platform` is the porting seam: the Expo package supplies a native one.

Status: 0.1.0, 9 tests (core flows, claim checks, refresh, restore, logout, React incl. StrictMode). Needs a public-client registration
and the app's origin as a redirect URI on the server side.
