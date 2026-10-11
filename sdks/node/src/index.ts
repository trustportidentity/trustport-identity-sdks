import { createHash, randomBytes } from 'node:crypto';
import { createRemoteJWKSet, jwtVerify, type JWTPayload, type JWTVerifyGetKey } from 'jose';

export class TrustPortError extends Error {
  constructor(message: string, readonly code: string = 'trustport_error') {
    super(message);
    this.name = 'TrustPortError';
  }
}

export interface IdentityConfig {
  /** Issuer URL of the TrustPort Identity tenant, e.g. https://id.example.com */
  issuer: string;
  clientId: string;
  /** Omit for public clients (SPA / mobile style); they authenticate with PKCE only. */
  clientSecret?: string;
  redirectUri?: string;
  scopes?: string[];
  /** If set, access tokens must carry this audience. */
  audience?: string;
  /** Custom fetch (tests, proxies). Defaults to global fetch. */
  fetch?: typeof fetch;
  clockToleranceSeconds?: number;
}

export interface DiscoveryDocument {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  jwks_uri: string;
  userinfo_endpoint?: string;
  revocation_endpoint?: string;
  end_session_endpoint?: string;
  introspection_endpoint?: string;
  [key: string]: unknown;
}

/** Everything you must remember between redirecting the user and handling the callback (store it in the user's session). */
export interface AuthorizationRequest {
  url: string;
  state: string;
  nonce: string;
  codeVerifier: string;
}

export interface TokenSet {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
  tokenType: string;
  scope?: string;
  expiresAt?: number; // epoch seconds
}

export interface CallbackResult {
  tokens: TokenSet;
  claims: JWTPayload;
}

const b64url = (buf: Buffer) => buf.toString('base64url');

export class TrustPortIdentity {
  readonly config: IdentityConfig;
  private readonly doFetch: typeof fetch;
  private discovery?: Promise<DiscoveryDocument>;
  private jwks?: JWTVerifyGetKey;

  constructor(config: IdentityConfig) {
    if (!config.issuer) throw new TrustPortError('issuer is required', 'config');
    if (!config.clientId) throw new TrustPortError('clientId is required', 'config');
    this.config = { ...config, issuer: config.issuer.replace(/\/+$/, '') };
    this.doFetch = config.fetch ?? fetch;
  }

  /** Build from TRUSTPORT_ISSUER, TRUSTPORT_CLIENT_ID, TRUSTPORT_CLIENT_SECRET, TRUSTPORT_REDIRECT_URI. */
  static fromEnv(env: NodeJS.ProcessEnv = process.env, overrides: Partial<IdentityConfig> = {}): TrustPortIdentity {
    return new TrustPortIdentity({
      issuer: env.TRUSTPORT_ISSUER ?? '',
      clientId: env.TRUSTPORT_CLIENT_ID ?? '',
      clientSecret: env.TRUSTPORT_CLIENT_SECRET || undefined,
      redirectUri: env.TRUSTPORT_REDIRECT_URI || undefined,
      ...overrides,
    });
  }

  /** Fetches (once) and validates the OIDC discovery document. */
  discover(): Promise<DiscoveryDocument> {
    this.discovery ??= (async () => {
      const res = await this.doFetch(`${this.config.issuer}/.well-known/openid-configuration`);
      if (!res.ok) throw new TrustPortError(`discovery failed (${res.status})`, 'discovery');
      const doc = (await res.json()) as DiscoveryDocument;
      if (doc.issuer?.replace(/\/+$/, '') !== this.config.issuer) {
        throw new TrustPortError(`discovery issuer mismatch: ${doc.issuer}`, 'discovery');
      }
      return doc;
    })().catch((e) => {
      this.discovery = undefined; // allow retry after a transient failure
      throw e;
    });
    return this.discovery;
  }

  private async keys(): Promise<JWTVerifyGetKey> {
    if (!this.jwks) {
      const doc = await this.discover();
      // jose caches keys and refetches on an unknown kid, so key rotation needs no restart.
      this.jwks = createRemoteJWKSet(new URL(doc.jwks_uri));
    }
    return this.jwks;
  }

  /** Step 1 of login: returns the URL to send the browser to, plus the values to keep in the session. */
  async createAuthorizationRequest(opts: { scopes?: string[]; loginHint?: string; redirectUri?: string; extra?: Record<string, string> } = {}): Promise<AuthorizationRequest> {
    const doc = await this.discover();
    const redirectUri = opts.redirectUri ?? this.config.redirectUri;
    if (!redirectUri) throw new TrustPortError('redirectUri is required', 'config');
    const state = b64url(randomBytes(24));
    const nonce = b64url(randomBytes(24));
    const codeVerifier = b64url(randomBytes(48));
    const challenge = b64url(createHash('sha256').update(codeVerifier).digest());
    const url = new URL(doc.authorization_endpoint);
    const q = url.searchParams;
    q.set('response_type', 'code');
    q.set('client_id', this.config.clientId);
    q.set('redirect_uri', redirectUri);
    q.set('scope', (opts.scopes ?? this.config.scopes ?? ['openid', 'profile', 'email']).join(' '));
    q.set('state', state);
    q.set('nonce', nonce);
    q.set('code_challenge', challenge);
    q.set('code_challenge_method', 'S256');
    if (opts.loginHint) q.set('login_hint', opts.loginHint);
    for (const [k, v] of Object.entries(opts.extra ?? {})) q.set(k, v);
    return { url: url.toString(), state, nonce, codeVerifier };
  }

  /** Step 2 of login: validate the callback query, exchange the code, verify the ID token. */
  async handleCallback(
    params: URLSearchParams | Record<string, string | string[] | undefined>,
    saved: Pick<AuthorizationRequest, 'state' | 'nonce' | 'codeVerifier'>,
    opts: { redirectUri?: string } = {},
  ): Promise<CallbackResult> {
    const get = (k: string): string | undefined => {
      const v = params instanceof URLSearchParams ? params.get(k) : params[k];
      return Array.isArray(v) ? v[0] : v ?? undefined;
    };
    const err = get('error');
    if (err) throw new TrustPortError(`${err}${get('error_description') ? `: ${get('error_description')}` : ''}`, err);
    if (get('state') !== saved.state) throw new TrustPortError('state mismatch', 'state_mismatch');
    const iss = get('iss'); // RFC 9207 mix-up defence; the provider advertises it
    if (iss !== undefined && iss.replace(/\/+$/, '') !== this.config.issuer) throw new TrustPortError('issuer mismatch in callback', 'iss_mismatch');
    const code = get('code');
    if (!code) throw new TrustPortError('missing code', 'missing_code');
    const redirectUri = opts.redirectUri ?? this.config.redirectUri;
    if (!redirectUri) throw new TrustPortError('redirectUri is required', 'config');

    const tokens = await this.tokenRequest({
      grant_type: 'authorization_code', code, redirect_uri: redirectUri, code_verifier: saved.codeVerifier,
    });
    if (!tokens.idToken) throw new TrustPortError('no id_token returned (was the openid scope requested?)', 'no_id_token');
    const claims = await this.verifyIdToken(tokens.idToken, { nonce: saved.nonce, accessToken: tokens.accessToken });
    return { tokens, claims };
  }

  async verifyIdToken(idToken: string, opts: { nonce?: string; accessToken?: string } = {}): Promise<JWTPayload> {
    const { payload } = await jwtVerify(idToken, await this.keys(), {
      issuer: this.config.issuer,
      audience: this.config.clientId,
      clockTolerance: this.config.clockToleranceSeconds ?? 5,
      algorithms: ['RS256'],
    });
    if (opts.nonce !== undefined && payload.nonce !== opts.nonce) throw new TrustPortError('nonce mismatch', 'nonce_mismatch');
    if (opts.accessToken && typeof payload.at_hash === 'string') {
      const half = createHash('sha256').update(opts.accessToken).digest().subarray(0, 16);
      if (payload.at_hash !== b64url(half)) throw new TrustPortError('at_hash mismatch', 'at_hash_mismatch');
    }
    return payload;
  }

  /** Verifies a bearer access token offline (signature, issuer, expiry, optional audience). ID tokens are refused. */
  async verifyAccessToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, await this.keys(), {
      issuer: this.config.issuer,
      audience: this.config.audience,
      clockTolerance: this.config.clockToleranceSeconds ?? 5,
      algorithms: ['RS256'],
    });
    if (payload.token_use === 'id') throw new TrustPortError('an ID token is not an access token', 'wrong_token_type');
    return payload;
  }

  refresh(refreshToken: string): Promise<TokenSet> {
    return this.tokenRequest({ grant_type: 'refresh_token', refresh_token: refreshToken });
  }

  async userinfo(accessToken: string): Promise<Record<string, unknown>> {
    const doc = await this.discover();
    if (!doc.userinfo_endpoint) throw new TrustPortError('provider has no userinfo endpoint', 'unsupported');
    const res = await this.doFetch(doc.userinfo_endpoint, { headers: { authorization: `Bearer ${accessToken}` } });
    if (!res.ok) throw new TrustPortError(`userinfo failed (${res.status})`, 'userinfo');
    return (await res.json()) as Record<string, unknown>;
  }

  /** Revoke a token. Throws if the provider does not advertise revocation or refuses. */
  async revoke(token: string, hint: 'access_token' | 'refresh_token' = 'refresh_token'): Promise<void> {
    const doc = await this.discover();
    if (!doc.revocation_endpoint) throw new TrustPortError('provider has no revocation endpoint', 'unsupported');
    const res = await this.clientPost(doc.revocation_endpoint, { token, token_type_hint: hint });
    if (!res.ok) throw new TrustPortError(`revocation failed (${res.status})`, 'revoke');
  }

  /** RP-initiated logout URL; redirect the browser there after clearing the local session. */
  async logoutUrl(opts: { idTokenHint?: string; postLogoutRedirectUri?: string; state?: string } = {}): Promise<string | undefined> {
    const doc = await this.discover();
    if (!doc.end_session_endpoint) return undefined;
    const url = new URL(doc.end_session_endpoint);
    if (opts.idTokenHint) url.searchParams.set('id_token_hint', opts.idTokenHint);
    if (opts.postLogoutRedirectUri) url.searchParams.set('post_logout_redirect_uri', opts.postLogoutRedirectUri);
    if (opts.state) url.searchParams.set('state', opts.state);
    return url.toString();
  }

  private clientPost(url: string, form: Record<string, string>): Promise<Response> {
    const body = new URLSearchParams(form);
    const headers: Record<string, string> = { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' };
    if (this.config.clientSecret) {
      headers.authorization = 'Basic ' + Buffer.from(`${encodeURIComponent(this.config.clientId)}:${encodeURIComponent(this.config.clientSecret)}`).toString('base64');
    } else {
      body.set('client_id', this.config.clientId); // public client: PKCE is the proof
    }
    return this.doFetch(url, { method: 'POST', headers, body });
  }

  private async tokenRequest(form: Record<string, string>): Promise<TokenSet> {
    const doc = await this.discover();
    const res = await this.clientPost(doc.token_endpoint, form);
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      throw new TrustPortError(`${json.error ?? 'token_error'}${json.error_description ? `: ${json.error_description}` : ''}`, String(json.error ?? 'token_error'));
    }
    return {
      accessToken: String(json.access_token),
      idToken: json.id_token as string | undefined,
      refreshToken: json.refresh_token as string | undefined,
      tokenType: String(json.token_type ?? 'Bearer'),
      scope: json.scope as string | undefined,
      expiresAt: typeof json.expires_in === 'number' ? Math.floor(Date.now() / 1000) + json.expires_in : undefined,
    };
  }
}
