# trustport-identity (Python)

TrustPort Identity for Python: OIDC login (authorization code + PKCE, state, nonce), offline token verification, userinfo,
revoke, RP-initiated logout, plus FastAPI and Flask helpers. Python 3.9+. Dependencies: httpx, PyJWT[crypto].

```python
from trustport_identity import TrustPortIdentity
from trustport_identity.fastapi import bearer_claims

identity = TrustPortIdentity.from_env()      # TRUSTPORT_ISSUER, _CLIENT_ID, _CLIENT_SECRET, _REDIRECT_URI, _AUDIENCE

# Web login
req = identity.create_authorization_request()   # keep state / nonce / code_verifier in the session, redirect to req["url"]
result = identity.handle_callback(query_params, req)   # -> {"tokens": ..., "claims": ...}

# Protect an API
@app.get("/admin")
def admin(claims=Depends(bearer_claims(identity, roles=["admin"]))): ...

# Flask: @require_auth(identity, roles=["admin"])  (from trustport_identity.flask; claims in flask.g.trustport_claims)
```

Public clients (no `client_secret`) authenticate with PKCE only. The client is synchronous.
Status: 0.1.0. Core, FastAPI and Flask are tested; a Django integration is not written yet.
