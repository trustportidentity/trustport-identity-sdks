import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { start } from '../mock-management-server.mjs';

const m = createRequire(import.meta.url)('../../sdks/management/typescript/dist/index.js');
const U1 = '11111111-1111-4111-8111-111111111111';

async function setup(t) {
  const { server, url } = await start();
  t.after(() => { server.closeAllConnections(); server.close(); });
  const config = new m.Configuration({ basePath: url, accessToken: 'sk_test_KEY' });
  const requests = async () => (await (await fetch(url + '/__requests')).json());
  return { config, requests };
}

test('users: list parses paging and omitted/nullable fields; get; create; patch; delete; error envelope', async (t) => {
  const { config, requests } = await setup(t);
  const users = new m.UsersApi(config);
  const page = await users.listUsers({ page: 1, perPage: 20, q: 'a' });
  assert.equal(page.total, 2); assert.equal(page.data[0].lastName, undefined); assert.equal(page.data[1].phone, '+234');
  assert.ok(page.data[1].lockedUntil instanceof Date);
  assert.equal((await users.getUser({ userId: U1 })).data.username, 'ada');
  assert.equal((await users.createUser({ createUserInput: { username: 'ada', email: 'ada@example.com', password: 'x'.repeat(14) } })).data.id, U1);
  assert.equal((await users.updateUser({ userId: U1, updateUserInput: { firstName: 'Grace', isActive: true } })).data.firstName, 'Grace');
  await users.deleteUser({ userId: U1 });
  const err = await users.getUser({ userId: '00000000-0000-4000-8000-000000000000' }).then(() => null, (e) => e);
  assert.ok(err instanceof m.ResponseError); assert.equal(err.response.status, 404);
  assert.equal((await err.response.json()).error.code, 'NOT_FOUND');
  const seen = await requests();
  assert.equal(seen[0].auth, 'Bearer sk_test_KEY'); assert.match(seen[0].query, /per_page=20/);
  assert.deepEqual(seen.find((r) => r.method === 'PATCH').body, { first_name: 'Grace', is_active: true }, 'snake_case on the wire');
});

test('api keys, applications, invitations, roles, groups, orgs, domains deserialize', async (t) => {
  const { config } = await setup(t);
  const key = (await new m.ApiKeysApi(config).createApiKey({ createApiKeyInput: { name: 'ci', keyType: 'secret', environment: 'staging' } })).data;
  assert.equal(key.secretKey, 'sk_test_SECRET');
  assert.equal((await new m.ApiKeysApi(config).listApiKeys()).data[0].secretKey, undefined);
  assert.equal((await new m.ApplicationsApi(config).createApplication({ createApplicationInput: { name: 'ENGIS Portal', redirectUris: ['https://portal/cb'] } })).data.clientSecret, 'shh-once');
  const inv = (await new m.InvitationsApi(config).listInvitations()).data[0];
  assert.equal(inv.acceptedAt, null); assert.equal(inv.status, 'pending');
  assert.equal((await new m.RolesApi(config).listRoles()).data[0].isSystem, true);
  await new m.RolesApi(config).assignRole({ assignRoleInput: { userId: U1, roleName: 'admin' } });
  assert.equal((await new m.GroupsApi(config).listGroups()).data[0].memberCount, 3);
  assert.equal((await new m.OrganizationsApi(config).listOrganizations()).data[0].domains[0], 'engis.en.gov.ng');
  assert.equal((await new m.DomainsApi(config).listCustomDomains()).data[0].verificationStatus, 'pending');
});
