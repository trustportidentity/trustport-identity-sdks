import test from 'node:test';
import assert from 'node:assert/strict';
import { TrustPortClient } from '../dist/index.js';
import { fakeProvider, fakePlatform } from './helpers.js';

const REDIRECT = 'https://app.test/cb';
const mk = (p, plat, extra = {}) => new TrustPortClient({ issuer: p.issuer, clientId: 'app1', redirectUri: REDIRECT, platform: plat.platform, ...extra });

test('browser flow: redirect out, callback in; public client sends no secret; PKCE verified by the provider', async () => {
  const p = await fakeProvider(); const plat = fakePlatform(); const c = mk(p, plat);
  assert.equal(await c.login(), null);
  assert.equal(plat.nav.length, 1);
  const cb = p.authorize(plat.nav[0], REDIRECT);
  assert.ok(c.isRedirectCallback(cb));
  const s = await c.handleRedirectCallback(cb);
  assert.equal(s.claims.sub, 'u1');
  assert.deepEqual(p.state.tokenCalls[0], { grant: 'authorization_code', auth: undefined, clientId: 'app1', secret: null });
  assert.equal(c.getSession().accessToken, s.accessToken);
  assert.equal((await c.userinfo()).email, 'a@b.c');
  p.close();
});

test('native flow: authSession completes sign-in in one call; cancel is reported', async () => {
  const p = await fakeProvider(); const plat = fakePlatform({ native: true, provider: p }); const c = mk(p, plat);
  assert.equal((await c.login()).claims.email, 'a@b.c');
  const cancelled = fakePlatform({ native: true, provider: p });
  cancelled.platform.authSession = async () => null;
  await assert.rejects(mk(p, cancelled).login(), /cancelled/);
  assert.equal([...cancelled.store.keys()].length, 0, 'pending login is cleaned up');
  p.close();
});

test('callback rejections: unknown state, replay, provider error, wrong iss', async () => {
  const p = await fakeProvider(); const plat = fakePlatform(); const c = mk(p, plat);
  await c.login(); const auth = plat.nav[0];
  await assert.rejects(c.handleRedirectCallback(p.authorize(auth, REDIRECT, { state: 'forged' })), /no sign-in in progress/);
  await assert.rejects(c.handleRedirectCallback(p.authorize(auth, REDIRECT, { iss: 'https://evil' })), /issuer mismatch/);
  // the iss failure consumed the pending state, so a retry of the same state is refused (single use)
  await assert.rejects(c.handleRedirectCallback(p.authorize(auth, REDIRECT)), /no sign-in in progress/);
  await c.login(); const auth2 = plat.nav[1]; const st = new URL(auth2).searchParams.get('state');
  await assert.rejects(c.handleRedirectCallback(`${REDIRECT}?error=access_denied&state=${st}`), /access_denied/);
  p.close();
});

test('ID token claim checks: nonce, audience, expiry, at_hash', async () => {
  const p = await fakeProvider();
  const cases = [
    [{ nonce: 'other' }, /nonce mismatch/], [{ aud: 'someone-else' }, /audience/], [{ exp: 1 }, /expired/], [{ at_hash: 'AAAA' }, /at_hash/], [{ iss: 'https://evil' }, /issuer/],
  ];
  for (const [over, re] of cases) {
    p.state.idOverrides = over;
    const plat = fakePlatform(); const c = mk(p, plat); await c.login();
    await assert.rejects(c.handleRedirectCallback(p.authorize(plat.nav[0], REDIRECT)), re);
    assert.equal(c.getSession(), null);
  }
  p.close();
});

test('refresh: auto-refresh near expiry, single-flight, failure signs out', async () => {
  const p = await fakeProvider(); p.state.expiresIn = 10; // inside the 30 s refresh window
  const plat = fakePlatform(); const c = mk(p, plat); await c.login();
  await c.handleRedirectCallback(p.authorize(plat.nav[0], REDIRECT));
  const first = c.getSession().accessToken;
  const [a, b] = await Promise.all([c.getAccessToken(), c.getAccessToken()]);
  assert.equal(a, b); assert.notEqual(a, first);
  assert.equal(p.state.tokenCalls.filter((t) => t.grant === 'refresh_token').length, 1, 'concurrent callers share one refresh');
  p.state.refresh.clear();
  await assert.rejects(c.refresh(), /invalid_grant/);
  assert.equal(c.getSession(), null);
  p.close();
});

test('persisted refresh token restores a session after a restart', async () => {
  const p = await fakeProvider();
  const plat = fakePlatform(); const c = mk(p, plat, { persistRefreshToken: true }); await c.login();
  await c.handleRedirectCallback(p.authorize(plat.nav[0], REDIRECT));
  const restarted = mk(p, { platform: plat.platform }, { persistRefreshToken: true });
  const s = await restarted.restore();
  assert.equal(s.claims.sub, 'u1');
  assert.equal(await mk(p, fakePlatform()).restore(), null, 'nothing stored -> signed out');
  p.close();
});

test('logout: revokes the refresh token, clears storage, ends the provider session', async () => {
  const p = await fakeProvider();
  const plat = fakePlatform(); const c = mk(p, plat, { persistRefreshToken: true }); await c.login();
  const s = await c.handleRedirectCallback(p.authorize(plat.nav[0], REDIRECT));
  const seen = []; c.onChange((x) => seen.push(x));
  await c.logout({ postLogoutRedirectUri: 'https://app.test/' });
  assert.deepEqual(seen, [null]);
  assert.deepEqual(p.state.revoked, [s.refreshToken]);
  const out = new URL(plat.nav.at(-1));
  assert.equal(out.pathname, '/oidc/logout'); assert.equal(out.searchParams.get('id_token_hint'), s.idToken);
  assert.equal(plat.store.has('trustport.refresh'), false);
  p.close();
});
