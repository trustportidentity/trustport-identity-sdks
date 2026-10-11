import Foundation
import Security
#if canImport(AuthenticationServices)
import AuthenticationServices
#endif

/// Keychain-backed store. Items are device-only (`WhenUnlockedThisDeviceOnly`): they never sync to iCloud or restore to another device.
public struct KeychainStore: SecureStoring {
    private let service: String
    private let requireBiometrics: Bool
    public init(service: String = "com.trustportidentity.sdk", requireBiometrics: Bool = false) {
        self.service = service; self.requireBiometrics = requireBiometrics
    }

    private func query(_ key: String) -> [String: Any] {
        [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service, kSecAttrAccount as String: key]
    }

    public func get(_ key: String) throws -> String? {
        var q = query(key)
        q[kSecReturnData as String] = true
        q[kSecMatchLimit as String] = kSecMatchLimitOne
        var out: AnyObject?
        let status = SecItemCopyMatching(q as CFDictionary, &out)
        if status == errSecItemNotFound { return nil }
        guard status == errSecSuccess, let data = out as? Data else { throw TrustPortError("keychain read failed (\(status))", code: "keychain") }
        return String(data: data, encoding: .utf8)
    }

    public func set(_ key: String, value: String) throws {
        try remove(key)
        var q = query(key)
        q[kSecValueData as String] = Data(value.utf8)
        q[kSecAttrAccessible as String] = kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        if requireBiometrics {
            if let access = SecAccessControlCreateWithFlags(nil, kSecAttrAccessibleWhenUnlockedThisDeviceOnly, .userPresence, nil) {
                q.removeValue(forKey: kSecAttrAccessible as String)
                q[kSecAttrAccessControl as String] = access
            }
        }
        let status = SecItemAdd(q as CFDictionary, nil)
        guard status == errSecSuccess else { throw TrustPortError("keychain write failed (\(status))", code: "keychain") }
    }

    public func remove(_ key: String) throws {
        let status = SecItemDelete(query(key) as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else { throw TrustPortError("keychain delete failed (\(status))", code: "keychain") }
    }
}

#if canImport(AuthenticationServices)
/// System sign-in sheet. Uses a shared (non-persistent) browser session only if `ephemeral` is true.
public final class SystemWebAuthSession: NSObject, WebAuthSession, ASWebAuthenticationPresentationContextProviding, @unchecked Sendable {
    private let ephemeral: Bool
    public nonisolated init(ephemeral: Bool = false) { self.ephemeral = ephemeral; super.init() }

    @MainActor
    public func authenticate(url: URL, callbackScheme: String) async throws -> URL? {
        try await withCheckedThrowingContinuation { (cont: CheckedContinuation<URL?, Error>) in
            let session = ASWebAuthenticationSession(url: url, callbackURLScheme: callbackScheme) { callback, error in
                if let error = error as? ASWebAuthenticationSessionError, error.code == .canceledLogin { cont.resume(returning: nil) }
                else if let error { cont.resume(throwing: error) }
                else { cont.resume(returning: callback) }
            }
            session.presentationContextProvider = self
            session.prefersEphemeralWebBrowserSession = ephemeral
            if !session.start() { cont.resume(throwing: TrustPortError("could not start the sign-in session", code: "auth_session")) }
        }
    }

    public func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor { ASPresentationAnchor() }
}
#endif
