# ApiKeysAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createApiKey**](ApiKeysAPI.md#createapikey) | **POST** /api/v1/api-keys | Create an API key. &#x60;secret_key&#x60; is returned once, in this response.
[**deleteApiKey**](ApiKeysAPI.md#deleteapikey) | **DELETE** /api/v1/api-keys/{apiKeyId} | Revoke an API key
[**listApiKeys**](ApiKeysAPI.md#listapikeys) | **GET** /api/v1/api-keys | List API keys (the secret is never shown again)


# **createApiKey**
```swift
    open class func createApiKey(createApiKeyInput: CreateApiKeyInput) async throws -> ApiKeyEnvelope
```

Create an API key. `secret_key` is returned once, in this response.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createApiKeyInput = CreateApiKeyInput(name: "name_example", keyType: "keyType_example", environment: "environment_example") // CreateApiKeyInput | 

// Create an API key. `secret_key` is returned once, in this response.
do {
    let response = try await ApiKeysAPI.createApiKey(createApiKeyInput: createApiKeyInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createApiKeyInput** | [**CreateApiKeyInput**](CreateApiKeyInput.md) |  | 

### Return type

[**ApiKeyEnvelope**](ApiKeyEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteApiKey**
```swift
    open class func deleteApiKey(apiKeyId: UUID) async throws
```

Revoke an API key

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let apiKeyId = 987 // UUID | 

// Revoke an API key
do {
    try await ApiKeysAPI.deleteApiKey(apiKeyId: apiKeyId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiKeyId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listApiKeys**
```swift
    open class func listApiKeys() async throws -> ApiKeyList
```

List API keys (the secret is never shown again)

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement


// List API keys (the secret is never shown again)
do {
    let response = try await ApiKeysAPI.listApiKeys()
    dump(response)
} catch {
    print(error)
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ApiKeyList**](ApiKeyList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

