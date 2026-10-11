// Mock of the management API that answers exactly as the Go handlers serialize (omitempty fields absent, nullable pointers null, {data} envelopes,
// {error:{code,message}} errors). Used to smoke-test every generated client:  node conformance/mock-management-server.mjs [port]
// GET /__requests returns what the server saw, so a test can assert on the Authorization header and request bodies.
import { createServer } from 'node:http';

const seen = [];
const U1 = '11111111-1111-4111-8111-111111111111';
const user = (over = {}) => ({
  id: U1, username: 'ada', email: 'ada@example.com', first_name: 'Ada', status: 'active', is_active: true, is_locked: false, email_verified: true,
  phone_verified: false, mfa_required: false, attributes: {}, source: 'local', created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-02T10:00:00.123456Z', ...over,
}); // last_name, phone, locked_until, ... are omitted, as Go's omitempty does
const apiKey = { id: '22222222-2222-4222-8222-222222222222', name: 'ci', key_prefix: 'sk_test_ab', key_type: 'secret', environment: 'staging', created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-01T10:00:00Z' };
const app = { id: '33333333-3333-4333-8333-333333333333', name: 'ENGIS Portal', client_id: 'cid_1', is_default: false, redirect_uris: ['https://portal/cb'], created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-01T10:00:00Z' };
const inv = { id: '44444444-4444-4444-8444-444444444444', email: 'new@example.com', role_name: 'member', invited_by: U1, status: 'pending', expires_at: '2026-10-08T10:00:00Z', accepted_at: null, created_at: '2026-10-01T10:00:00Z' };

const routes = [
  ['GET', /^\/api\/v1\/users$/, 200, () => ({ data: [user(), user({ id: '55555555-5555-4555-8555-555555555555', username: 'bob', phone: '+234', locked_until: '2026-10-03T00:00:00Z', is_locked: true })], page: 1, per_page: 20, total: 2, total_pages: 1 })],
  ['POST', /^\/api\/v1\/users$/, 201, () => ({ data: user() })],
  ['GET', new RegExp(`^/api/v1/users/${U1}$`), 200, () => ({ data: user() })],
  ['GET', /^\/api\/v1\/users\/00000000-0000-4000-8000-000000000000$/, 404, () => ({ error: { code: 'NOT_FOUND', message: 'user not found' } })],
  ['PATCH', new RegExp(`^/api/v1/users/${U1}$`), 200, () => ({ data: user({ first_name: 'Grace' }) })],
  ['DELETE', new RegExp(`^/api/v1/users/${U1}$`), 204, null],
  ['GET', /^\/api\/v1\/roles$/, 200, () => ({ data: [{ id: '66666666-6666-4666-8666-666666666666', name: 'admin', is_system: true, permissions: ['users:read'], created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-01T10:00:00Z' }] })],
  ['POST', /^\/api\/v1\/roles\/assign$/, 204, null],
  ['GET', /^\/api\/v1\/groups$/, 200, () => ({ data: [{ id: '77777777-7777-4777-8777-777777777777', name: 'staff', source: 'local', member_count: 3, created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-01T10:00:00Z' }] })],
  ['GET', /^\/api\/v1\/organizations$/, 200, () => ({ data: [{ id: '88888888-8888-4888-8888-888888888888', name: 'ENGIS', domains: ['engis.en.gov.ng'], sso_active: false, directory_sync_active: false, created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-01T10:00:00Z' }] })],
  ['GET', /^\/api\/v1\/applications$/, 200, () => ({ data: [app] })],
  ['POST', /^\/api\/v1\/applications$/, 201, () => ({ data: { ...app, client_secret: 'shh-once' } })],
  ['POST', /^\/api\/v1\/api-keys$/, 201, () => ({ data: { ...apiKey, secret_key: 'sk_test_SECRET' } })],
  ['GET', /^\/api\/v1\/api-keys$/, 200, () => ({ data: [{ ...apiKey, last_used_at: '2026-10-05T00:00:00Z' }] })],
  ['GET', /^\/api\/v1\/invitations$/, 200, () => ({ data: [inv] })],
  ['POST', /^\/api\/v1\/invitations$/, 201, () => ({ data: inv })],
  ['GET', /^\/api\/v1\/domains$/, 200, () => ({ data: [{ id: '99999999-9999-4999-8999-999999999999', domain: 'login.engis.en.gov.ng', verification_status: 'pending', txt_host: '_tp.login', txt_record: 'tp-verify=abc', cname_record: 'cname.trustportidentity.com', created_at: '2026-10-01T10:00:00Z' }] })],
];

export function start(port = 0) {
  const server = createServer(async (req, res) => {
    let body = ''; for await (const c of req) body += c;
    const path = new URL(req.url, 'http://x').pathname;
    if (path === '/__requests') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify(seen)); }
    seen.push({ method: req.method, path, auth: req.headers.authorization ?? null, body: body ? JSON.parse(body) : null, query: new URL(req.url, 'http://x').search });
    if (!req.headers.authorization) { res.writeHead(401, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ error: { code: 'UNAUTHORIZED', message: 'missing token' } })); }
    const r = routes.find(([m, re]) => m === req.method && re.test(path));
    if (!r) { res.writeHead(404, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'no route' } })); }
    const [, , status, make] = r;
    if (status === 204) { res.writeHead(204); return res.end(); }
    res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(make()));
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` })));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { url } = await start(Number(process.argv[2] ?? 0));
  console.log(url);
}
