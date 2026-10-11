# @trustport/identity-expo

TrustPort Identity for Expo / React Native, built on `@trustport/identity-js`. Sign-in uses the **system browser**
(`expo-web-browser`), PKCE, and the refresh token is stored in `expo-secure-store` (optionally behind Face ID / fingerprint).
Needs a development build or EAS build, not Expo Go, for custom-scheme redirects.

```bash
npx expo install expo-crypto expo-secure-store expo-web-browser
npm i @trustport/identity-expo
```

```ts
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { createExpoClient } from '@trustport/identity-expo';

export const identity = createExpoClient({
  issuer: 'https://id.example.com',
  clientId: '...',                              // public client
  redirectUri: 'trustportauth://callback',       // your scheme; register it on the application in TrustPort Admin
  modules: { Crypto, SecureStore, WebBrowser },
  requireBiometrics: false,                      // true: biometric prompt to read the stored refresh token
});

const session = await identity.restore() ?? await identity.login();
```

The same `<IdentityProvider client={identity}>` from `@trustport/identity-js/react` works in React Native
(pass `getUrl={() => ''}` since there is no page URL).

Status: 0.1.0, 3 tests against mocked Expo modules. **Not yet run on a device or simulator.**
