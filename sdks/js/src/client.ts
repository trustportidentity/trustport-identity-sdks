import { base64urlEncode, decodeJwtPayload, utf8 } from './encoding.js';
import type { Platform } from './platform.js';

export class TrustPortError extends Error {
  constructor(message: string, readonly code: string = 'trustport_error') {
    super(message);
    this.name = 'TrustPortError';
  }
}

export interface ClientConfig {
  /** Issuer URL of the TrustPort Identity tenant. */
  issuer: string;
  /** A public client registered in TrustPort Admin > Applications (no secret). */
  clientId: string;
  redirectUri: string;
  scopes?: string[];
  platform: Platform;
  /** Keep the refresh token in `platform.storage` so `restore()` can resume after a restart. Default false (memory only). */
  persistRefreshToken?: boolean;
  clockToleranceSeconds?: number;
}

export interface Session {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
  /** epoch seconds */
  expiresAt?: number;
  scope?: string;
  /** Verified-by-claims ID token payload (sub, email, name, roles, ...). */
  claims: Record<string, any>;
}

interface Discovery {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
  revocation_endpoint?: string;
  end_session_endpoint?: string;
}

const PENDING = 'trustport.pending.';
const REFRESH = 'trustport.refresh';

export class TrustPortClient {
  private readonly issuer: string;
  private readonly p: Platform;
  private readonly doFetch: typeof fetch;
  private discovery?: Promise<Discovery>;
  private session: Session | null = null;
  private listeners = new Set<(s: Session | null) => void>();
  private refreshing?: Promise<Session>;

  constructor(private readonly config: ClientConfig) {
    if (!config.issuer || !config.clientId || !config.redirectUri) throw new TrustPortError('issuer, clientId and redirectUri are required', 'config');
    this.issuer = config.issuer.replace(/\/+$/, '');
    this.p = config.platform;
    this.doFetch = config.platform.fetch ?? ((...a) => fetch(...a));
  }

  getSession(): Session | null { return this.session; }

  onChange(listener: (s: Session | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private setSession(s: Session | null): void {
    this.session = s;
    this.listeners.forEach((l) => l(s));
  }

  private async getDiscovery(): Promise<Discovery> {
    this.discovery ??= (async () => {
      const res = await this.doFetch(`${this.issuer}/.well-known/openid-configuration`);
      if (!res.ok) throw new TrustPortError(`discovery failed (${res.status})`, 'discovery');
      const doc = (await res.json()) as Discovery;
      if (String(doc.issuer ?? '').replace(/\/+$/, '') !== this.issuer) throw new TrustPortError('discovery issuer mismatch', 'discovery');
      return doc;
    })().catch((e) => { this.discovery = undefined; throw e; });
    return this.discovery;
  }

  /**
   * Starts sign-in. Browsers: navigates away (resolves with null; call handleRedirectCallback after the redirect back).
   * Native hosts with `authSession`: opens the system browser and resolves with the new session.
   */
  async login(opts: { scopes?: string[]; loginHint?: string } = {}): Promise<Session | null> {
    const doc = await this.getDiscovery();
    const state = base64urlEncode(this.p.randomBytes(24));
    const nonce = base64urlEncode(this.p.randomBytes(24));
    const verifier = base64urlEncode(this.p.randomBytes(48));
    const challenge = base64urlEncode(await this.p.sha256(utf8(verifier)));
    const q: Record<string, string> = {
      response_type: 'code', client_id: this.config.clientId, redirect_uri: this.config.redirectUri,
      scope: (opts.scopes ?? this.config.scopes ?? ['openid', 'profile', 'email']).join(' '),
      state, nonce, code_challenge: challenge, code_challenge_method: 'S256',
    };
    if (opts.loginHint) q.login_hint = opts.loginHint;
    const url = doc.authorization_endpoint + (doc.authorization_endpoint.includes('?') ? '&' : '?') + encodeQuery(q);
    await this.p.storage.set(PENDING + state, JSON.stringify({ nonce, verifier, at: Date.now() }));

    if (this.p.authSession) {
      const back = await this.p.authSession(url, this.config.redirectUri);
      if (!back) { await this.p.storage.remove(PENDING + state); throw new TrustPortError('sign-in cancelled', 'cancelled'); }
      return this.handleRedirectCallback(back);
    }
    if (!this.p.navigate) throw new TrustPortError('platform has neither authSession nor navigate', 'config');
    this.p.navigate(url);
    return null;
  }

  /** True when `url` looks like the redirect back from the provider (so an app can decide whether to call handleRedirectCallback). */
  isRedirectCallback(url: string): boolean {
    const q = parseQuery(url);
    return !!q.state && (!!q.code || !!q.error);
  }

  async handleRedirectCallback(url: string): Promise<Session> {
    const q = parseQuery(url);
    const pendingRaw = q.state ? await this.p.storage.get(PENDING + q.state) : null;
    if (!pendingRaw) throw new TrustPortError('no sign-in in progress for this state', 'state_mismatch');
    await this.p.storage.remove(PENDING + q.state); // single use
    const pending = JSON.parse(pendingRaw) as { nonce: string; verifier: string };
    if (q.error) throw new TrustPortError(q.error + (q.error_description ? `: ${q.error_description}` : ''), q.error);
    if (q.iss !== undefined && q.iss.replace(/\/+$/, '') !== this.issuer) throw new TrustPortError('issuer mismatch in callback', 'iss_mismatch');
    if (!q.code) throw new TrustPortError('missing code', 'missing_code');

    const tokens = await this.tokenRequest({
      grant_type: 'authorization_code', code: q.code, redirect_uri: this.config.redirectUri, code_verifier: pending.verifier,
    });
    if (!tokens.id_token) throw new TrustPortError('no id_token returned (was the openid scope requested?)', 'no_id_token');
    const claims = await this.checkIdToken(tokens.id_token, pending.nonce, tokens.access_token);
    return this.adopt(tokens, claims);
  }

  /** Returns a fresh access token, refreshing first if it is about to expire; null when signed out. */
  async getAccessToken(): Promise<string | null> {
    const s = this.session;
    if (!s) return null;
    if (s.expiresAt && s.refreshToken && s.expiresAt - 30 < Date.now() / 1000) return (await this.refresh()).accessToken;
    return s.accessToken;
  }

  refresh(): Promise<Session> {
    const old = this.session;
    if (!old?.refreshToken) return Promise.reject(new TrustPortError('no refresh token', 'no_refresh_token'));
    this.refreshing ??= this.tokenRequest({ grant_type: 'refresh_token', refresh_token: old.refreshToken })
      .then(async (t) => {
        const claims = t.id_token ? await this.checkIdToken(t.id_token, undefined, t.access_token) : old.claims;
        return this.adopt({ ...t, refresh_token: t.refresh_token ?? old.refreshToken }, claims);
      })
      .catch((e) => { this.setSession(null); void this.p.storage.remove(REFRESH); throw e; })
      .finally(() => { this.refreshing = undefined; });
    return this.refreshing;
  }

  /** After an app restart on a host with persistRefreshToken: resumes the session from the stored refresh token. */
  async restore(): Promise<Session | null> {
    const rt = await this.p.storage.get(REFRESH);
    if (!rt) return null;
    this.session = { accessToken: '', refreshToken: rt, expiresAt: 0, claims: {} };
    try { return await this.refresh(); } catch { return null; }
  }

  async userinfo(): Promise<Record<string, any>> {
    const doc = await this.getDiscovery();
    const token = await this.getAccessToken();
    if (!token) throw new TrustPortError('not signed in', 'not_signed_in');
    if (!doc.userinfo_endpoint) throw new TrustPortError('provider has no userinfo endpoint', 'unsupported');
    const res = await this.doFetch(doc.userinfo_endpoint, { headers: { authorization: `Bearer ${token}` } });
    if (!res.ok) throw new TrustPortError(`userinfo failed (${res.status})`, 'userinfo');
    return res.json();
  }

  /** Clears the local session, revokes the refresh token when the provider supports it, and ends the TrustPort session. */
  async logout(opts: { postLogoutRedirectUri?: string; localOnly?: boolean } = {}): Promise<void> {
    const s = this.session;
    const doc = await this.getDiscovery().catch(() => undefined);
    this.setSession(null);
    await this.p.storage.remove(REFRESH);
    if (!s || opts.localOnly || !doc) return;
    if (doc.revocation_endpoint && s.refreshToken) {
      await this.doFetch(doc.revocation_endpoint, {
        method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: encodeQuery({ token: s.refreshToken, token_type_hint: 'refresh_token', client_id: this.config.clientId }),
      }).catch(() => undefined); // best effort: the local session is already gone
    }
    if (!doc.end_session_endpoint) return;
    const q: Record<string, string> = {};
    if (s.idToken) q.id_token_hint = s.idToken;
    if (opts.postLogoutRedirectUri) q.post_logout_redirect_uri = opts.postLogoutRedirectUri;
    const url = doc.end_session_endpoint + (Object.keys(q).length ? (doc.end_session_endpoint.includes('?') ? '&' : '?') + encodeQuery(q) : '');
    if (this.p.authSession) await this.p.authSession(url, opts.postLogoutRedirectUri ?? this.config.redirectUri).catch(() => undefined);
    else this.p.navigate?.(url);
  }

  // -- internals ---------------------------------------------------------------------------------------------------

  private async adopt(t: TokenResponse, claims: Record<string, any>): Promise<Session> {
    const s: Session = {
      accessToken: t.access_token, idToken: t.id_token, refreshToken: t.refresh_token, scope: t.scope, claims,
      expiresAt: typeof t.expires_in === 'number' ? Math.floor(Date.now() / 1000) + t.expires_in : undefined,
    };
    if (this.config.persistRefreshToken && s.refreshToken) await this.p.storage.set(REFRESH, s.refreshToken);
    this.setSession(s);
    return s;
  }

  /**
   * Validates the ID token's claims. The signature is intentionally not checked: the token came straight from the token
   * endpoint over TLS, which OIDC Core 3.1.3.7 allows. Never use this for tokens received any other way.
   */
  private async checkIdToken(idToken: string, nonce: string | undefined, accessToken: string): Promise<Record<string, any>> {
    let c: Record<string, any>;
    try { c = decodeJwtPayload(idToken); } catch { throw new TrustPortError('malformed id_token', 'invalid_id_token'); }
    const tol = this.config.clockToleranceSeconds ?? 60;
    const now = Date.now() / 1000;
    if (String(c.iss ?? '').replace(/\/+$/, '') !== this.issuer) throw new TrustPortError('id_token issuer mismatch', 'invalid_id_token');
    const aud = Array.isArray(c.aud) ? c.aud : [c.aud];
    if (!aud.includes(this.config.clientId)) throw new TrustPortError('id_token audience mismatch', 'invalid_id_token');
    if (typeof c.exp !== 'number' || c.exp + tol < now) throw new TrustPortError('id_token expired', 'invalid_id_token');
    if (nonce !== undefined && c.nonce !== nonce) throw new TrustPortError('nonce mismatch', 'nonce_mismatch');
    if (c.at_hash !== undefined) {
      const expected = base64urlEncode((await this.p.sha256(utf8(accessToken))).slice(0, 16));
      if (c.at_hash !== expected) throw new TrustPortError('at_hash mismatch', 'at_hash_mismatch');
    }
    return c;
  }

  private async tokenRequest(form: Record<string, string>): Promise<TokenResponse> {
    const doc = await this.getDiscovery();
    const res = await this.doFetch(doc.token_endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
      body: encodeQuery({ ...form, client_id: this.config.clientId }), // public client: PKCE is the proof
    });
    const body = (await res.json().catch(() => ({}))) as Record<string, any>;
    if (!res.ok) throw new TrustPortError(`${body.error ?? 'token_error'}${body.error_description ? `: ${body.error_description}` : ''}`, body.error ?? 'token_error');
    return body as TokenResponse;
  }
}

interface TokenResponse {
  access_token: string; id_token?: string; refresh_token?: string; token_type?: string; scope?: string; expires_in?: number;
}

function encodeQuery(q: Record<string, string>): string {
  return Object.entries(q).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
}

function parseQuery(url: string): Record<string, string> {
  const i = url.indexOf('?');
  const end = url.indexOf('#', i < 0 ? 0 : i);
  const raw = i < 0 ? '' : url.slice(i + 1, end < 0 ? undefined : end);
  const out: Record<string, string> = {};
  for (const part of raw.split('&')) {
    if (!part) continue;
    const [k, v = ''] = part.split('=');
    out[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
  }
  return out;
}
