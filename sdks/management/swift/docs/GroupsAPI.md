# GroupsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addGroupMember**](GroupsAPI.md#addgroupmember) | **POST** /api/v1/groups/{groupId}/members | Add a user to a group
[**createGroup**](GroupsAPI.md#creategroup) | **POST** /api/v1/groups | Create a group
[**deleteGroup**](GroupsAPI.md#deletegroup) | **DELETE** /api/v1/groups/{groupId} | Delete a group
[**listGroupMembers**](GroupsAPI.md#listgroupmembers) | **GET** /api/v1/groups/{groupId}/members | List the members of a group
[**listGroups**](GroupsAPI.md#listgroups) | **GET** /api/v1/groups | List groups
[**removeGroupMember**](GroupsAPI.md#removegroupmember) | **DELETE** /api/v1/groups/{groupId}/members/{userId} | Remove a user from a group


# **addGroupMember**
```swift
    open class func addGroupMember(groupId: UUID, addGroupMemberInput: AddGroupMemberInput) async throws
```

Add a user to a group

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let groupId = 987 // UUID | 
let addGroupMemberInput = AddGroupMemberInput(userId: 123) // AddGroupMemberInput | 

// Add a user to a group
do {
    try await GroupsAPI.addGroupMember(groupId: groupId, addGroupMemberInput: addGroupMemberInput)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **UUID** |  | 
 **addGroupMemberInput** | [**AddGroupMemberInput**](AddGroupMemberInput.md) |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createGroup**
```swift
    open class func createGroup(createGroupInput: CreateGroupInput) async throws -> GroupEnvelope
```

Create a group

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createGroupInput = CreateGroupInput(name: "name_example", description: "description_example") // CreateGroupInput | 

// Create a group
do {
    let response = try await GroupsAPI.createGroup(createGroupInput: createGroupInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createGroupInput** | [**CreateGroupInput**](CreateGroupInput.md) |  | 

### Return type

[**GroupEnvelope**](GroupEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteGroup**
```swift
    open class func deleteGroup(groupId: UUID) async throws
```

Delete a group

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let groupId = 987 // UUID | 

// Delete a group
do {
    try await GroupsAPI.deleteGroup(groupId: groupId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listGroupMembers**
```swift
    open class func listGroupMembers(groupId: UUID) async throws -> GroupMemberList
```

List the members of a group

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let groupId = 987 // UUID | 

// List the members of a group
do {
    let response = try await GroupsAPI.listGroupMembers(groupId: groupId)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **UUID** |  | 

### Return type

[**GroupMemberList**](GroupMemberList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listGroups**
```swift
    open class func listGroups() async throws -> GroupList
```

List groups

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement


// List groups
do {
    let response = try await GroupsAPI.listGroups()
    dump(response)
} catch {
    print(error)
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**GroupList**](GroupList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removeGroupMember**
```swift
    open class func removeGroupMember(groupId: UUID, userId: UUID) async throws
```

Remove a user from a group

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let groupId = 987 // UUID | 
let userId = 987 // UUID | 

// Remove a user from a group
do {
    try await GroupsAPI.removeGroupMember(groupId: groupId, userId: userId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **UUID** |  | 
 **userId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

