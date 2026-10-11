using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace TrustPort.Identity.AspNetCore;

public static class TrustPortAuthenticationExtensions
{
    /// <summary>
    /// Protects an API with TrustPort access tokens (JWT bearer). Claims keep their original names ("sub", "roles"), so
    /// <c>[Authorize(Roles = "admin")]</c> works. ID tokens are refused. Also registers <see cref="TrustPortIdentityClient"/> and the
    /// management-client HttpClient factory entry.
    /// </summary>
    public static AuthenticationBuilder AddTrustPortAuthentication(this IServiceCollection services, Action<TrustPortOptions> configure)
    {
        var options = new TrustPortOptions();
        configure(options);
        if (string.IsNullOrEmpty(options.Issuer)) throw new TrustPortException("Issuer is required", "config");
        var issuer = options.Issuer.TrimEnd('/');

        services.AddSingleton(options);
        services.AddHttpClient<TrustPortIdentityClient>().AddTypedClient((http, _) => new TrustPortIdentityClient(options, http));

        return services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(jwt =>
        {
            jwt.Authority = issuer;
            jwt.RequireHttpsMetadata = issuer.StartsWith("https://", StringComparison.OrdinalIgnoreCase);
            jwt.MapInboundClaims = false;
            jwt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = issuer,
                ValidateAudience = options.Audience is not null,
                ValidAudience = options.Audience,
                ValidAlgorithms = new[] { SecurityAlgorithms.RsaSha256 },
                ClockSkew = options.ClockSkew,
                NameClaimType = "sub",
                RoleClaimType = "roles",
            };
            jwt.Events = new JwtBearerEvents
            {
                OnTokenValidated = ctx =>
                {
                    if (ctx.Principal?.FindFirst("token_use")?.Value == "id") ctx.Fail("an ID token is not an access token");
                    return Task.CompletedTask;
                },
            };
        });
    }

    /// <summary>
    /// Adds "Sign in with TrustPort" for server-rendered web apps and Blazor Server: cookie session + OpenID Connect
    /// (authorization code with PKCE). Challenge with <c>OpenIdConnectDefaults.AuthenticationScheme</c>.
    /// </summary>
    public static AuthenticationBuilder AddTrustPortWebLogin(this AuthenticationBuilder builder, Action<TrustPortOptions> configure)
    {
        var options = new TrustPortOptions();
        configure(options);
        return builder
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, oidc =>
            {
                oidc.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                oidc.Authority = options.Issuer.TrimEnd('/');
                oidc.RequireHttpsMetadata = options.Issuer.StartsWith("https://", StringComparison.OrdinalIgnoreCase);
                oidc.ClientId = options.ClientId;
                oidc.ClientSecret = options.ClientSecret;
                oidc.ResponseType = "code";
                oidc.UsePkce = true;
                oidc.SaveTokens = true;
                oidc.MapInboundClaims = false;
                oidc.GetClaimsFromUserInfoEndpoint = false; // identity comes from the verified ID token
                oidc.Scope.Clear();
                foreach (var s in options.Scopes) oidc.Scope.Add(s);
                oidc.TokenValidationParameters.NameClaimType = "name";
                oidc.TokenValidationParameters.RoleClaimType = "roles";
                if (options.RedirectUri is { } r) oidc.CallbackPath = new Uri(r, UriKind.RelativeOrAbsolute).IsAbsoluteUri ? new Uri(r).AbsolutePath : r;
            });
    }
}
