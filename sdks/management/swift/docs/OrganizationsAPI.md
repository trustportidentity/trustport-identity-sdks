# OrganizationsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrganization**](OrganizationsAPI.md#createorganization) | **POST** /api/v1/organizations | Create an organization (at most 20 domains, validated and lower-cased)
[**deleteOrganization**](OrganizationsAPI.md#deleteorganization) | **DELETE** /api/v1/organizations/{organizationId} | Delete an organization
[**listOrganizations**](OrganizationsAPI.md#listorganizations) | **GET** /api/v1/organizations | List organizations
[**updateOrganization**](OrganizationsAPI.md#updateorganization) | **PATCH** /api/v1/organizations/{organizationId} | Update an organization (only the fields you send change)


# **createOrganization**
```swift
    open class func createOrganization(createOrganizationInput: CreateOrganizationInput) async throws -> OrganizationEnvelope
```

Create an organization (at most 20 domains, validated and lower-cased)

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createOrganizationInput = CreateOrganizationInput(name: "name_example", domains: ["domains_example"], ssoProvider: "ssoProvider_example") // CreateOrganizationInput | 

// Create an organization (at most 20 domains, validated and lower-cased)
do {
    let response = try await OrganizationsAPI.createOrganization(createOrganizationInput: createOrganizationInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createOrganizationInput** | [**CreateOrganizationInput**](CreateOrganizationInput.md) |  | 

### Return type

[**OrganizationEnvelope**](OrganizationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteOrganization**
```swift
    open class func deleteOrganization(organizationId: UUID) async throws
```

Delete an organization

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let organizationId = 987 // UUID | 

// Delete an organization
do {
    try await OrganizationsAPI.deleteOrganization(organizationId: organizationId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listOrganizations**
```swift
    open class func listOrganizations() async throws -> OrganizationList
```

List organizations

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement


// List organizations
do {
    let response = try await OrganizationsAPI.listOrganizations()
    dump(response)
} catch {
    print(error)
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**OrganizationList**](OrganizationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateOrganization**
```swift
    open class func updateOrganization(organizationId: UUID, updateOrganizationInput: UpdateOrganizationInput) async throws -> OrganizationEnvelope
```

Update an organization (only the fields you send change)

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let organizationId = 987 // UUID | 
let updateOrganizationInput = UpdateOrganizationInput(name: "name_example", domains: ["domains_example"], ssoProvider: "ssoProvider_example", ssoActive: false, directorySyncActive: false) // UpdateOrganizationInput | 

// Update an organization (only the fields you send change)
do {
    let response = try await OrganizationsAPI.updateOrganization(organizationId: organizationId, updateOrganizationInput: updateOrganizationInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **UUID** |  | 
 **updateOrganizationInput** | [**UpdateOrganizationInput**](UpdateOrganizationInput.md) |  | 

### Return type

[**OrganizationEnvelope**](OrganizationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

