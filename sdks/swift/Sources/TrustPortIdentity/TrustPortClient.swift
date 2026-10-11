import Foundation
import CryptoKit

/// Public-client OIDC for iOS and macOS: authorization code + PKCE through the system browser, refresh, userinfo, logout.
public actor TrustPortClient {
    private let config: TrustPortConfig
    private let http: URLSession
    private let web: WebAuthSession
    private let store: SecureStoring
    private var discovery: Discovery?
    private var current: Session?
    private var refreshTask: Task<Session, Error>?
    private let refreshKey = "trustport.refresh"

    private struct Discovery: Decodable {
        let issuer: String
        let authorization_endpoint: URL
        let token_endpoint: URL
        let userinfo_endpoint: URL?
        let revocation_endpoint: URL?
        let end_session_endpoint: URL?
    }

    private struct TokenResponse: Decodable {
        let access_token: String
        let id_token: String?
        let refresh_token: String?
        let scope: String?
        let expires_in: Double?
    }

    public init(config: TrustPortConfig, web: WebAuthSession? = nil, store: SecureStoring = KeychainStore(), session: URLSession = .shared) {
        self.config = config; self.store = store; self.http = session
        #if canImport(AuthenticationServices)
        self.web = web ?? SystemWebAuthSession()
        #else
        self.web = web ?? UnavailableWebAuth()
        #endif
    }

    public var session: Session? { current }

    // MARK: sign in / out

    /// Opens the system sign-in sheet and returns the new session. Throws `cancelled` if the user dismisses it.
    public func login(loginHint: String? = nil) async throws -> Session {
        let doc = try await discover()
        let state = Self.b64url(Self.random(24)), nonce = Self.b64url(Self.random(24)), verifier = Self.b64url(Self.random(48))
        let challenge = Self.b64url(Data(SHA256.hash(data: Data(verifier.utf8))))
        var items: [(String, String)] = [
            ("response_type", "code"), ("client_id", config.clientId), ("redirect_uri", config.redirectURI.absoluteString),
            ("scope", config.scopes.joined(separator: " ")), ("state", state), ("nonce", nonce),
            ("code_challenge", challenge), ("code_challenge_method", "S256"),
        ]
        if let loginHint { items.append(("login_hint", loginHint)) }
        var comps = URLComponents(url: doc.authorization_endpoint, resolvingAgainstBaseURL: false)!
        comps.queryItems = (comps.queryItems ?? []) + items.map { URLQueryItem(name: $0.0, value: $0.1) }

        guard let scheme = config.redirectURI.scheme else { throw TrustPortError("redirectURI needs a scheme", code: "config") }
        guard let back = try await web.authenticate(url: comps.url!, callbackScheme: scheme) else { throw TrustPortError("sign-in cancelled", code: "cancelled") }
        let q = Self.query(of: back)
        if let err = q["error"] { throw TrustPortError(err + (q["error_description"].map { ": " + $0 } ?? ""), code: err) }
        guard let returned = q["state"], returned == state else { throw TrustPortError("state mismatch", code: "state_mismatch") }
        if let iss = q["iss"], iss.trimmingCharacters(in: CharacterSet(charactersIn: "/")) != issuer { throw TrustPortError("issuer mismatch in callback", code: "iss_mismatch") }
        guard let code = q["code"] else { throw TrustPortError("missing code", code: "missing_code") }

        let tokens = try await tokenRequest([
            "grant_type": "authorization_code", "code": code, "redirect_uri": config.redirectURI.absoluteString, "code_verifier": verifier,
        ])
        guard let idToken = tokens.id_token else { throw TrustPortError("no id_token returned (was the openid scope requested?)", code: "no_id_token") }
        let claims = try checkIDToken(idToken, nonce: nonce, accessToken: tokens.access_token)
        return try adopt(tokens, claims: claims, keepRefresh: nil)
    }

    /// Resumes a session from the Keychain refresh token after a relaunch. Returns nil when signed out.
    public func restore() async -> Session? {
        guard let rt = try? store.get(refreshKey) else { return nil }
        current = Session(accessToken: "", idToken: nil, refreshToken: rt, expiresAt: .distantPast, scope: nil, claims: Claims(raw: [:]))
        return try? await refresh()
    }

    /// A fresh access token (refreshed if it expires within 30 s), or nil when signed out.
    public func accessToken() async throws -> String? {
        guard let s = current else { return nil }
        if let exp = s.expiresAt, s.refreshToken != nil, exp.timeIntervalSinceNow < 30 { return try await refresh().accessToken }
        return s.accessToken
    }

    /// Single-flight: concurrent callers share one refresh request.
    @discardableResult
    public func refresh() async throws -> Session {
        if let task = refreshTask { return try await task.value }
        guard let old = current, let rt = old.refreshToken else { throw TrustPortError("no refresh token", code: "no_refresh_token") }
        let task = Task { () throws -> Session in
            let t = try await self.tokenRequest(["grant_type": "refresh_token", "refresh_token": rt])
            let claims = try t.id_token.map { try self.checkIDToken($0, nonce: nil, accessToken: t.access_token) } ?? old.claims
            return try self.adopt(t, claims: claims, keepRefresh: rt)
        }
        refreshTask = task
        defer { refreshTask = nil }
        do { return try await task.value }
        catch { current = nil; try? store.remove(refreshKey); throw error }
    }

    public func userinfo() async throws -> [String: JSONValue] {
        let doc = try await discover()
        guard let endpoint = doc.userinfo_endpoint else { throw TrustPortError("provider has no userinfo endpoint", code: "unsupported") }
        guard let token = try await accessToken() else { throw TrustPortError("not signed in", code: "not_signed_in") }
        var req = URLRequest(url: endpoint)
        req.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        let (data, res) = try await http.data(for: req)
        guard (res as? HTTPURLResponse)?.statusCode ?? 0 < 300 else { throw TrustPortError("userinfo failed", code: "userinfo") }
        return try JSONDecoder().decode([String: JSONValue].self, from: data)
    }

    /// Clears the local session, revokes the refresh token, and ends the TrustPort browser session (best effort).
    public func logout(endProviderSession: Bool = true) async {
        let s = current
        current = nil
        try? store.remove(refreshKey)
        guard let s, let doc = try? await discover() else { return }
        if let revoke = doc.revocation_endpoint, let rt = s.refreshToken {
            var req = URLRequest(url: revoke)
            req.httpMethod = "POST"
            req.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
            req.httpBody = Self.form(["token": rt, "token_type_hint": "refresh_token", "client_id": config.clientId])
            _ = try? await http.data(for: req)
        }
        guard endProviderSession, let end = doc.end_session_endpoint, let scheme = config.redirectURI.scheme else { return }
        var comps = URLComponents(url: end, resolvingAgainstBaseURL: false)!
        var items = comps.queryItems ?? []
        if let id = s.idToken { items.append(URLQueryItem(name: "id_token_hint", value: id)) }
        items.append(URLQueryItem(name: "post_logout_redirect_uri", value: config.redirectURI.absoluteString))
        comps.queryItems = items
        _ = try? await web.authenticate(url: comps.url!, callbackScheme: scheme)
    }

    // MARK: internals

    private var issuer: String { config.issuer.absoluteString.trimmingCharacters(in: CharacterSet(charactersIn: "/")) }

    private func discover() async throws -> Discovery {
        if let discovery { return discovery }
        let url = config.issuer.appendingPathComponent(".well-known/openid-configuration")
        let (data, res) = try await http.data(from: url)
        guard (res as? HTTPURLResponse)?.statusCode ?? 0 < 300 else { throw TrustPortError("discovery failed", code: "discovery") }
        let doc = try JSONDecoder().decode(Discovery.self, from: data)
        guard doc.issuer.trimmingCharacters(in: CharacterSet(charactersIn: "/")) == issuer else { throw TrustPortError("discovery issuer mismatch", code: "discovery") }
        discovery = doc
        return doc
    }

    private func tokenRequest(_ form: [String: String]) async throws -> TokenResponse {
        let doc = try await discover()
        var req = URLRequest(url: doc.token_endpoint)
        req.httpMethod = "POST"
        req.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        req.setValue("application/json", forHTTPHeaderField: "Accept")
        req.httpBody = Self.form(form.merging(["client_id": config.clientId]) { a, _ in a }) // public client: PKCE is the proof
        let (data, res) = try await http.data(for: req)
        if (res as? HTTPURLResponse)?.statusCode ?? 0 >= 300 {
            let body = (try? JSONDecoder().decode([String: JSONValue].self, from: data)) ?? [:]
            let code = body["error"]?.string ?? "token_error"
            throw TrustPortError(code + (body["error_description"]?.string.map { ": " + $0 } ?? ""), code: code)
        }
        return try JSONDecoder().decode(TokenResponse.self, from: data)
    }

    private func adopt(_ t: TokenResponse, claims: Claims, keepRefresh: String?) throws -> Session {
        let refresh = t.refresh_token ?? keepRefresh
        let s = Session(accessToken: t.access_token, idToken: t.id_token, refreshToken: refresh,
                        expiresAt: t.expires_in.map { Date().addingTimeInterval($0) }, scope: t.scope, claims: claims)
        if config.persistRefreshToken, let refresh { try store.set(refreshKey, value: refresh) }
        current = s
        return s
    }

    /// Claim validation only: the token came straight from the token endpoint over TLS (OIDC Core 3.1.3.7 allows skipping the signature).
    private nonisolated func checkIDToken(_ jwt: String, nonce: String?, accessToken: String) throws -> Claims {
        let parts = jwt.split(separator: ".", omittingEmptySubsequences: false)
        guard parts.count == 3, let payload = Self.b64urlDecode(String(parts[1])),
              let raw = try? JSONDecoder().decode([String: JSONValue].self, from: payload) else { throw TrustPortError("malformed id_token", code: "invalid_id_token") }
        let iss = (raw["iss"]?.string ?? "").trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        guard iss == config.issuer.absoluteString.trimmingCharacters(in: CharacterSet(charactersIn: "/")) else { throw TrustPortError("id_token issuer mismatch", code: "invalid_id_token") }
        let aud: [String]
        switch raw["aud"] { case .string(let s)?: aud = [s]; case .array(let a)?: aud = a.compactMap(\.string); default: aud = [] }
        guard aud.contains(config.clientId) else { throw TrustPortError("id_token audience mismatch", code: "invalid_id_token") }
        guard let exp = raw["exp"]?.number, Date(timeIntervalSince1970: exp).addingTimeInterval(config.clockTolerance) > Date() else { throw TrustPortError("id_token expired", code: "invalid_id_token") }
        if let nonce, raw["nonce"]?.string != nonce { throw TrustPortError("nonce mismatch", code: "nonce_mismatch") }
        if let atHash = raw["at_hash"]?.string {
            let expected = Self.b64url(Data(SHA256.hash(data: Data(accessToken.utf8))).prefix(16))
            guard atHash == expected else { throw TrustPortError("at_hash mismatch", code: "at_hash_mismatch") }
        }
        return Claims(raw: raw)
    }

    static func random(_ n: Int) -> Data {
        var g = SystemRandomNumberGenerator()
        return Data((0..<n).map { _ in UInt8.random(in: .min ... .max, using: &g) })
    }

    static func b64url(_ d: Data) -> String {
        d.base64EncodedString().replacingOccurrences(of: "+", with: "-").replacingOccurrences(of: "/", with: "_").replacingOccurrences(of: "=", with: "")
    }

    static func b64urlDecode(_ s: String) -> Data? {
        var t = s.replacingOccurrences(of: "-", with: "+").replacingOccurrences(of: "_", with: "/")
        while t.count % 4 != 0 { t += "=" }
        return Data(base64Encoded: t)
    }

    static func query(of url: URL) -> [String: String] {
        var out: [String: String] = [:]
        for item in URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems ?? [] { out[item.name] = item.value ?? "" }
        return out
    }

    static func form(_ f: [String: String]) -> Data {
        var allowed = CharacterSet.alphanumerics; allowed.insert(charactersIn: "-._~")
        return Data(f.map { "\($0.key.addingPercentEncoding(withAllowedCharacters: allowed)!)=\($0.value.addingPercentEncoding(withAllowedCharacters: allowed)!)" }.joined(separator: "&").utf8)
    }
}

#if !canImport(AuthenticationServices)
private struct UnavailableWebAuth: WebAuthSession {
    func authenticate(url: URL, callbackScheme: String) async throws -> URL? { throw TrustPortError("no web authentication session on this platform", code: "unsupported") }
}
#endif
