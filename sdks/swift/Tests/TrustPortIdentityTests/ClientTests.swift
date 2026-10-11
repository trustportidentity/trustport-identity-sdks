import XCTest
import CryptoKit
@testable import TrustPortIdentity

// MARK: fakes

/// Serves a fake provider through URLProtocol, so the real URLSession code path is exercised without a network.
final class FakeProviderProtocol: URLProtocol, @unchecked Sendable {
    nonisolated(unsafe) static var handler: ((URLRequest, Data) -> (Int, Data))?
    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }
    override func startLoading() {
        var body = Data()
        if let stream = request.httpBodyStream {
            stream.open(); let buf = UnsafeMutablePointer<UInt8>.allocate(capacity: 4096); defer { buf.deallocate() }
            while stream.hasBytesAvailable { let n = stream.read(buf, maxLength: 4096); if n <= 0 { break }; body.append(buf, count: n) }
            stream.close()
        } else if let b = request.httpBody { body = b }
        let (status, data) = Self.handler?(request, body) ?? (404, Data())
        client?.urlProtocol(self, didReceive: HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: nil, headerFields: ["Content-Type": "application/json"])!, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: data)
        client?.urlProtocolDidFinishLoading(self)
    }
    override func stopLoading() {}
}

final class MemoryStore: SecureStoring, @unchecked Sendable {
    var items: [String: String] = [:]
    func get(_ key: String) throws -> String? { items[key] }
    func set(_ key: String, value: String) throws { items[key] = value }
    func remove(_ key: String) throws { items[key] = nil }
}

final class Provider: @unchecked Sendable {
    let issuer = "https://id.test"
    var codes: [String: (challenge: String, nonce: String)] = [:]
    var refreshTokens: Set<String> = []
    var idOverrides: [String: Any] = [:]
    var expiresIn = 300.0
    var tokenCalls: [[String: String]] = []
    var revoked: [String] = []
    var lastNonce = ""

    func b64(_ d: Data) -> String { TrustPortClient.b64url(d) }
    func jwt(_ claims: [String: Any]) -> String {
        let h = try! JSONSerialization.data(withJSONObject: ["alg": "RS256", "kid": "k1"])
        let p = try! JSONSerialization.data(withJSONObject: claims)
        return "\(b64(h)).\(b64(p)).\(b64(Data("sig".utf8)))"
    }
    func mint(nonce: String) -> Data {
        let access = "at-" + UUID().uuidString
        let now = Date().timeIntervalSince1970
        var claims: [String: Any] = ["iss": issuer, "sub": "u1", "aud": "app1", "exp": now + 300, "iat": now, "nonce": nonce,
                                     "email": "a@b.c", "roles": ["admin"],
                                     "at_hash": b64(Data(SHA256.hash(data: Data(access.utf8))).prefix(16))]
        for (k, v) in idOverrides { claims[k] = v }
        let rt = "rt-" + UUID().uuidString; refreshTokens.insert(rt)
        return try! JSONSerialization.data(withJSONObject: ["access_token": access, "id_token": jwt(claims), "refresh_token": rt, "token_type": "Bearer", "expires_in": expiresIn])
    }
    func install() {
        FakeProviderProtocol.handler = { req, body in
            let path = req.url!.path
            func json(_ o: Any, _ s: Int = 200) -> (Int, Data) { (s, try! JSONSerialization.data(withJSONObject: o)) }
            switch path {
            case "/.well-known/openid-configuration":
                return json(["issuer": self.issuer, "authorization_endpoint": "\(self.issuer)/oauth/authorize", "token_endpoint": "\(self.issuer)/oauth/token",
                             "userinfo_endpoint": "\(self.issuer)/oidc/userinfo", "revocation_endpoint": "\(self.issuer)/oauth/revoke", "end_session_endpoint": "\(self.issuer)/oidc/logout"])
            case "/oidc/userinfo": return json(["sub": "u1", "email": "a@b.c"])
            case "/oauth/revoke":
                self.revoked.append(Self.parse(body)["token"] ?? ""); return json([:])
            case "/oauth/token":
                let f = Self.parse(body); self.tokenCalls.append(f)
                if f["grant_type"] == "refresh_token" {
                    guard let rt = f["refresh_token"], self.refreshTokens.remove(rt) != nil else { return json(["error": "invalid_grant"], 400) }
                    return (200, self.mint(nonce: ""))
                }
                guard let code = f["code"], let entry = self.codes[code],
                      self.b64(Data(SHA256.hash(data: Data((f["code_verifier"] ?? "").utf8)))) == entry.challenge else {
                    return json(["error": "invalid_grant", "error_description": "bad code or verifier"], 400)
                }
                self.codes[code] = nil
                return (200, self.mint(nonce: entry.nonce))
            default: return json([:], 404)
            }
        }
    }
    static func parse(_ body: Data) -> [String: String] {
        var out: [String: String] = [:]
        for pair in String(decoding: body, as: UTF8.self).split(separator: "&") {
            let kv = pair.split(separator: "=", maxSplits: 1).map { String($0).removingPercentEncoding ?? "" }
            out[kv[0]] = kv.count > 1 ? kv[1] : ""
        }
        return out
    }
}

/// Plays the browser: reads the authorize URL, registers a code bound to its challenge, returns the callback URL.
struct FakeBrowser: WebAuthSession {
    let provider: Provider
    var overrideState: String? = nil
    var overrideIss: String? = nil
    var cancel = false
    func authenticate(url: URL, callbackScheme: String) async throws -> URL? {
        if cancel { return nil }
        if url.path == "/oidc/logout" { return nil }
        let q = TrustPortClient.query(of: url)
        let code = "code-" + UUID().uuidString
        provider.codes[code] = (q["code_challenge"]!, q["nonce"]!)
        var c = URLComponents(string: q["redirect_uri"]!)!
        c.queryItems = [URLQueryItem(name: "code", value: code), URLQueryItem(name: "state", value: overrideState ?? q["state"]),
                        URLQueryItem(name: "iss", value: overrideIss ?? provider.issuer)]
        return c.url
    }
}

// MARK: tests

final class ClientTests: XCTestCase {
    var provider: Provider!
    var store: MemoryStore!
    var urlSession: URLSession!

    override func setUp() {
        provider = Provider(); provider.install(); store = MemoryStore()
        let cfg = URLSessionConfiguration.ephemeral; cfg.protocolClasses = [FakeProviderProtocol.self]
        urlSession = URLSession(configuration: cfg)
    }

    func client(_ browser: WebAuthSession? = nil, persist: Bool = true) -> TrustPortClient {
        TrustPortClient(config: TrustPortConfig(issuer: URL(string: provider.issuer)!, clientId: "app1", redirectURI: URL(string: "trustportauth://callback")!, persistRefreshToken: persist),
                        web: browser ?? FakeBrowser(provider: provider), store: store, session: urlSession)
    }

    func testLoginVerifiesPKCEAndClaims() async throws {
        let c = client()
        let s = try await c.login()
        XCTAssertEqual(s.claims.subject, "u1"); XCTAssertEqual(s.claims.email, "a@b.c"); XCTAssertTrue(s.claims.hasRole("admin"))
        XCTAssertNil(provider.tokenCalls[0]["client_secret"]); XCTAssertEqual(provider.tokenCalls[0]["client_id"], "app1")
        XCTAssertEqual(store.items["trustport.refresh"], s.refreshToken)
        let info = try await c.userinfo()
        XCTAssertEqual(info["email"]?.string, "a@b.c")
    }

    func testCallbackRejections() async throws {
        do { _ = try await client(FakeBrowser(provider: provider, overrideState: "forged")).login(); XCTFail() }
        catch let e as TrustPortError { XCTAssertEqual(e.code, "state_mismatch") }
        do { _ = try await client(FakeBrowser(provider: provider, overrideIss: "https://evil")).login(); XCTFail() }
        catch let e as TrustPortError { XCTAssertEqual(e.code, "iss_mismatch") }
        do { _ = try await client(FakeBrowser(provider: provider, cancel: true)).login(); XCTFail() }
        catch let e as TrustPortError { XCTAssertEqual(e.code, "cancelled") }
    }

    func testIDTokenClaimChecks() async throws {
        let cases: [([String: Any], String)] = [
            (["nonce": "other"], "nonce_mismatch"), (["aud": "someone-else"], "invalid_id_token"), (["exp": 1.0], "invalid_id_token"),
            (["at_hash": "AAAA"], "at_hash_mismatch"), (["iss": "https://evil"], "invalid_id_token"),
        ]
        for (override, code) in cases {
            provider.idOverrides = override
            let c = client()
            do { _ = try await c.login(); XCTFail("expected \(code)") }
            catch let e as TrustPortError { XCTAssertEqual(e.code, code, "\(override)") }
            let session = await c.session
            XCTAssertNil(session)
        }
    }

    func testRefreshIsSingleFlightAndFailureSignsOut() async throws {
        provider.expiresIn = 10
        let c = client(); _ = try await c.login()
        async let a = c.accessToken(); async let b = c.accessToken()
        let (ta, tb) = try await (a, b)
        XCTAssertEqual(ta, tb)
        XCTAssertEqual(provider.tokenCalls.filter { $0["grant_type"] == "refresh_token" }.count, 1)
        provider.refreshTokens.removeAll()
        do { _ = try await c.refresh(); XCTFail() } catch let e as TrustPortError { XCTAssertEqual(e.code, "invalid_grant") }
        let session = await c.session
        XCTAssertNil(session); XCTAssertNil(store.items["trustport.refresh"])
    }

    func testRestoreAfterRelaunchAndLogout() async throws {
        let first = client(); let s = try await first.login()
        let relaunched = client()
        let restored = await relaunched.restore()
        XCTAssertEqual(restored?.accessToken.hasPrefix("at-"), true)
        store.items.removeAll()
        let nothing = await client().restore() // empty store -> signed out, no network call needed
        XCTAssertNil(nothing)
        XCTAssertNotEqual(s.accessToken, restored?.accessToken)
        let c3 = client(); _ = try await c3.login()
        await c3.logout()
        XCTAssertNil(store.items["trustport.refresh"])
        XCTAssertFalse(provider.revoked.isEmpty)
    }
}

final class KeychainTests: XCTestCase {
    func testRoundTrip() throws {
        let k = KeychainStore(service: "com.trustportidentity.sdk.tests." + UUID().uuidString)
        XCTAssertNil(try k.get("a"))
        try k.set("a", value: "one"); try k.set("a", value: "two")
        XCTAssertEqual(try k.get("a"), "two")
        try k.remove("a"); XCTAssertNil(try k.get("a"))
    }
}
