# TrustPort Identity SDKs

Client libraries for authenticating against TrustPort Identity (OIDC) and calling its management API.
Plan: `identity-golive/docs/sdk-plan.md`. Not to be confused with the Beacon (observability) SDKs.

| Folder | Package | Status |
|---|---|---|
| `sdks/node` | `@trustport/identity-node` | Phase 1, in progress |
| `sdks/laravel` | `trustport/identity-laravel` | Phase 1, tested core + middleware |
| `sdks/python` | `trustport-identity` | Phase 1, tested (FastAPI, Flask) |
| `sdks/dotnet` | `TrustPort.Identity`, `TrustPort.Identity.AspNetCore` | Phase 1, tested |
| `sdks/js` | `@trustport/identity-js` (+ `/react`) | Phase 2, tested |
| `sdks/expo` | `@trustport/identity-expo` | Phase 2, tested with mocks; not run on a device |
| `sdks/swift` | `TrustPortIdentity` (SwiftPM) | Phase 2, tested on macOS; not run on a device |
| `specs/` | OpenAPI contract the management clients are generated from | to be filled |
| `conformance/` | shared suite run against every SDK | to be filled |
