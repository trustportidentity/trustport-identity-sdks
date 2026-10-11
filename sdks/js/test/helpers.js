import { createServer } from 'node:http';
import { createHash, randomBytes } from 'node:crypto';

const b64u = (b) => Buffer.from(b).toString('base64url');
export const jwt = (claims) => `${b64u(JSON.stringify({ alg: 'RS256', kid: 'k1' }))}.${b64u(JSON.stringify(claims))}.${b64u('sig')}`;

export async function fakeProvider() {
  const state = { codes: new Map(), refresh: new Map(), revoked: [], tokenCalls: [], idOverrides: {}, expiresIn: 300 };
  let issuer;
  const mint = (entry, over = {}) => {
    const access = 'at-' + randomBytes(6).toString('hex');
    const now = Math.floor(Date.now() / 1000);
    const id = jwt({
      iss: issuer, sub: 'u1', aud: 'app1', exp: now + 300, iat: now, nonce: entry.nonce, email: 'a@b.c', roles: ['admin'],
      at_hash: b64u(createHash('sha256').update(access).digest().subarray(0, 16)), ...state.idOverrides, ...over,
    });
    const rt = 'rt-' + randomBytes(6).toString('hex');
    state.refresh.set(rt, entry);
    return { access_token: access, id_token: id, refresh_token: rt, token_type: 'Bearer', expires_in: state.expiresIn };
  };
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, issuer);
    const json = (o, s = 200) => { res.writeHead(s, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)); };
    if (url.pathname === '/.well-known/openid-configuration') {
      return json({ issuer, authorization_endpoint: `${issuer}/oauth/authorize`, token_endpoint: `${issuer}/oauth/token`, userinfo_endpoint: `${issuer}/oidc/userinfo`, revocation_endpoint: `${issuer}/oauth/revoke`, end_session_endpoint: `${issuer}/oidc/logout` });
    }
    if (url.pathname === '/oidc/userinfo') return json({ sub: 'u1', email: 'a@b.c' });
    let body = ''; for await (const c of req) body += c; const f = new URLSearchParams(body);
    if (url.pathname === '/oauth/revoke') { state.revoked.push(f.get('token')); return json({}); }
    if (url.pathname === '/oauth/token') {
      state.tokenCalls.push({ grant: f.get('grant_type'), auth: req.headers.authorization, clientId: f.get('client_id'), secret: f.get('client_secret') });
      if (f.get('grant_type') === 'refresh_token') {
        const entry = state.refresh.get(f.get('refresh_token'));
        if (!entry) return json({ error: 'invalid_grant' }, 400);
        state.refresh.delete(f.get('refresh_token'));
        return json(mint(entry));
      }
      const entry = state.codes.get(f.get('code'));
      const ok = entry && createHash('sha256').update(f.get('code_verifier') ?? '').digest('base64url') === entry.challenge;
      if (!ok) return json({ error: 'invalid_grant', error_description: 'bad code or verifier' }, 400);
      state.codes.delete(f.get('code'));
      return json(mint(entry));
    }
    json({}, 404);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  issuer = `http://127.0.0.1:${server.address().port}`;
  // the "browser": follows the authorize URL, registers a code bound to its challenge, returns the callback URL
  const authorize = (authUrl, redirectUri, over = {}) => {
    const q = new URL(authUrl).searchParams;
    const code = 'code-' + randomBytes(5).toString('hex');
    state.codes.set(code, { challenge: q.get('code_challenge'), nonce: q.get('nonce') });
    const cb = new URL(redirectUri);
    cb.searchParams.set('code', code); cb.searchParams.set('state', over.state ?? q.get('state')); cb.searchParams.set('iss', over.iss ?? issuer);
    return cb.toString();
  };
  return { issuer, state, server, authorize, close: () => server.close() };
}

export function fakePlatform({ native = false, provider } = {}) {
  const store = new Map(); const nav = [];
  const platform = {
    randomBytes: (n) => new Uint8Array(randomBytes(n)),
    sha256: async (d) => new Uint8Array(createHash('sha256').update(d).digest()),
    storage: { get: async (k) => store.get(k) ?? null, set: async (k, v) => void store.set(k, v), remove: async (k) => void store.delete(k) },
    navigate: (u) => nav.push(u),
  };
  if (native) platform.authSession = async (url, redirectUri) => (url.includes('/oidc/logout') ? (nav.push(url), null) : provider.authorize(url, redirectUri));
  return { platform, store, nav };
}
