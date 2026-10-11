from __future__ import annotations

import functools
from typing import Optional

from flask import g, jsonify, request

from .client import TrustPortIdentity
from .errors import TrustPortError


def require_auth(identity: TrustPortIdentity, roles: Optional[list] = None):
    """Flask decorator: requires a valid bearer token (and one of `roles`, if given). Claims are in `flask.g.trustport_claims`."""

    def decorator(view):
        @functools.wraps(view)
        def wrapper(*args, **kwargs):
            scheme, _, token = request.headers.get("Authorization", "").partition(" ")
            if scheme.lower() != "bearer" or not token:
                return jsonify(error="invalid_request"), 401, {"WWW-Authenticate": 'Bearer error="invalid_request"'}
            try:
                claims = identity.verify_access_token(token)
            except TrustPortError:
                return jsonify(error="invalid_token"), 401, {"WWW-Authenticate": 'Bearer error="invalid_token"'}
            if roles and not set(roles) & set(claims.get("roles", [])):
                return jsonify(error="insufficient_role"), 403
            g.trustport_claims = claims
            return view(*args, **kwargs)

        return wrapper

    return decorator
