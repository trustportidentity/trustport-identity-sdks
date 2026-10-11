using System.Text.Json.Serialization;

namespace TrustPort.Identity;

public sealed class TrustPortOptions
{
    /// <summary>Issuer URL of the TrustPort Identity tenant, e.g. https://id.example.com</summary>
    public string Issuer { get; set; } = "";
    public string ClientId { get; set; } = "";
    /// <summary>Leave null for public clients (mobile/desktop); they authenticate with PKCE only.</summary>
    public string? ClientSecret { get; set; }
    public string? RedirectUri { get; set; }
    public IList<string> Scopes { get; set; } = new List<string> { "openid", "profile", "email" };
    /// <summary>If set, access tokens must carry this audience.</summary>
    public string? Audience { get; set; }
    public TimeSpan ClockSkew { get; set; } = TimeSpan.FromSeconds(5);
}

public sealed class TrustPortException(string message, string code = "trustport_error") : Exception(message)
{
    public string Code { get; } = code;
}

public sealed class DiscoveryDocument
{
    [JsonPropertyName("issuer")] public string Issuer { get; set; } = "";
    [JsonPropertyName("authorization_endpoint")] public string AuthorizationEndpoint { get; set; } = "";
    [JsonPropertyName("token_endpoint")] public string TokenEndpoint { get; set; } = "";
    [JsonPropertyName("jwks_uri")] public string JwksUri { get; set; } = "";
    [JsonPropertyName("userinfo_endpoint")] public string? UserinfoEndpoint { get; set; }
    [JsonPropertyName("revocation_endpoint")] public string? RevocationEndpoint { get; set; }
    [JsonPropertyName("end_session_endpoint")] public string? EndSessionEndpoint { get; set; }
}

/// <summary>Keep State, Nonce and CodeVerifier in the user's session between the redirect and the callback.</summary>
public sealed record AuthorizationRequest(string Url, string State, string Nonce, string CodeVerifier);

public sealed record TokenSet(string AccessToken, string? IdToken, string? RefreshToken, string TokenType, string? Scope, DateTimeOffset? ExpiresAt);

public sealed record CallbackResult(TokenSet Tokens, IReadOnlyDictionary<string, object> Claims);
