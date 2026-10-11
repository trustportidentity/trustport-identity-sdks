# TrustPort.Identity (.NET 8+)

- **TrustPort.Identity**: `TrustPortIdentityClient`, framework-free: OIDC login (code + PKCE, state, nonce), offline token
  verification with rotating signing keys, userinfo, revoke, logout URL.
- **TrustPort.Identity.AspNetCore**: `AddTrustPortAuthentication()` protects an API with TrustPort access tokens
  (claims keep their names, so `[Authorize(Roles = "admin")]` works; ID tokens are refused) and registers
  `TrustPortIdentityClient` through `IHttpClientFactory`. `AddTrustPortWebLogin()` adds cookie + OpenID Connect (PKCE)
  sign-in for server-rendered apps and Blazor Server.

```csharp
builder.Services.AddTrustPortAuthentication(o => {
    o.Issuer = "https://id.example.com";
    o.ClientId = "...";
    o.Audience = "api";
});
// ...
app.MapGet("/admin", () => "ok").RequireAuthorization(new AuthorizeAttribute { Roles = "admin" });
```

Status: 0.1.0. The client and the API authentication are tested against an in-process provider (5 tests).
`AddTrustPortWebLogin` compiles but has no test yet. MAUI/WPF (`TrustPort.Identity.Client`) and legacy .NET Framework are not built.
