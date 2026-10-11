from __future__ import annotations

from typing import Callable, Optional

from fastapi import Depends, HTTPException, Request

from .client import TrustPortIdentity
from .errors import TrustPortError


def bearer_claims(identity: TrustPortIdentity, roles: Optional[list] = None) -> Callable:
    """FastAPI dependency: `claims = Depends(bearer_claims(identity, roles=["admin"]))`. 401 without a valid token, 403 without a role."""

    def dependency(request: Request) -> dict:
        header = request.headers.get("authorization", "")
        scheme, _, token = header.partition(" ")
        if scheme.lower() != "bearer" or not token:
            raise HTTPException(401, "invalid_request", headers={"WWW-Authenticate": 'Bearer error="invalid_request"'})
        try:
            claims = identity.verify_access_token(token)
        except TrustPortError:
            raise HTTPException(401, "invalid_token", headers={"WWW-Authenticate": 'Bearer error="invalid_token"'})
        if roles and not set(roles) & set(claims.get("roles", [])):
            raise HTTPException(403, "insufficient_role")
        return claims

    return dependency
