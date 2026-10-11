import base64
import hashlib
import json
import threading
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient
from flask import Flask, g

from trustport_identity import TrustPortError, TrustPortIdentity
from trustport_identity.fastapi import bearer_claims
from trustport_identity.flask import require_auth


def b64u(b: bytes) -> str:
    return base64.urlsafe_b64encode(b).rstrip(b"=").decode()


def int_b64u(n: int) -> str:
    return b64u(n.to_bytes((n.bit_length() + 7) // 8, "big"))


class Provider:
    def __init__(self):
        self.key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
        nums = self.key.public_key().public_numbers()
        self.jwk = {"kty": "RSA", "kid": "k1", "alg": "RS256", "use": "sig", "n": int_b64u(nums.n), "e": int_b64u(nums.e)}
        self.codes = {}
        self.seen_auth = []
        provider = self

        class H(BaseHTTPRequestHandler):
            def log_message(self, *a):
                pass

            def _json(self, obj, status=200):
                body = json.dumps(obj).encode()
                self.send_response(status)
                self.send_header("content-type", "application/json")
                self.send_header("content-length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def do_GET(self):
                p = urlparse(self.path).path
                iss = provider.issuer
                if p == "/.well-known/openid-configuration":
                    self._json({"issuer": iss, "authorization_endpoint": iss + "/oauth/authorize", "token_endpoint": iss + "/oauth/token",
                                "jwks_uri": iss + "/jwks", "userinfo_endpoint": iss + "/oidc/userinfo", "end_session_endpoint": iss + "/oidc/logout"})
                elif p == "/jwks":
                    self._json({"keys": [provider.jwk]})
                elif p == "/oidc/userinfo":
                    self._json({"sub": "u1", "email": "a@b.c"})
                else:
                    self._json({}, 404)

            def do_POST(self):
                form = parse_qs(self.rfile.read(int(self.headers["content-length"])).decode())
                provider.seen_auth.append(self.headers.get("authorization"))
                entry = provider.codes.get(form.get("code", [""])[0])
                ok = entry and b64u(hashlib.sha256(form.get("code_verifier", [""])[0].encode()).digest()) == entry["challenge"]
                if not ok:
                    return self._json({"error": "invalid_grant", "error_description": "bad code or verifier"}, 400)
                access = provider.sign({"roles": ["admin"]}, "api")
                at_hash = b64u(hashlib.sha256(access.encode()).digest()[:16])
                self._json({"access_token": access, "token_type": "Bearer", "expires_in": 300,
                            "id_token": provider.sign({"nonce": entry["nonce"], "at_hash": at_hash}, "app1")})

        self.server = HTTPServer(("127.0.0.1", 0), H)
        self.issuer = f"http://127.0.0.1:{self.server.server_port}"
        threading.Thread(target=self.server.serve_forever, daemon=True).start()

    def sign(self, claims, aud, key=None):
        now = int(time.time())
        pem = (key or self.key).private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption())
        return jwt.encode({"iss": self.issuer, "aud": aud, "sub": "u1", "iat": now, "exp": now + 300, **claims}, pem, algorithm="RS256", headers={"kid": "k1"})

    def issue_code(self, challenge, nonce):
        code = f"code-{len(self.codes)}"
        self.codes[code] = {"challenge": challenge, "nonce": nonce}
        return code


@pytest.fixture()
def provider():
    p = Provider()
    yield p
    p.server.shutdown()


def make(p, **kw):
    return TrustPortIdentity(p.issuer, "app1", client_secret=kw.pop("client_secret", "s3cret"), redirect_uri="http://app/cb", audience="api", **kw)


def test_full_login(provider):
    ident = make(provider)
    req = ident.create_authorization_request()
    q = parse_qs(urlparse(req["url"]).query)
    assert q["code_challenge_method"] == ["S256"]
    code = provider.issue_code(q["code_challenge"][0], req["nonce"])
    out = ident.handle_callback({"code": code, "state": req["state"], "iss": provider.issuer}, req)
    assert out["claims"]["sub"] == "u1"
    assert ident.verify_access_token(out["tokens"]["access_token"])["roles"] == ["admin"]
    assert ident.userinfo(out["tokens"]["access_token"])["email"] == "a@b.c"
    assert provider.seen_auth[-1].startswith("Basic ")


def test_public_client_sends_no_basic_auth(provider):
    ident = make(provider, client_secret=None)
    req = ident.create_authorization_request()
    q = parse_qs(urlparse(req["url"]).query)
    code = provider.issue_code(q["code_challenge"][0], req["nonce"])
    ident.handle_callback({"code": code, "state": req["state"]}, req)
    assert provider.seen_auth[-1] is None


def test_callback_rejections(provider):
    ident = make(provider)
    req = ident.create_authorization_request()
    with pytest.raises(TrustPortError, match="state mismatch"):
        ident.handle_callback({"code": "x", "state": "nope"}, req)
    with pytest.raises(TrustPortError, match="issuer mismatch"):
        ident.handle_callback({"code": "x", "state": req["state"], "iss": "https://evil"}, req)
    with pytest.raises(TrustPortError, match="access_denied"):
        ident.handle_callback({"error": "access_denied", "state": req["state"]}, req)
    # a code bound to a different PKCE challenge must fail at the token endpoint
    code = provider.issue_code("some-other-challenge", req["nonce"])
    with pytest.raises(TrustPortError, match="invalid_grant"):
        ident.handle_callback({"code": code, "state": req["state"]}, req)


def test_token_verification_rules(provider):
    ident = make(provider)
    with pytest.raises(TrustPortError, match="ID token"):
        ident.verify_access_token(provider.sign({"token_use": "id"}, "api"))
    with pytest.raises(TrustPortError):
        ident.verify_access_token(provider.sign({}, "someone-else"))
    other = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    with pytest.raises(TrustPortError):  # forged: attacker key, claims kid k1
        ident.verify_access_token(provider.sign({}, "api", key=other))
    with pytest.raises(TrustPortError, match="nonce mismatch"):
        ident.verify_id_token(provider.sign({"nonce": "other"}, "app1"), nonce="expected")


def test_fastapi_dependency(provider):
    ident = make(provider)
    app = FastAPI()

    @app.get("/me")
    def me(claims=Depends(bearer_claims(ident))):
        return {"sub": claims["sub"]}

    @app.get("/admin")
    def admin(claims=Depends(bearer_claims(ident, roles=["admin"]))):
        return {"ok": True}

    c = TestClient(app)
    assert c.get("/me").status_code == 401
    assert c.get("/me", headers={"Authorization": "Bearer junk"}).status_code == 401
    ok = {"Authorization": "Bearer " + provider.sign({"roles": ["admin"]}, "api")}
    assert c.get("/me", headers=ok).json() == {"sub": "u1"}
    viewer = {"Authorization": "Bearer " + provider.sign({"roles": ["viewer"]}, "api")}
    assert c.get("/admin", headers=viewer).status_code == 403
    assert c.get("/admin", headers=ok).status_code == 200


def test_flask_decorator(provider):
    ident = make(provider)
    app = Flask(__name__)

    @app.get("/admin")
    @require_auth(ident, roles=["admin"])
    def admin():
        return {"sub": g.trustport_claims["sub"]}

    c = app.test_client()
    assert c.get("/admin").status_code == 401
    viewer = {"Authorization": "Bearer " + provider.sign({"roles": ["viewer"]}, "api")}
    assert c.get("/admin", headers=viewer).status_code == 403
    ok = {"Authorization": "Bearer " + provider.sign({"roles": ["admin"]}, "api")}
    assert c.get("/admin", headers=ok).get_json() == {"sub": "u1"}


def test_signing_keys_are_fetched_with_our_user_agent_and_refetched_on_rotation(provider):
    seen = []
    ident = make(provider)
    orig = ident._http.get
    ident._http.get = lambda url, **kw: (seen.append(ident._http.headers.get("user-agent")), orig(url, **kw))[1]
    ident.verify_access_token(provider.sign({}, "api"))
    assert any("trustport-identity-python" in (ua or "") for ua in seen)
    # rotation: a new kid appears; within the refetch window it is refused, after it the keys are reloaded
    provider.jwk["kid"] = "k2"
    token = jwt.encode({"iss": provider.issuer, "aud": "api", "exp": int(time.time()) + 300},
                       provider.key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()),
                       algorithm="RS256", headers={"kid": "k2"})
    with pytest.raises(TrustPortError, match="no signing key"):
        ident.verify_access_token(token)
    ident._keys_fetched_at = 0
    assert ident.verify_access_token(token)["iss"] == provider.issuer
