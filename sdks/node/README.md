# @trustport/identity-node

TrustPort Identity for Node.js: OIDC login (authorization code + PKCE, state, nonce), offline token verification, userinfo,
revoke, RP-initiated logout, and Express middleware. One runtime dependency (`jose`).

```ts
import { TrustPortIdentity } from '@trustport/identity-node';
import { requireAuth, requireRole } from '@trustport/identity-node/express';

const identity = TrustPortIdentity.fromEnv();   // TRUSTPORT_ISSUER, _CLIENT_ID, _CLIENT_SECRET, _REDIRECT_URI

// Web login
const req = await identity.createAuthorizationRequest();   // keep req.state/nonce/codeVerifier in the session, redirect to req.url
const { tokens, claims } = await identity.handleCallback(query, req);

// Protect an API
app.get('/admin', requireAuth(identity), requireRole('admin'), (r, s) => s.json(r.auth));
```

Public clients (no `clientSecret`) authenticate with PKCE only. See `examples/express`.
Status: 0.1.0, tested against a fake provider; not yet run against the live `feat/oidc-provider` build.
