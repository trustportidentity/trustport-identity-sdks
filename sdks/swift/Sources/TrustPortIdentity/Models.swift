import Foundation

public struct TrustPortError: Error, CustomStringConvertible, Sendable {
    public let code: String
    public let message: String
    public init(_ message: String, code: String = "trustport_error") { self.message = message; self.code = code }
    public var description: String { "\(code): \(message)" }
}

/// A decoded JSON value (ID token claims and userinfo are open-ended).
public enum JSONValue: Sendable, Equatable, Codable {
    case string(String), number(Double), bool(Bool), array([JSONValue]), object([String: JSONValue]), null

    public init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if c.decodeNil() { self = .null }
        else if let v = try? c.decode(Bool.self) { self = .bool(v) }
        else if let v = try? c.decode(Double.self) { self = .number(v) }
        else if let v = try? c.decode(String.self) { self = .string(v) }
        else if let v = try? c.decode([JSONValue].self) { self = .array(v) }
        else { self = .object(try c.decode([String: JSONValue].self)) }
    }

    public func encode(to encoder: Encoder) throws {
        var c = encoder.singleValueContainer()
        switch self {
        case .null: try c.encodeNil()
        case .bool(let v): try c.encode(v)
        case .number(let v): try c.encode(v)
        case .string(let v): try c.encode(v)
        case .array(let v): try c.encode(v)
        case .object(let v): try c.encode(v)
        }
    }

    public var string: String? { if case .string(let s) = self { return s } else { return nil } }
    public var number: Double? { if case .number(let n) = self { return n } else { return nil } }
}

/// The ID token's claims.
public struct Claims: Sendable, Equatable {
    public let raw: [String: JSONValue]
    public var subject: String { raw["sub"]?.string ?? "" }
    public var email: String? { raw["email"]?.string }
    public var name: String? { raw["name"]?.string }
    public var tenantId: String? { raw["tid"]?.string }
    public var roles: [String] {
        if case .array(let a)? = raw["roles"] { return a.compactMap(\.string) }
        return []
    }
    public func hasRole(_ role: String) -> Bool { roles.contains(role) }
}

public struct Session: Sendable {
    public let accessToken: String
    public let idToken: String?
    public let refreshToken: String?
    public let expiresAt: Date?
    public let scope: String?
    public let claims: Claims
}

public struct TrustPortConfig: Sendable {
    /// Issuer URL of the TrustPort Identity tenant.
    public var issuer: URL
    /// A public client registered in TrustPort Admin > Applications (no secret).
    public var clientId: String
    /// Your app's custom URL scheme redirect, for example `trustportauth://callback`.
    public var redirectURI: URL
    public var scopes: [String]
    /// Keep the refresh token in the Keychain so `restore()` works after a relaunch.
    public var persistRefreshToken: Bool
    public var clockTolerance: TimeInterval

    public init(issuer: URL, clientId: String, redirectURI: URL, scopes: [String] = ["openid", "profile", "email"],
                persistRefreshToken: Bool = true, clockTolerance: TimeInterval = 60) {
        self.issuer = issuer; self.clientId = clientId; self.redirectURI = redirectURI
        self.scopes = scopes; self.persistRefreshToken = persistRefreshToken; self.clockTolerance = clockTolerance
    }
}

/// Opens the system browser for sign-in. Return the URL the browser was redirected to, or nil if the user cancelled.
public protocol WebAuthSession: Sendable {
    func authenticate(url: URL, callbackScheme: String) async throws -> URL?
}

/// Small secret store (Keychain by default).
public protocol SecureStoring: Sendable {
    func get(_ key: String) throws -> String?
    func set(_ key: String, value: String) throws
    func remove(_ key: String) throws
}
