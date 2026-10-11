import type { IncomingMessage, ServerResponse } from 'node:http';
import type { JWTPayload } from 'jose';
import { TrustPortIdentity } from './index.js';

export type AuthedRequest = IncomingMessage & { auth?: JWTPayload };
type Next = (err?: unknown) => void;

function deny(res: ServerResponse, status: number, error: string): void {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  if (status === 401) res.setHeader('www-authenticate', `Bearer error="${error}"`);
  res.end(JSON.stringify({ error }));
}

/** Express/Connect middleware: requires a valid TrustPort access token and sets req.auth to its claims. */
export function requireAuth(identity: TrustPortIdentity) {
  return async (req: AuthedRequest, res: ServerResponse, next: Next): Promise<void> => {
    const m = /^Bearer (.+)$/i.exec(String(req.headers.authorization ?? ''));
    if (!m) return deny(res, 401, 'invalid_request');
    try {
      req.auth = await identity.verifyAccessToken(m[1]);
    } catch {
      return deny(res, 401, 'invalid_token');
    }
    next();
  };
}

/** Use after requireAuth: allows the request only if the token carries at least one of the given roles. */
export function requireRole(...roles: string[]) {
  return (req: AuthedRequest, res: ServerResponse, next: Next): void => {
    const have = Array.isArray(req.auth?.roles) ? (req.auth!.roles as string[]) : [];
    if (!roles.some((r) => have.includes(r))) return deny(res, 403, 'insufficient_role');
    next();
  };
}
