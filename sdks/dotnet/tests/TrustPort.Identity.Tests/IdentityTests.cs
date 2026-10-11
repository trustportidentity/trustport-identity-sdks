using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Security.Claims;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using TrustPort.Identity.AspNetCore;
using Xunit;

namespace TrustPort.Identity.Tests;

public class IdentityTests
{
    private static TrustPortIdentityClient Make(FakeProvider p, string? secret = "s3cret") => new(new TrustPortOptions
    {
        Issuer = p.Issuer, ClientId = "app1", ClientSecret = secret, RedirectUri = "http://app/cb", Audience = "api",
    });

    [Fact]
    public async Task FullLogin_VerifiesPkceStateNonceAndAtHash()
    {
        await using var p = await FakeProvider.StartAsync();
        var id = Make(p);
        var req = await id.CreateAuthorizationRequestAsync();
        var q = HttpUtility.ParseQueryString(new Uri(req.Url).Query);
        Assert.Equal("S256", q["code_challenge_method"]);
        var code = p.IssueCode(q["code_challenge"]!, req.Nonce);

        var res = await id.HandleCallbackAsync(new Dictionary<string, string> { ["code"] = code, ["state"] = req.State, ["iss"] = p.Issuer }, req);
        Assert.Equal("u1", res.Claims["sub"]);
        var access = await id.VerifyAccessTokenAsync(res.Tokens.AccessToken);
        Assert.Equal("u1", access["sub"]);
        Assert.Equal("a@b.c", (await id.UserInfoAsync(res.Tokens.AccessToken)).GetProperty("email").GetString());
        Assert.StartsWith("Basic ", p.SeenAuth[^1]);
    }

    [Fact]
    public async Task PublicClient_SendsNoBasicAuth()
    {
        await using var p = await FakeProvider.StartAsync();
        var id = Make(p, secret: null);
        var req = await id.CreateAuthorizationRequestAsync();
        var code = p.IssueCode(HttpUtility.ParseQueryString(new Uri(req.Url).Query)["code_challenge"]!, req.Nonce);
        await id.HandleCallbackAsync(new Dictionary<string, string> { ["code"] = code, ["state"] = req.State }, req);
        Assert.Null(p.SeenAuth[^1]);
    }

    [Fact]
    public async Task Callback_RejectsBadStateIssuerErrorAndWrongVerifier()
    {
        await using var p = await FakeProvider.StartAsync();
        var id = Make(p);
        var req = await id.CreateAuthorizationRequestAsync();
        var e1 = await Assert.ThrowsAsync<TrustPortException>(() => id.HandleCallbackAsync(new Dictionary<string, string> { ["code"] = "x", ["state"] = "nope" }, req));
        Assert.Equal("state_mismatch", e1.Code);
        var e2 = await Assert.ThrowsAsync<TrustPortException>(() => id.HandleCallbackAsync(new Dictionary<string, string> { ["code"] = "x", ["state"] = req.State, ["iss"] = "https://evil" }, req));
        Assert.Equal("iss_mismatch", e2.Code);
        var e3 = await Assert.ThrowsAsync<TrustPortException>(() => id.HandleCallbackAsync(new Dictionary<string, string> { ["error"] = "access_denied", ["state"] = req.State }, req));
        Assert.Equal("access_denied", e3.Code);
        var wrong = p.IssueCode("some-other-challenge", req.Nonce);
        var e4 = await Assert.ThrowsAsync<TrustPortException>(() => id.HandleCallbackAsync(new Dictionary<string, string> { ["code"] = wrong, ["state"] = req.State }, req));
        Assert.Equal("invalid_grant", e4.Code);
    }

    [Fact]
    public async Task TokenVerification_RefusesIdTokensWrongAudienceForgeriesAndBadNonce()
    {
        await using var p = await FakeProvider.StartAsync();
        var id = Make(p);
        var e1 = await Assert.ThrowsAsync<TrustPortException>(() => id.VerifyAccessTokenAsync(p.Sign(new() { ["token_use"] = "id" }, "api")));
        Assert.Equal("wrong_token_type", e1.Code);
        await Assert.ThrowsAsync<TrustPortException>(() => id.VerifyAccessTokenAsync(p.Sign(new(), "someone-else")));
        using var attacker = RSA.Create(2048);
        await Assert.ThrowsAsync<TrustPortException>(() => id.VerifyAccessTokenAsync(p.Sign(new(), "api", attacker)));
        var e4 = await Assert.ThrowsAsync<TrustPortException>(() => id.VerifyIdTokenAsync(p.Sign(new() { ["nonce"] = "other" }, "app1"), nonce: "expected"));
        Assert.Equal("nonce_mismatch", e4.Code);
    }

    [Fact]
    public async Task AspNetCore_ApiAuthentication_401_403_200()
    {
        await using var p = await FakeProvider.StartAsync();
        var builder = WebApplication.CreateBuilder();
        builder.Logging.ClearProviders();
        builder.WebHost.UseTestServer();
        builder.Services.AddTrustPortAuthentication(o => { o.Issuer = p.Issuer; o.ClientId = "app1"; o.Audience = "api"; });
        builder.Services.AddAuthorization();
        await using var app = builder.Build();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapGet("/me", (ClaimsPrincipal u) => u.FindFirst("sub")?.Value).RequireAuthorization();
        app.MapGet("/admin", () => "ok").RequireAuthorization(new AuthorizeAttribute { Roles = "admin" });
        await app.StartAsync();
        var client = app.GetTestClient();

        HttpRequestMessage Req(string path, string? token) { var r = new HttpRequestMessage(HttpMethod.Get, path); if (token != null) r.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token); return r; }
        Assert.Equal(HttpStatusCode.Unauthorized, (await client.SendAsync(Req("/me", null))).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await client.SendAsync(Req("/me", "junk"))).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await client.SendAsync(Req("/me", p.Sign(new() { ["token_use"] = "id" }, "api")))).StatusCode);
        var admin = p.Sign(new() { ["roles"] = new[] { "admin" } }, "api");
        var viewer = p.Sign(new() { ["roles"] = new[] { "viewer" } }, "api");
        Assert.Equal(HttpStatusCode.Forbidden, (await client.SendAsync(Req("/admin", viewer))).StatusCode);
        var ok = await client.SendAsync(Req("/admin", admin));
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.Equal("u1", await (await client.SendAsync(Req("/me", admin))).Content.ReadAsStringAsync());
    }
}
