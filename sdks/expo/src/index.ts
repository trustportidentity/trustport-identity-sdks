import { TrustPortClient, type ClientConfig, type Platform } from '@trustport/identity-js';

// Structural types for the three Expo modules, so this package has no compile-time dependency on a particular Expo SDK.
export interface ExpoCryptoLike {
  getRandomBytes(length: number): Uint8Array;
  digest(algorithm: any, data: any): Promise<ArrayBuffer>;
  CryptoDigestAlgorithm: { SHA256: any };
}
export interface ExpoSecureStoreLike {
  getItemAsync(key: string, options?: any): Promise<string | null>;
  setItemAsync(key: string, value: string, options?: any): Promise<void>;
  deleteItemAsync(key: string, options?: any): Promise<void>;
}
export interface ExpoWebBrowserLike {
  openAuthSessionAsync(url: string, redirectUrl?: string | null): Promise<{ type: string; url?: string }>;
  maybeCompleteAuthSession?(): unknown;
}

export interface ExpoModules {
  Crypto: ExpoCryptoLike;
  SecureStore: ExpoSecureStoreLike;
  WebBrowser: ExpoWebBrowserLike;
}

export interface ExpoPlatformOptions {
  /** Require Face ID / fingerprint to read the stored refresh token (SecureStore `requireAuthentication`). Default false. */
  requireBiometrics?: boolean;
}

/** SecureStore keys may only contain letters, digits, ".", "-" and "_"; ours already do, but be defensive. */
const safeKey = (k: string) => k.replace(/[^A-Za-z0-9._-]/g, '_');

export function createExpoPlatform(m: ExpoModules, opts: ExpoPlatformOptions = {}): Platform {
  m.WebBrowser.maybeCompleteAuthSession?.();
  const sec = opts.requireBiometrics ? { requireAuthentication: true } : undefined;
  return {
    randomBytes: (n) => m.Crypto.getRandomBytes(n),
    sha256: async (data) => new Uint8Array(await m.Crypto.digest(m.Crypto.CryptoDigestAlgorithm.SHA256, data)),
    storage: {
      get: (k) => m.SecureStore.getItemAsync(safeKey(k), sec),
      set: (k, v) => m.SecureStore.setItemAsync(safeKey(k), v, sec),
      remove: (k) => m.SecureStore.deleteItemAsync(safeKey(k), sec),
    },
    authSession: async (url, redirectUri) => {
      const res = await m.WebBrowser.openAuthSessionAsync(url, redirectUri);
      return res.type === 'success' && res.url ? res.url : null;
    },
  };
}

/**
 * One-liner for apps. `redirectUri` is your app's custom scheme or universal link, registered on the application in
 * TrustPort Admin (for example `trustportauth://callback`). The refresh token is kept in SecureStore so `restore()` works.
 */
export function createExpoClient(
  config: Omit<ClientConfig, 'platform'> & { modules: ExpoModules } & ExpoPlatformOptions,
): TrustPortClient {
  const { modules, requireBiometrics, ...rest } = config;
  return new TrustPortClient({ persistRefreshToken: true, ...rest, platform: createExpoPlatform(modules, { requireBiometrics }) });
}

export { TrustPortClient, TrustPortError } from '@trustport/identity-js';
export type { Session, ClientConfig } from '@trustport/identity-js';
