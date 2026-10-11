import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { TrustPortClient } from '../dist/index.js';
import { IdentityProvider, useIdentity, SignedIn, useHasRole } from '../dist/react.js';
import { fakeProvider, fakePlatform } from './helpers.js';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const REDIRECT = 'https://app.test/cb';

function Probe({ out }) {
  const id = useIdentity(); out.id = id; out.admin = useHasRole('admin');
  return React.createElement('div', null, id.status, React.createElement(SignedIn, { fallback: 'out' }, ' in:' + id.user?.email));
}

test('provider completes the callback once (StrictMode double effect), exposes user and roles', async () => {
  const p = await fakeProvider(); const plat = fakePlatform();
  const client = new TrustPortClient({ issuer: p.issuer, clientId: 'app1', redirectUri: REDIRECT, platform: plat.platform });
  await client.login();
  const url = p.authorize(plat.nav[0], REDIRECT);
  const out = {}; let r;
  await act(async () => {
    r = TestRenderer.create(React.createElement(React.StrictMode, null, React.createElement(IdentityProvider, { client, getUrl: () => url }, React.createElement(Probe, { out }))));
    await new Promise((res) => setTimeout(res, 100));
  });
  assert.equal(out.id.status, 'authenticated');
  assert.equal(out.id.user.email, 'a@b.c'); assert.equal(out.admin, true); assert.equal(out.id.error, null);
  assert.equal(p.state.tokenCalls.length, 1, 'the single-use code was exchanged exactly once');
  assert.match(JSON.stringify(r.toJSON()), /in:a@b.c/);
  await act(async () => { await out.id.logout({ postLogoutRedirectUri: 'https://app.test/' }); });
  assert.equal(out.id.status, 'unauthenticated');
  p.close();
});

test('provider reports a failed callback as an error and unauthenticated', async () => {
  const p = await fakeProvider(); const plat = fakePlatform();
  const client = new TrustPortClient({ issuer: p.issuer, clientId: 'app1', redirectUri: REDIRECT, platform: plat.platform });
  await client.login();
  const st = new URL(plat.nav[0]).searchParams.get('state'); const out = {};
  await act(async () => {
    TestRenderer.create(React.createElement(IdentityProvider, { client, getUrl: () => `${REDIRECT}?error=access_denied&state=${st}` }, React.createElement(Probe, { out })));
    await new Promise((res) => setTimeout(res, 50));
  });
  assert.equal(out.id.status, 'unauthenticated'); assert.match(out.id.error.message, /access_denied/);
  p.close();
});
