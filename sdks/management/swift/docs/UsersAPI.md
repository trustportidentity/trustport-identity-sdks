# UsersAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](UsersAPI.md#createuser) | **POST** /api/v1/users | Create a user
[**deleteUser**](UsersAPI.md#deleteuser) | **DELETE** /api/v1/users/{userId} | Delete a user (soft delete; sessions are revoked)
[**getUser**](UsersAPI.md#getuser) | **GET** /api/v1/users/{userId} | Get a user
[**listUsers**](UsersAPI.md#listusers) | **GET** /api/v1/users | List users
[**updateUser**](UsersAPI.md#updateuser) | **PATCH** /api/v1/users/{userId} | Update a user (only the fields you send change)


# **createUser**
```swift
    open class func createUser(createUserInput: CreateUserInput) async throws -> UserEnvelope
```

Create a user

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createUserInput = CreateUserInput(username: "username_example", email: "email_example", password: "password_example", phone: "phone_example", firstName: "firstName_example", lastName: "lastName_example") // CreateUserInput | 

// Create a user
do {
    let response = try await UsersAPI.createUser(createUserInput: createUserInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createUserInput** | [**CreateUserInput**](CreateUserInput.md) |  | 

### Return type

[**UserEnvelope**](UserEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteUser**
```swift
    open class func deleteUser(userId: UUID) async throws
```

Delete a user (soft delete; sessions are revoked)

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let userId = 987 // UUID | 

// Delete a user (soft delete; sessions are revoked)
do {
    try await UsersAPI.deleteUser(userId: userId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUser**
```swift
    open class func getUser(userId: UUID) async throws -> UserEnvelope
```

Get a user

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let userId = 987 // UUID | 

// Get a user
do {
    let response = try await UsersAPI.getUser(userId: userId)
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

[**UserEnvelope**](UserEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listUsers**
```swift
    open class func listUsers(page: Int? = nil, perPage: Int? = nil, q: String? = nil, status: String? = nil) async throws -> UserList
```

List users

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let page = 987 // Int |  (optional) (default to 1)
let perPage = 987 // Int |  (optional) (default to 20)
let q = "q_example" // String | Searches username, email, first and last name. (optional)
let status = "status_example" // String |  (optional)

// List users
do {
    let response = try await UsersAPI.listUsers(page: page, perPage: perPage, q: q, status: status)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Int** |  | [optional] [default to 1]
 **perPage** | **Int** |  | [optional] [default to 20]
 **q** | **String** | Searches username, email, first and last name. | [optional] 
 **status** | **String** |  | [optional] 

### Return type

[**UserList**](UserList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUser**
```swift
    open class func updateUser(userId: UUID, updateUserInput: UpdateUserInput) async throws -> UserEnvelope
```

Update a user (only the fields you send change)

Setting `is_active` to false also revokes the user's live sessions. Only an owner can deactivate an owner, and the last owner cannot be removed.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let userId = 987 // UUID | 
let updateUserInput = UpdateUserInput(username: "username_example", email: "email_example", phone: "phone_example", firstName: "firstName_example", lastName: "lastName_example", isActive: false) // UpdateUserInput | 

// Update a user (only the fields you send change)
do {
    let response = try await UsersAPI.updateUser(userId: userId, updateUserInput: updateUserInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **UUID** |  | 
 **updateUserInput** | [**UpdateUserInput**](UpdateUserInput.md) |  | 

### Return type

[**UserEnvelope**](UserEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

