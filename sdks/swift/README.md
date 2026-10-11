# TrustPortIdentity (Swift)

TrustPort Identity for iOS 15+ and macOS 12+: public-client OIDC (authorization code + PKCE) through `ASWebAuthenticationSession`,
refresh token in the Keychain (device-only), single-flight refresh, userinfo, logout. No third-party dependencies.

```swift
// Package: https://github.com/trustportidentity/identity-swift (mirror of sdks/swift)
let identity = TrustPortClient(config: TrustPortConfig(
    issuer: URL(string: "https://id.example.com")!,
    clientId: "...",                                   // public client from TrustPort Admin > Applications
    redirectURI: URL(string: "trustportauth://callback")!))   // register this scheme in your app's Info.plist and in Admin

let session = await identity.restore() ?? (try await identity.login())
print(session.claims.email, session.claims.roles)
let token = try await identity.accessToken()           // refreshes when close to expiry
await identity.logout()
```

`TrustPortClient` is an `actor`. `WebAuthSession` and `SecureStoring` are protocols, so tests can stub the browser and the store.
ID-token claims are validated (`iss`, `aud`, `exp`, `nonce`, `at_hash`); the signature is not, because the token comes straight from the token endpoint
over TLS (OIDC Core 3.1.3.7). Verify access tokens on your server.

Status: 0.1.0, 6 tests (login/PKCE, claim checks, refresh, restore, logout, real Keychain). `SystemWebAuthSession` is not unit-tested and
**has not been run on a device**. Universal-link (https) redirects are not supported yet, only custom schemes.
