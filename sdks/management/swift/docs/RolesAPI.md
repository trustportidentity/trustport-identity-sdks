# RolesAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**assignRole**](RolesAPI.md#assignrole) | **POST** /api/v1/roles/assign | Assign a role to a user (optionally until a date). Only an owner can grant ownership.
[**createRole**](RolesAPI.md#createrole) | **POST** /api/v1/roles | Create a role
[**deleteRole**](RolesAPI.md#deleterole) | **DELETE** /api/v1/roles/{roleId} | Delete a role
[**listRoles**](RolesAPI.md#listroles) | **GET** /api/v1/roles | List roles
[**listUserRoles**](RolesAPI.md#listuserroles) | **GET** /api/v1/users/{userId}/roles | List the roles assigned to a user
[**revokeRole**](RolesAPI.md#revokerole) | **POST** /api/v1/roles/revoke | Revoke a role from a user


# **assignRole**
```swift
    open class func assignRole(assignRoleInput: AssignRoleInput) async throws
```

Assign a role to a user (optionally until a date). Only an owner can grant ownership.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let assignRoleInput = AssignRoleInput(userId: 123, roleName: "roleName_example", expiresAt: Date()) // AssignRoleInput | 

// Assign a role to a user (optionally until a date). Only an owner can grant ownership.
do {
    try await RolesAPI.assignRole(assignRoleInput: assignRoleInput)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assignRoleInput** | [**AssignRoleInput**](AssignRoleInput.md) |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createRole**
```swift
    open class func createRole(createRoleInput: CreateRoleInput) async throws -> RoleEnvelope
```

Create a role

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createRoleInput = CreateRoleInput(name: "name_example", description: "description_example", permissions: ["permissions_example"]) // CreateRoleInput | 

// Create a role
do {
    let response = try await RolesAPI.createRole(createRoleInput: createRoleInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createRoleInput** | [**CreateRoleInput**](CreateRoleInput.md) |  | 

### Return type

[**RoleEnvelope**](RoleEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteRole**
```swift
    open class func deleteRole(roleId: UUID) async throws
```

Delete a role

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let roleId = 987 // UUID | 

// Delete a role
do {
    try await RolesAPI.deleteRole(roleId: roleId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **roleId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listRoles**
```swift
    open class func listRoles() async throws -> RoleList
```

List roles

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement


// List roles
do {
    let response = try await RolesAPI.listRoles()
    dump(response)
} catch {
    print(error)
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**RoleList**](RoleList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listUserRoles**
```swift
    open class func listUserRoles(userId: UUID) async throws -> RoleList
```

List the roles assigned to a user

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let userId = 987 // UUID | 

// List the roles assigned to a user
do {
    let response = try await RolesAPI.listUserRoles(userId: userId)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **UUID** |  | 

### Return type

[**RoleList**](RoleList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revokeRole**
```swift
    open class func revokeRole(revokeRoleInput: RevokeRoleInput) async throws
```

Revoke a role from a user

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let revokeRoleInput = RevokeRoleInput(userId: 123, roleName: "roleName_example") // RevokeRoleInput | 

// Revoke a role from a user
do {
    try await RolesAPI.revokeRole(revokeRoleInput: revokeRoleInput)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **revokeRoleInput** | [**RevokeRoleInput**](RevokeRoleInput.md) |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

