# ApplicationsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createApplication**](ApplicationsAPI.md#createapplication) | **POST** /api/v1/applications | Register an application. The client secret is returned once, in this response.
[**deleteApplication**](ApplicationsAPI.md#deleteapplication) | **DELETE** /api/v1/applications/{applicationId} | Delete an application
[**listApplications**](ApplicationsAPI.md#listapplications) | **GET** /api/v1/applications | List applications (OAuth / OIDC clients)
[**rotateApplicationSecret**](ApplicationsAPI.md#rotateapplicationsecret) | **POST** /api/v1/applications/{applicationId}/rotate-secret | Issue a new client secret (returned once). The old secret stops working.
[**updateApplication**](ApplicationsAPI.md#updateapplication) | **PATCH** /api/v1/applications/{applicationId} | Update an application&#39;s name or redirect URIs


# **createApplication**
```swift
    open class func createApplication(createApplicationInput: CreateApplicationInput) async throws -> ApplicationEnvelope
```

Register an application. The client secret is returned once, in this response.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createApplicationInput = CreateApplicationInput(name: "name_example", redirectUris: ["redirectUris_example"]) // CreateApplicationInput | 

// Register an application. The client secret is returned once, in this response.
do {
    let response = try await ApplicationsAPI.createApplication(createApplicationInput: createApplicationInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createApplicationInput** | [**CreateApplicationInput**](CreateApplicationInput.md) |  | 

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteApplication**
```swift
    open class func deleteApplication(applicationId: UUID) async throws
```

Delete an application

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let applicationId = 987 // UUID | 

// Delete an application
do {
    try await ApplicationsAPI.deleteApplication(applicationId: applicationId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listApplications**
```swift
    open class func listApplications() async throws -> ApplicationList
```

List applications (OAuth / OIDC clients)

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement


// List applications (OAuth / OIDC clients)
do {
    let response = try await ApplicationsAPI.listApplications()
    dump(response)
} catch {
    print(error)
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ApplicationList**](ApplicationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rotateApplicationSecret**
```swift
    open class func rotateApplicationSecret(applicationId: UUID) async throws -> ApplicationEnvelope
```

Issue a new client secret (returned once). The old secret stops working.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let applicationId = 987 // UUID | 

// Issue a new client secret (returned once). The old secret stops working.
do {
    let response = try await ApplicationsAPI.rotateApplicationSecret(applicationId: applicationId)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationId** | **UUID** |  | 

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateApplication**
```swift
    open class func updateApplication(applicationId: UUID, createApplicationInput: CreateApplicationInput) async throws -> ApplicationEnvelope
```

Update an application's name or redirect URIs

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let applicationId = 987 // UUID | 
let createApplicationInput = CreateApplicationInput(name: "name_example", redirectUris: ["redirectUris_example"]) // CreateApplicationInput | 

// Update an application's name or redirect URIs
do {
    let response = try await ApplicationsAPI.updateApplication(applicationId: applicationId, createApplicationInput: createApplicationInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationId** | **UUID** |  | 
 **createApplicationInput** | [**CreateApplicationInput**](CreateApplicationInput.md) |  | 

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

