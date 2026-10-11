using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace TrustPort.Identity.Tests;

/// <summary>A tiny in-process OIDC provider on Kestrel: discovery, JWKS, userinfo and a PKCE-checking token endpoint that mints real RS256 tokens.</summary>
public sealed class FakeProvider : IAsyncDisposable
{
    private readonly WebApplication _app;
    private readonly RSA _rsa = RSA.Create(2048);
    private readonly ConcurrentDictionary<string, (string Challenge, string Nonce)> _codes = new();
    public string Issuer { get; private set; } = "";
    public List<string?> SeenAuth { get; } = new();

    private FakeProvider(WebApplication app) => _app = app;

    public static async Task<FakeProvider> StartAsync()
    {
        var builder = WebApplication.CreateBuilder();
        builder.Logging.ClearProviders();
        builder.WebHost.UseUrls("http://127.0.0.1:0");
        var app = builder.Build();
        var p = new FakeProvider(app);
        app.MapGet("/.well-known/openid-configuration", () => Results.Json(new Dictionary<string, string>
        {
            ["issuer"] = p.Issuer, ["authorization_endpoint"] = p.Issuer + "/oauth/authorize", ["token_endpoint"] = p.Issuer + "/oauth/token",
            ["jwks_uri"] = p.Issuer + "/jwks", ["userinfo_endpoint"] = p.Issuer + "/oidc/userinfo", ["end_session_endpoint"] = p.Issuer + "/oidc/logout",
        }));
        app.MapGet("/jwks", () =>
        {
            var k = JsonWebKeyConverter.ConvertFromRSASecurityKey(new RsaSecurityKey(p._rsa.ExportParameters(false)) { KeyId = "k1" });
            return Results.Json(new { keys = new[] { new { kty = "RSA", kid = "k1", alg = "RS256", use = "sig", n = k.N, e = k.E } } });
        });
        app.MapGet("/oidc/userinfo", () => Results.Json(new { sub = "u1", email = "a@b.c" }));
        app.MapPost("/oauth/token", async (HttpContext ctx) =>
        {
            var form = await ctx.Request.ReadFormAsync();
            p.SeenAuth.Add(ctx.Request.Headers.Authorization.FirstOrDefault());
            if (!p._codes.TryGetValue(form["code"].ToString(), out var entry)
                || Base64UrlEncoder.Encode(SHA256.HashData(Encoding.ASCII.GetBytes(form["code_verifier"].ToString()))) != entry.Challenge)
                return Results.Json(new { error = "invalid_grant", error_description = "bad code or verifier" }, statusCode: 400);
            var access = p.Sign(new() { ["roles"] = new[] { "admin" } }, "api");
            var atHash = Base64UrlEncoder.Encode(SHA256.HashData(Encoding.ASCII.GetBytes(access))[..16]);
            return Results.Json(new { access_token = access, token_type = "Bearer", expires_in = 300, id_token = p.Sign(new() { ["nonce"] = entry.Nonce, ["at_hash"] = atHash }, "app1") });
        });
        await app.StartAsync();
        p.Issuer = app.Services.GetRequiredService<IServer>().Features.Get<IServerAddressesFeature>()!.Addresses.First().TrimEnd('/');
        return p;
    }

    public string Sign(Dictionary<string, object> claims, string audience, RSA? key = null)
    {
        var rsaKey = new RsaSecurityKey(key ?? _rsa) { KeyId = "k1" };
        var all = new Dictionary<string, object> { ["sub"] = "u1" };
        foreach (var kv in claims) all[kv.Key] = kv.Value;
        return new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
        {
            Issuer = Issuer, Audience = audience, Expires = DateTime.UtcNow.AddMinutes(5), Claims = all,
            SigningCredentials = new SigningCredentials(rsaKey, SecurityAlgorithms.RsaSha256),
        });
    }

    public string IssueCode(string challenge, string nonce)
    {
        var code = "code-" + _codes.Count;
        _codes[code] = (challenge, nonce);
        return code;
    }

    public async ValueTask DisposeAsync() => await _app.DisposeAsync();
}
