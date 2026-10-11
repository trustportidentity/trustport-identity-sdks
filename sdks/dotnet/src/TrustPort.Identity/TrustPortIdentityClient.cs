using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace TrustPort.Identity;

/// <summary>OIDC client for TrustPort Identity: authorization code + PKCE, token verification, userinfo, revoke, logout.</summary>
public sealed class TrustPortIdentityClient
{
    private readonly HttpClient _http;
    private readonly TrustPortOptions _o;
    private readonly string _issuer;
    private readonly JsonWebTokenHandler _jwt = new();
    private readonly ConfigurationManager<OpenIdConnectConfiguration> _keys;
    private Task<DiscoveryDocument>? _discovery;

    public TrustPortIdentityClient(TrustPortOptions options, HttpClient? http = null)
    {
        if (string.IsNullOrEmpty(options.Issuer) || string.IsNullOrEmpty(options.ClientId))
            throw new TrustPortException("Issuer and ClientId are required", "config");
        _o = options;
        _issuer = options.Issuer.TrimEnd('/');
        _http = http ?? new HttpClient { Timeout = TimeSpan.FromSeconds(10) };
        // ConfigurationManager caches the signing keys and refreshes them when a token arrives with an unknown kid (key rotation).
        _keys = new ConfigurationManager<OpenIdConnectConfiguration>(
            _issuer + "/.well-known/openid-configuration",
            new OpenIdConnectConfigurationRetriever(),
            new HttpDocumentRetriever(_http) { RequireHttps = _issuer.StartsWith("https://", StringComparison.OrdinalIgnoreCase) });
    }

    public static TrustPortIdentityClient FromEnvironment(HttpClient? http = null) => new(new TrustPortOptions
    {
        Issuer = Environment.GetEnvironmentVariable("TRUSTPORT_ISSUER") ?? "",
        ClientId = Environment.GetEnvironmentVariable("TRUSTPORT_CLIENT_ID") ?? "",
        ClientSecret = Environment.GetEnvironmentVariable("TRUSTPORT_CLIENT_SECRET") is { Length: > 0 } s ? s : null,
        RedirectUri = Environment.GetEnvironmentVariable("TRUSTPORT_REDIRECT_URI") is { Length: > 0 } r ? r : null,
        Audience = Environment.GetEnvironmentVariable("TRUSTPORT_AUDIENCE") is { Length: > 0 } a ? a : null,
    }, http);

    public Task<DiscoveryDocument> DiscoverAsync(CancellationToken ct = default) => _discovery ??= LoadDiscoveryAsync(ct);

    private async Task<DiscoveryDocument> LoadDiscoveryAsync(CancellationToken ct)
    {
        try
        {
            using var res = await _http.GetAsync(_issuer + "/.well-known/openid-configuration", ct);
            if (!res.IsSuccessStatusCode) throw new TrustPortException($"discovery failed ({(int)res.StatusCode})", "discovery");
            var doc = await res.Content.ReadFromJsonAsync<DiscoveryDocument>(ct) ?? throw new TrustPortException("empty discovery document", "discovery");
            if (doc.Issuer.TrimEnd('/') != _issuer) throw new TrustPortException($"discovery issuer mismatch: {doc.Issuer}", "discovery");
            return doc;
        }
        catch
        {
            _discovery = null; // allow retry after a transient failure
            throw;
        }
    }

    public async Task<AuthorizationRequest> CreateAuthorizationRequestAsync(IEnumerable<string>? scopes = null, string? redirectUri = null, string? loginHint = null, CancellationToken ct = default)
    {
        var doc = await DiscoverAsync(ct);
        var redirect = redirectUri ?? _o.RedirectUri ?? throw new TrustPortException("RedirectUri is required", "config");
        var state = Base64UrlEncoder.Encode(RandomNumberGenerator.GetBytes(24));
        var nonce = Base64UrlEncoder.Encode(RandomNumberGenerator.GetBytes(24));
        var verifier = Base64UrlEncoder.Encode(RandomNumberGenerator.GetBytes(48));
        var q = new Dictionary<string, string>
        {
            ["response_type"] = "code",
            ["client_id"] = _o.ClientId,
            ["redirect_uri"] = redirect,
            ["scope"] = string.Join(' ', scopes ?? _o.Scopes),
            ["state"] = state,
            ["nonce"] = nonce,
            ["code_challenge"] = Base64UrlEncoder.Encode(SHA256.HashData(Encoding.ASCII.GetBytes(verifier))),
            ["code_challenge_method"] = "S256",
        };
        if (loginHint is not null) q["login_hint"] = loginHint;
        return new AuthorizationRequest(doc.AuthorizationEndpoint + (doc.AuthorizationEndpoint.Contains('?') ? "&" : "?") + Query(q), state, nonce, verifier);
    }

    public async Task<CallbackResult> HandleCallbackAsync(IReadOnlyDictionary<string, string> query, AuthorizationRequest saved, string? redirectUri = null, CancellationToken ct = default)
    {
        string? Get(string k) => query.TryGetValue(k, out var v) ? v : null;
        if (Get("error") is { } err)
            throw new TrustPortException(err + (Get("error_description") is { } d ? ": " + d : ""), err);
        if (!CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(saved.State), Encoding.UTF8.GetBytes(Get("state") ?? "")))
            throw new TrustPortException("state mismatch", "state_mismatch");
        if (Get("iss") is { } iss && iss.TrimEnd('/') != _issuer) throw new TrustPortException("issuer mismatch in callback", "iss_mismatch");
        var code = Get("code") ?? throw new TrustPortException("missing code", "missing_code");
        var redirect = redirectUri ?? _o.RedirectUri ?? throw new TrustPortException("RedirectUri is required", "config");

        var tokens = await TokenRequestAsync(new()
        {
            ["grant_type"] = "authorization_code", ["code"] = code, ["redirect_uri"] = redirect, ["code_verifier"] = saved.CodeVerifier,
        }, ct);
        if (tokens.IdToken is null) throw new TrustPortException("no id_token returned (was the openid scope requested?)", "no_id_token");
        var claims = await VerifyIdTokenAsync(tokens.IdToken, saved.Nonce, tokens.AccessToken);
        return new CallbackResult(tokens, claims);
    }

    public async Task<IReadOnlyDictionary<string, object>> VerifyIdTokenAsync(string idToken, string? nonce = null, string? accessToken = null)
    {
        var claims = await ValidateAsync(idToken, _o.ClientId);
        if (nonce is not null && (claims.GetValueOrDefault("nonce") as string) != nonce) throw new TrustPortException("nonce mismatch", "nonce_mismatch");
        if (accessToken is not null && claims.GetValueOrDefault("at_hash") is string atHash
            && atHash != Base64UrlEncoder.Encode(SHA256.HashData(Encoding.ASCII.GetBytes(accessToken))[..16]))
            throw new TrustPortException("at_hash mismatch", "at_hash_mismatch");
        return claims;
    }

    /// <summary>Offline check of a bearer access token (signature, issuer, expiry, optional audience). ID tokens are refused.</summary>
    public async Task<IReadOnlyDictionary<string, object>> VerifyAccessTokenAsync(string token)
    {
        var claims = await ValidateAsync(token, _o.Audience);
        if (claims.GetValueOrDefault("token_use") as string == "id") throw new TrustPortException("an ID token is not an access token", "wrong_token_type");
        return claims;
    }

    public Task<TokenSet> RefreshAsync(string refreshToken, CancellationToken ct = default) =>
        TokenRequestAsync(new() { ["grant_type"] = "refresh_token", ["refresh_token"] = refreshToken }, ct);

    public async Task<JsonElement> UserInfoAsync(string accessToken, CancellationToken ct = default)
    {
        var endpoint = (await DiscoverAsync(ct)).UserinfoEndpoint ?? throw new TrustPortException("provider has no userinfo endpoint", "unsupported");
        using var req = new HttpRequestMessage(HttpMethod.Get, endpoint);
        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        using var res = await _http.SendAsync(req, ct);
        if (!res.IsSuccessStatusCode) throw new TrustPortException($"userinfo failed ({(int)res.StatusCode})", "userinfo");
        return (await res.Content.ReadFromJsonAsync<JsonElement>(ct));
    }

    public async Task RevokeAsync(string token, string hint = "refresh_token", CancellationToken ct = default)
    {
        var endpoint = (await DiscoverAsync(ct)).RevocationEndpoint ?? throw new TrustPortException("provider has no revocation endpoint", "unsupported");
        using var res = await ClientPostAsync(endpoint, new() { ["token"] = token, ["token_type_hint"] = hint }, ct);
        if (!res.IsSuccessStatusCode) throw new TrustPortException($"revocation failed ({(int)res.StatusCode})", "revoke");
    }

    public async Task<string?> LogoutUrlAsync(string? idTokenHint = null, string? postLogoutRedirectUri = null, string? state = null, CancellationToken ct = default)
    {
        var endpoint = (await DiscoverAsync(ct)).EndSessionEndpoint;
        if (endpoint is null) return null;
        var q = new Dictionary<string, string>();
        if (idTokenHint is not null) q["id_token_hint"] = idTokenHint;
        if (postLogoutRedirectUri is not null) q["post_logout_redirect_uri"] = postLogoutRedirectUri;
        if (state is not null) q["state"] = state;
        return q.Count == 0 ? endpoint : endpoint + (endpoint.Contains('?') ? "&" : "?") + Query(q);
    }

    private async Task<IReadOnlyDictionary<string, object>> ValidateAsync(string token, string? audience)
    {
        var result = await _jwt.ValidateTokenAsync(token, new TokenValidationParameters
        {
            ConfigurationManager = _keys,
            ValidateIssuer = true,
            ValidIssuer = _issuer,
            ValidateAudience = audience is not null,
            ValidAudience = audience,
            ValidateLifetime = true,
            RequireExpirationTime = true,
            ClockSkew = _o.ClockSkew,
            ValidAlgorithms = new[] { SecurityAlgorithms.RsaSha256 },
        });
        if (!result.IsValid) throw new TrustPortException(result.Exception?.Message ?? "invalid token", "invalid_token");
        return new Dictionary<string, object>(result.Claims);
    }

    private Task<HttpResponseMessage> ClientPostAsync(string url, Dictionary<string, string> form, CancellationToken ct)
    {
        var req = new HttpRequestMessage(HttpMethod.Post, url);
        req.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        if (_o.ClientSecret is not null)
            req.Headers.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(Encoding.UTF8.GetBytes($"{Uri.EscapeDataString(_o.ClientId)}:{Uri.EscapeDataString(_o.ClientSecret)}")));
        else
            form["client_id"] = _o.ClientId; // public client: PKCE is the proof
        req.Content = new FormUrlEncodedContent(form);
        return _http.SendAsync(req, ct);
    }

    private async Task<TokenSet> TokenRequestAsync(Dictionary<string, string> form, CancellationToken ct)
    {
        using var res = await ClientPostAsync((await DiscoverAsync(ct)).TokenEndpoint, form, ct);
        JsonElement body;
        try { body = await res.Content.ReadFromJsonAsync<JsonElement>(ct); } catch (JsonException) { body = default; }
        string? S(string k) => body.ValueKind == JsonValueKind.Object && body.TryGetProperty(k, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;
        if (!res.IsSuccessStatusCode)
            throw new TrustPortException((S("error") ?? "token_error") + (S("error_description") is { } d ? ": " + d : ""), S("error") ?? "token_error");
        DateTimeOffset? exp = body.TryGetProperty("expires_in", out var e) && e.TryGetInt32(out var secs) ? DateTimeOffset.UtcNow.AddSeconds(secs) : null;
        return new TokenSet(S("access_token") ?? throw new TrustPortException("no access_token in response", "token_error"),
            S("id_token"), S("refresh_token"), S("token_type") ?? "Bearer", S("scope"), exp);
    }

    private static string Query(Dictionary<string, string> q) =>
        string.Join('&', q.Select(kv => $"{Uri.EscapeDataString(kv.Key)}={Uri.EscapeDataString(kv.Value)}"));
}
