/** Everything the core needs from its host, so the same code runs in browsers, Expo / React Native and tests. */
export interface AsyncStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

export interface Platform {
  randomBytes(length: number): Uint8Array;
  sha256(data: Uint8Array): Promise<Uint8Array>;
  /** Holds the pending login (state, nonce, verifier) and, if enabled, the refresh token. */
  storage: AsyncStorage;
  /**
   * Native hosts: open the system browser on `url`, resolve with the URL the app was redirected to (or null if the user
   * cancelled). When absent, the core navigates the page with `navigate` and finishes in `handleRedirectCallback`.
   */
  authSession?(url: string, redirectUri: string): Promise<string | null>;
  navigate?(url: string): void;
  fetch?: typeof fetch;
}
