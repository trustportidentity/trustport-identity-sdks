import type { Platform } from './platform.js';

/** Platform for web pages: WebCrypto, sessionStorage (pending login only) and full-page redirects. Tokens stay in memory. */
export function browserPlatform(): Platform {
  const store = (): Storage | null => { try { return window.sessionStorage; } catch { return null; } };
  const memory = new Map<string, string>();
  return {
    randomBytes: (n) => crypto.getRandomValues(new Uint8Array(n)),
    sha256: async (data) => new Uint8Array(await crypto.subtle.digest('SHA-256', data.slice().buffer)),
    storage: {
      get: async (k) => store()?.getItem(k) ?? memory.get(k) ?? null,
      set: async (k, v) => { const s = store(); if (s) s.setItem(k, v); else memory.set(k, v); },
      remove: async (k) => { store()?.removeItem(k); memory.delete(k); },
    },
    navigate: (url) => window.location.assign(url),
  };
}

/** Removes ?code&state&iss from the address bar after a successful callback so a refresh does not replay it. */
export function cleanCallbackUrl(): void {
  const clean = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, clean);
}
