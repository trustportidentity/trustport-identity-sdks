import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import { TrustPortIdentity } from '../dist/index.js';
import { requireAuth, requireRole } from '../dist/express.js';

// A tiny fake provider: discovery, JWKS and a token endpoint that mints real signed tokens.
async function fakeProvider() {
  const { publicKey, privateKey } = await generateKeyPair('RS256');
  const jwk = { ...(await exportJWK(publicKey)), kid: 'k1', alg: 'RS256', use: 'sig' };
  let issuer; let lastNonce = 'n1'; let lastChallenge; const codes = new Map();
  const sign = (claims, aud, extra = {}) => new SignJWT({ ...claims, ...extra }).setProtectedHeader({ alg: 'RS256', kid: 'k1' })
    .setIssuer(issuer).setAudience(aud).setSubject('u1').setIssuedAt().setExpirationTime('5m').sign(privateKey);
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, issuer);
    const json = (o, s = 200) => { res.writeHead(s, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)); };
    if (url.pathname === '/.well-known/openid-configuration') {
      return json({ issuer, authorization_endpoint: `${issuer}/oauth/authorize`, token_endpoint: `${issuer}/oauth/token`, jwks_uri: `${issuer}/jwks`, userinfo_endpoint: `${issuer}/oidc/userinfo`, end_session_endpoint: `${issuer}/oidc/logout` });
    }
    if (url.pathname === '/jwks') return json({ keys: [jwk] });
    if (url.pathname === '/oidc/userinfo') return json({ sub: 'u1', email: 'a@b.c' });
    if (url.pathname === '/oauth/token') {
      let body = ''; for await (const c of req) body += c; const f = new URLSearchParams(body);
      const entry = codes.get(f.get('code'));
      const verifierOk = entry && createHash('sha256').update(f.get('code_verifier') ?? '').digest('base64url') === entry.challenge;
      if (!verifierOk) return json({ error: 'invalid_grant', error_description: 'bad code or verifier' }, 400);
      const access = await sign({ roles: ['admin'] }, 'api');
      const half = createHash('sha256').update(access).digest().subarray(0, 16).toString('base64url');
      return json({ access_token: access, token_type: 'Bearer', expires_in: 300, id_token: await sign({ nonce: entry.nonce, at_hash: half }, 'app1') });
    }
    json({}, 404);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  issuer = `http://127.0.0.1:${server.address().port}`;
  return { issuer, server, sign, issueCode: (challenge, nonce) => { const c = 'code-' + codes.size; codes.set(c, { challenge, nonce }); return c; } };
}

const mk = (p, extra = {}) => new TrustPortIdentity({ issuer: p.issuer, clientId: 'app1', redirectUri: 'http://app/cb', audience: 'api', ...extra });

test('full login: PKCE, state, nonce, id_token and at_hash verified', async () => {
  const p = await fakeProvider(); const id = mk(p);
  const req = await id.createAuthorizationRequest();
  const u = new URL(req.url);
  assert.equal(u.searchParams.get('code_challenge_method'), 'S256');
  const code = p.issueCode(u.searchParams.get('code_challenge'), req.nonce);
  const out = await id.handleCallback({ code, state: req.state, iss: p.issuer }, req);
  assert.equal(out.claims.sub, 'u1');
  assert.deepEqual((await id.verifyAccessToken(out.tokens.accessToken)).roles, ['admin']);
  assert.equal((await id.userinfo(out.tokens.accessToken)).email, 'a@b.c');
  p.server.close();
});

test('rejects wrong state, wrong iss, and a callback error', async () => {
  const p = await fakeProvider(); const id = mk(p); const req = await id.createAuthorizationRequest();
  await assert.rejects(id.handleCallback({ code: 'x', state: 'nope' }, req), /state mismatch/);
  await assert.rejects(id.handleCallback({ code: 'x', state: req.state, iss: 'https://evil' }, req), /issuer mismatch/);
  await assert.rejects(id.handleCallback({ error: 'access_denied', state: req.state }, req), /access_denied/);
  p.server.close();
});

test('rejects a code redeemed with the wrong PKCE verifier', async () => {
  const p = await fakeProvider(); const id = mk(p); const req = await id.createAuthorizationRequest();
  const code = p.issueCode('some-other-challenge', req.nonce);
  await assert.rejects(id.handleCallback({ code, state: req.state }, req), /invalid_grant/);
  p.server.close();
});

test('access token verification refuses ID tokens and wrong audience', async () => {
  const p = await fakeProvider(); const id = mk(p);
  await assert.rejects(id.verifyAccessToken(await p.sign({}, 'api', { token_use: 'id' })), /ID token/);
  await assert.rejects(id.verifyAccessToken(await p.sign({}, 'someone-else')), /aud/);
  p.server.close();
});

test('express middleware: 401 without token, 403 without role, passes with both', async () => {
  const p = await fakeProvider(); const id = mk(p);
  const run = async (mws, header) => {
    const req = { headers: header ? { authorization: header } : {} };
    const res = { statusCode: 200, setHeader() {}, end(b) { this.body = b; } };
    let called = false;
    for (const m of mws) { let ok = false; await m(req, res, () => { ok = true; }); if (!ok) break; called = true; }
    return { res, req, called };
  };
  const good = await p.sign({ roles: ['admin'] }, 'api'); const noRole = await p.sign({ roles: ['viewer'] }, 'api');
  assert.equal((await run([requireAuth(id)], null)).res.statusCode, 401);
  assert.equal((await run([requireAuth(id), requireRole('admin')], `Bearer ${noRole}`)).res.statusCode, 403);
  const ok = await run([requireAuth(id), requireRole('admin')], `Bearer ${good}`);
  assert.equal(ok.res.statusCode, 200); assert.equal(ok.req.auth.sub, 'u1');
  p.server.close();
});
