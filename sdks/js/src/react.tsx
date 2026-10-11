import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TrustPortClient, type Session } from './client.js';
import { cleanCallbackUrl } from './browser.js';

export type Status = 'loading' | 'authenticated' | 'unauthenticated';

export interface IdentityContextValue {
  status: Status;
  /** ID token claims of the signed-in user (sub, email, name, roles, ...). */
  user: Record<string, any> | null;
  error: Error | null;
  login(opts?: { loginHint?: string }): Promise<void>;
  logout(opts?: { postLogoutRedirectUri?: string }): Promise<void>;
  getAccessToken(): Promise<string | null>;
  client: TrustPortClient;
}

const Ctx = createContext<IdentityContextValue | null>(null);

/** Wrap your app once. It completes the redirect callback on load, then tracks the session. */
export function IdentityProvider({ client, children, getUrl }: { client: TrustPortClient; children?: React.ReactNode; getUrl?: () => string }) {
  const [session, setSession] = useState<Session | null>(client.getSession());
  const [status, setStatus] = useState<Status>(client.getSession() ? 'authenticated' : 'loading');
  const [error, setError] = useState<Error | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const off = client.onChange((s) => { setSession(s); setStatus(s ? 'authenticated' : 'unauthenticated'); });
    if (!started.current) {
      started.current = true; // React 18 StrictMode runs effects twice; a callback code is single use
      const url = getUrl ? getUrl() : window.location.href;
      (async () => {
        try {
          if (client.isRedirectCallback(url)) {
            await client.handleRedirectCallback(url);
            if (!getUrl) cleanCallbackUrl();
          } else if (!(await client.restore())) {
            setStatus('unauthenticated');
          }
        } catch (e) {
          setError(e as Error);
          setStatus('unauthenticated');
          if (!getUrl) cleanCallbackUrl();
        }
      })();
    }
    return off;
  }, [client]);

  const value = useMemo<IdentityContextValue>(() => ({
    status, user: session?.claims ?? null, error, client,
    login: async (opts) => { setError(null); try { await client.login(opts); } catch (e) { setError(e as Error); } },
    logout: (opts) => client.logout(opts),
    getAccessToken: () => client.getAccessToken(),
  }), [status, session, error, client]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useIdentity(): IdentityContextValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useIdentity must be used inside <IdentityProvider>');
  return v;
}

/** Renders `children` only for signed-in users; otherwise `fallback` (default: nothing). */
export function SignedIn({ children, fallback = null }: { children?: React.ReactNode; fallback?: React.ReactNode }) {
  return <>{useIdentity().status === 'authenticated' ? children : fallback}</>;
}

/** True when the signed-in user has any of the roles. */
export function useHasRole(...roles: string[]): boolean {
  const have: string[] = useIdentity().user?.roles ?? [];
  return roles.some((r) => have.includes(r));
}
