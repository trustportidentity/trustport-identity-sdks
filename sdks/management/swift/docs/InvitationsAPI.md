# InvitationsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createInvitation**](InvitationsAPI.md#createinvitation) | **POST** /api/v1/invitations | Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.
[**listInvitations**](InvitationsAPI.md#listinvitations) | **GET** /api/v1/invitations | List invitations
[**resendInvitation**](InvitationsAPI.md#resendinvitation) | **POST** /api/v1/invitations/{invitationId}/resend | Send the invitation email again
[**revokeInvitation**](InvitationsAPI.md#revokeinvitation) | **DELETE** /api/v1/invitations/{invitationId} | Revoke an invitation


# **createInvitation**
```swift
    open class func createInvitation(createInvitationInput: CreateInvitationInput) async throws -> InvitationEnvelope
```

Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let createInvitationInput = CreateInvitationInput(email: "email_example", roleName: "roleName_example") // CreateInvitationInput | 

// Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.
do {
    let response = try await InvitationsAPI.createInvitation(createInvitationInput: createInvitationInput)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createInvitationInput** | [**CreateInvitationInput**](CreateInvitationInput.md) |  | 

### Return type

[**InvitationEnvelope**](InvitationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listInvitations**
```swift
    open class func listInvitations() async throws -> InvitationList
```

List invitations

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement


// List invitations
do {
    let response = try await InvitationsAPI.listInvitations()
    dump(response)
} catch {
    print(error)
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InvitationList**](InvitationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resendInvitation**
```swift
    open class func resendInvitation(invitationId: UUID) async throws -> InvitationEnvelope
```

Send the invitation email again

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let invitationId = 987 // UUID | 

// Send the invitation email again
do {
    let response = try await InvitationsAPI.resendInvitation(invitationId: invitationId)
    dump(response)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invitationId** | **UUID** |  | 

### Return type

[**InvitationEnvelope**](InvitationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revokeInvitation**
```swift
    open class func revokeInvitation(invitationId: UUID) async throws
```

Revoke an invitation

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import TrustPortIdentityManagement

let invitationId = 987 // UUID | 

// Revoke an invitation
do {
    try await InvitationsAPI.revokeInvitation(invitationId: invitationId)
} catch {
    print(error)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invitationId** | **UUID** |  | 

### Return type

Void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

