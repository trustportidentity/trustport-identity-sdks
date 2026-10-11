// Run: TRUSTPORT_ISSUER=... TRUSTPORT_CLIENT_ID=... TRUSTPORT_CLIENT_SECRET=... TRUSTPORT_REDIRECT_URI=http://localhost:3000/callback node server.mjs
// Demo only: sessions live in memory; use your framework's session store in production.
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { TrustPortIdentity } from '@trustport/identity-node';

const identity = TrustPortIdentity.fromEnv();
const sessions = new Map(); // sid -> { pending?, user?, tokens? }

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  let sid = /sid=([^;]+)/.exec(req.headers.cookie ?? '')?.[1];
  if (!sid || !sessions.has(sid)) { sid = randomUUID(); sessions.set(sid, {}); }
  const s = sessions.get(sid);
  res.setHeader('set-cookie', `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`);

  if (url.pathname === '/login') {
    s.pending = await identity.createAuthorizationRequest();
    res.writeHead(302, { location: s.pending.url }).end();
  } else if (url.pathname === '/callback') {
    try {
      const { tokens, claims } = await identity.handleCallback(url.searchParams, s.pending);
      Object.assign(s, { tokens, user: claims, pending: undefined });
      res.writeHead(302, { location: '/' }).end();
    } catch (e) { res.writeHead(400).end(String(e.message)); }
  } else if (url.pathname === '/logout') {
    const out = await identity.logoutUrl({ idTokenHint: s.tokens?.idToken, postLogoutRedirectUri: 'http://localhost:3000/' });
    sessions.delete(sid);
    res.writeHead(302, { location: out ?? '/' }).end();
  } else {
    res.end(s.user ? `Hello ${s.user.email ?? s.user.sub} <a href="/logout">log out</a>` : '<a href="/login">Sign in with TrustPort</a>');
  }
}).listen(3000);
