# DomainsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCustomDomain**](DomainsAPI.md#createcustomdomain) | **POST** /api/v1/domains | Add a custom domain; returns the DNS records to publish
[**deleteCustomDomain**](DomainsAPI.md#deletecustomdomain) | **DELETE** /api/v1/domains/{domainId} | Remove a custom domain
[**listCustomDomains**](DomainsAPI.md#listcustomdomains) | **GET** /api/v1/domains | List custom domains
[**verifyCustomDomain**](DomainsAPI.md#verifycustomdomain) | **POST** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain


# **createCustomDomain**
```swift
    open class func createCustomDomain(createCustomDomainInput: CreateCustomDomainInput) async throws -> CustomDomainEnvelope
```

Add a custom domain; returns the DNS records to publish

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createCustomDomainInput = CreateCustomDomainInput(domain: "domain_example", organizationId: 123) // CreateCustomDomainInput | 

// Add a custom domain; returns the DNS records to publish
do {
    let response = try await DomainsAPI.createCustomDomain(createCustomDomainInput: createCustomDomainInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createCustomDomainInput** | [**CreateCustomDomainInput**](CreateCustomDomainInput.md) |  | 

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteCustomDomain**
```swift
    open class func deleteCustomDomain(domainId: UUID) async throws
```

Remove a custom domain

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let domainId = 987 // UUID | 

// Remove a custom domain
do {
    try await DomainsAPI.deleteCustomDomain(domainId: domainId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domainId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listCustomDomains**
```swift
    open class func listCustomDomains() async throws -> CustomDomainList
```

List custom domains

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement


// List custom domains
do {
    let response = try await DomainsAPI.listCustomDomains()
    dump(response)
} catch {
    print(error)
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**CustomDomainList**](CustomDomainList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verifyCustomDomain**
```swift
    open class func verifyCustomDomain(domainId: UUID) async throws -> CustomDomainEnvelope
```

Check the DNS records for a custom domain

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let domainId = 987 // UUID | 

// Check the DNS records for a custom domain
do {
    let response = try await DomainsAPI.verifyCustomDomain(domainId: domainId)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domainId** | **UUID** |  | 

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

