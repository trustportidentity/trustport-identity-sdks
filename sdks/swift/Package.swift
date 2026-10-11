// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "TrustPortIdentity",
    platforms: [.iOS(.v15), .macOS(.v12)],
    products: [.library(name: "TrustPortIdentity", targets: ["TrustPortIdentity"])],
    targets: [
        .target(name: "TrustPortIdentity"),
        .testTarget(name: "TrustPortIdentityTests", dependencies: ["TrustPortIdentity"]),
    ]
)
