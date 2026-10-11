from __future__ import annotations

import base64
import hashlib
import hmac
import os
import secrets
import time
from typing import Any, Mapping, Optional, Sequence
from urllib.parse import urlencode

import httpx
import jwt
from jwt import PyJWK

from .errors import TrustPortError


USER_AGENT = "trustport-identity-python/0.1.0"
_JWKS_REFETCH_MIN_SECONDS = 30  # an unknown kid triggers a refetch (key rotation), but not more often than this


def _b64url(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode()


class TrustPortIdentity:
    """OIDC client for TrustPort Identity: authorization code + PKCE, token verification, userinfo, revoke, logout."""

    def __init__(
        self,
        issuer: str,
        client_id: str,
        client_secret: Optional[str] = None,
        redirect_uri: Optional[str] = None,
        scopes: Sequence[str] = ("openid", "profile", "email"),
        audience: Optional[str] = None,
        leeway: int = 5,
        http: Optional[httpx.Client] = None,
    ):
        if not issuer or not client_id:
            raise TrustPortError("issuer and client_id are required", "config")
        self.issuer = issuer.rstrip("/")
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri
        self.scopes = list(scopes)
        self.audience = audience
        self.leeway = leeway
        self._http = http or httpx.Client(timeout=10, headers={"User-Agent": USER_AGENT})
        self._discovery: Optional[dict] = None
        self._keys: dict = {}
        self._keys_fetched_at = 0.0

    @classmethod
    def from_env(cls, env: Optional[Mapping[str, str]] = None, **overrides: Any) -> "TrustPortIdentity":
        e = env if env is not None else os.environ
        return cls(
            issuer=e.get("TRUSTPORT_ISSUER", ""),
            client_id=e.get("TRUSTPORT_CLIENT_ID", ""),
            client_secret=e.get("TRUSTPORT_CLIENT_SECRET") or None,
            redirect_uri=e.get("TRUSTPORT_REDIRECT_URI") or None,
            audience=e.get("TRUSTPORT_AUDIENCE") or None,
            **overrides,
        )

    def discover(self) -> dict:
        if self._discovery is None:
            res = self._http.get(f"{self.issuer}/.well-known/openid-configuration")
            if res.status_code >= 300:
                raise TrustPortError(f"discovery failed ({res.status_code})", "discovery")
            doc = res.json()
            if str(doc.get("issuer", "")).rstrip("/") != self.issuer:
                raise TrustPortError(f"discovery issuer mismatch: {doc.get('issuer')}", "discovery")
            self._discovery = doc
        return self._discovery

    def create_authorization_request(
        self,
        scopes: Optional[Sequence[str]] = None,
        redirect_uri: Optional[str] = None,
        login_hint: Optional[str] = None,
        extra: Optional[Mapping[str, str]] = None,
    ) -> dict:
        """Returns {url, state, nonce, code_verifier}. Keep the last three in the user's session."""
        redirect = redirect_uri or self.redirect_uri
        if not redirect:
            raise TrustPortError("redirect_uri is required", "config")
        state, nonce = _b64url(secrets.token_bytes(24)), _b64url(secrets.token_bytes(24))
        verifier = _b64url(secrets.token_bytes(48))
        query = {
            "response_type": "code",
            "client_id": self.client_id,
            "redirect_uri": redirect,
            "scope": " ".join(scopes or self.scopes),
            "state": state,
            "nonce": nonce,
            "code_challenge": _b64url(hashlib.sha256(verifier.encode()).digest()),
            "code_challenge_method": "S256",
        }
        if login_hint:
            query["login_hint"] = login_hint
        query.update(extra or {})
        endpoint = self.discover()["authorization_endpoint"]
        sep = "&" if "?" in endpoint else "?"
        return {"url": endpoint + sep + urlencode(query), "state": state, "nonce": nonce, "code_verifier": verifier}

    def handle_callback(self, params: Mapping[str, str], saved: Mapping[str, str], redirect_uri: Optional[str] = None) -> dict:
        """Validates the callback query, exchanges the code, verifies the ID token. Returns {tokens, claims}."""
        if params.get("error"):
            desc = f": {params['error_description']}" if params.get("error_description") else ""
            raise TrustPortError(f"{params['error']}{desc}", params["error"])
        if not saved or not hmac.compare_digest(str(saved.get("state", "")), str(params.get("state", ""))):
            raise TrustPortError("state mismatch", "state_mismatch")
        if params.get("iss") is not None and params["iss"].rstrip("/") != self.issuer:
            raise TrustPortError("issuer mismatch in callback", "iss_mismatch")
        if not params.get("code"):
            raise TrustPortError("missing code", "missing_code")
        redirect = redirect_uri or self.redirect_uri
        if not redirect:
            raise TrustPortError("redirect_uri is required", "config")
        tokens = self._token_request(
            {"grant_type": "authorization_code", "code": params["code"], "redirect_uri": redirect, "code_verifier": saved["code_verifier"]}
        )
        if not tokens.get("id_token"):
            raise TrustPortError("no id_token returned (was the openid scope requested?)", "no_id_token")
        claims = self.verify_id_token(tokens["id_token"], nonce=saved["nonce"], access_token=tokens["access_token"])
        return {"tokens": tokens, "claims": claims}

    def verify_id_token(self, id_token: str, nonce: Optional[str] = None, access_token: Optional[str] = None) -> dict:
        claims = self._decode(id_token, audience=self.client_id)
        if nonce is not None and not hmac.compare_digest(nonce, str(claims.get("nonce", ""))):
            raise TrustPortError("nonce mismatch", "nonce_mismatch")
        if access_token and claims.get("at_hash") is not None:
            expected = _b64url(hashlib.sha256(access_token.encode()).digest()[:16])
            if not hmac.compare_digest(expected, str(claims["at_hash"])):
                raise TrustPortError("at_hash mismatch", "at_hash_mismatch")
        return claims

    def verify_access_token(self, token: str) -> dict:
        """Offline check of a bearer access token. ID tokens are refused."""
        claims = self._decode(token, audience=self.audience)
        if claims.get("token_use") == "id":
            raise TrustPortError("an ID token is not an access token", "wrong_token_type")
        return claims

    def refresh(self, refresh_token: str) -> dict:
        return self._token_request({"grant_type": "refresh_token", "refresh_token": refresh_token})

    def userinfo(self, access_token: str) -> dict:
        endpoint = self.discover().get("userinfo_endpoint")
        if not endpoint:
            raise TrustPortError("provider has no userinfo endpoint", "unsupported")
        res = self._http.get(endpoint, headers={"Authorization": f"Bearer {access_token}"})
        if res.status_code >= 300:
            raise TrustPortError(f"userinfo failed ({res.status_code})", "userinfo")
        return res.json()

    def revoke(self, token: str, hint: str = "refresh_token") -> None:
        endpoint = self.discover().get("revocation_endpoint")
        if not endpoint:
            raise TrustPortError("provider has no revocation endpoint", "unsupported")
        res = self._client_post(endpoint, {"token": token, "token_type_hint": hint})
        if res.status_code >= 300:
            raise TrustPortError(f"revocation failed ({res.status_code})", "revoke")

    def logout_url(self, id_token_hint: Optional[str] = None, post_logout_redirect_uri: Optional[str] = None, state: Optional[str] = None) -> Optional[str]:
        endpoint = self.discover().get("end_session_endpoint")
        if not endpoint:
            return None
        q = {k: v for k, v in {"id_token_hint": id_token_hint, "post_logout_redirect_uri": post_logout_redirect_uri, "state": state}.items() if v}
        return endpoint + (("&" if "?" in endpoint else "?") + urlencode(q) if q else "")

    # -- internals -----------------------------------------------------------------------------------------------

    def _decode(self, token: str, audience: Optional[str]) -> dict:
        try:
            key = self._signing_key(token)
            return jwt.decode(
                token,
                key,
                algorithms=["RS256"],
                issuer=self.issuer,
                audience=audience,
                leeway=self.leeway,
                options={"require": ["exp", "iss"], "verify_aud": audience is not None},
            )
        except jwt.PyJWTError as e:
            raise TrustPortError(str(e), "invalid_token") from e

    def _signing_key(self, token: str):
        kid = jwt.get_unverified_header(token).get("kid")
        if kid not in self._keys and time.time() - self._keys_fetched_at >= _JWKS_REFETCH_MIN_SECONDS:
            res = self._http.get(self.discover()["jwks_uri"])  # our own client: explicit User-Agent, injectable, same timeouts
            if res.status_code >= 300:
                raise TrustPortError(f"could not fetch signing keys ({res.status_code})", "jwks")
            self._keys = {k["kid"]: PyJWK.from_dict(k).key for k in res.json().get("keys", []) if k.get("kty") == "RSA" and "kid" in k}
            self._keys_fetched_at = time.time()
        if kid not in self._keys:
            raise TrustPortError(f"no signing key with kid {kid!r}", "invalid_token")
        return self._keys[kid]

    def _client_post(self, url: str, form: dict) -> httpx.Response:
        auth = None
        if self.client_secret:
            auth = httpx.BasicAuth(self.client_id, self.client_secret)
        else:
            form = {**form, "client_id": self.client_id}  # public client: PKCE is the proof
        return self._http.post(url, data=form, auth=auth, headers={"Accept": "application/json"})

    def _token_request(self, form: dict) -> dict:
        res = self._client_post(self.discover()["token_endpoint"], form)
        try:
            body = res.json()
        except ValueError:
            body = {}
        if res.status_code >= 300:
            desc = f": {body['error_description']}" if body.get("error_description") else ""
            raise TrustPortError(f"{body.get('error', 'token_error')}{desc}", body.get("error", "token_error"))
        if isinstance(body.get("expires_in"), int):
            body["expires_at"] = int(time.time()) + body["expires_in"]
        return body
