import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { createExpoClient, createExpoPlatform } from '../dist/index.js';
import { fakeProvider } from '../../js/test/helpers.js';

const REDIRECT = 'trustportauth://callback';

function mockModules(provider, { cancel = false } = {}) {
  const secure = new Map(); const calls = { opened: [], secureOpts: [] };
  return {
    secure, calls,
    Crypto: {
      getRandomBytes: (n) => new Uint8Array(randomBytes(n)),
      digest: async (alg, data) => { assert.equal(alg, 'SHA256'); const h = createHash('sha256').update(data).digest(); return h.buffer.slice(h.byteOffset, h.byteOffset + h.length); },
      CryptoDigestAlgorithm: { SHA256: 'SHA256' },
    },
    SecureStore: {
      getItemAsync: async (k, o) => (calls.secureOpts.push(o), secure.get(k) ?? null),
      setItemAsync: async (k, v, o) => void (calls.secureOpts.push(o), secure.set(k, v)),
      deleteItemAsync: async (k) => void secure.delete(k),
    },
    WebBrowser: {
      maybeCompleteAuthSession: () => { calls.completed = true; },
      openAuthSessionAsync: async (url, redirect) => {
        calls.opened.push(url);
        if (cancel) return { type: 'cancel' };
        if (url.includes('/oidc/logout')) return { type: 'dismiss' };
        return { type: 'success', url: provider.authorize(url, redirect) };
      },
    },
  };
}

test('Expo client: system-browser sign-in, refresh token lands in SecureStore, restore after restart', async () => {
  const p = await fakeProvider(); const m = mockModules(p);
  const c = createExpoClient({ issuer: p.issuer, clientId: 'app1', redirectUri: REDIRECT, modules: m });
  assert.ok(m.calls.completed, 'maybeCompleteAuthSession is called');
  const s = await c.login();
  assert.equal(s.claims.email, 'a@b.c');
  assert.equal(new URL(m.calls.opened[0]).searchParams.get('redirect_uri'), REDIRECT);
  assert.equal(m.secure.get('trustport.refresh'), s.refreshToken);
  assert.equal([...m.secure.keys()].some((k) => k.startsWith('trustport.pending.')), false, 'pending login removed');

  const again = createExpoClient({ issuer: p.issuer, clientId: 'app1', redirectUri: REDIRECT, modules: m });
  assert.equal((await again.restore()).claims.sub, 'u1');
  await again.logout();
  assert.equal(m.secure.has('trustport.refresh'), false);
  assert.ok(m.calls.opened.at(-1).includes('/oidc/logout'));
  p.close();
});

test('cancelled browser session surfaces as a cancelled error and stores nothing', async () => {
  const p = await fakeProvider(); const m = mockModules(p, { cancel: true });
  const c = createExpoClient({ issuer: p.issuer, clientId: 'app1', redirectUri: REDIRECT, modules: m });
  await assert.rejects(c.login(), (e) => e.code === 'cancelled');
  assert.equal(m.secure.size, 0);
  p.close();
});

test('requireBiometrics asks SecureStore for authentication on every access', async () => {
  const p = await fakeProvider(); const m = mockModules(p);
  const platform = createExpoPlatform(m, { requireBiometrics: true });
  await platform.storage.set('k', 'v'); await platform.storage.get('k');
  assert.deepEqual(m.calls.secureOpts, [{ requireAuthentication: true }, { requireAuthentication: true }]);
  p.close();
});
