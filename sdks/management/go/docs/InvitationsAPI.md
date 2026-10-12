# \InvitationsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateInvitation**](InvitationsAPI.md#CreateInvitation) | **Post** /api/v1/invitations | Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.
[**ListInvitations**](InvitationsAPI.md#ListInvitations) | **Get** /api/v1/invitations | List invitations
[**ResendInvitation**](InvitationsAPI.md#ResendInvitation) | **Post** /api/v1/invitations/{invitationId}/resend | Send the invitation email again
[**RevokeInvitation**](InvitationsAPI.md#RevokeInvitation) | **Delete** /api/v1/invitations/{invitationId} | Revoke an invitation



## CreateInvitation

> InvitationEnvelope CreateInvitation(ctx).CreateInvitationInput(createInvitationInput).Execute()

Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/trustportidentity/identity-go/management"
)

func main() {
	createInvitationInput := *openapiclient.NewCreateInvitationInput("Email_example") // CreateInvitationInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.InvitationsAPI.CreateInvitation(context.Background()).CreateInvitationInput(createInvitationInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InvitationsAPI.CreateInvitation``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateInvitation`: InvitationEnvelope
	fmt.Fprintf(os.Stdout, "Response from `InvitationsAPI.CreateInvitation`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateInvitationRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListInvitations

> InvitationList ListInvitations(ctx).Execute()

List invitations

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/trustportidentity/identity-go/management"
)

func main() {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.InvitationsAPI.ListInvitations(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InvitationsAPI.ListInvitations``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListInvitations`: InvitationList
	fmt.Fprintf(os.Stdout, "Response from `InvitationsAPI.ListInvitations`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListInvitationsRequest struct via the builder pattern


### Return type

[**InvitationList**](InvitationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ResendInvitation

> InvitationEnvelope ResendInvitation(ctx, invitationId).Execute()

Send the invitation email again

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/trustportidentity/identity-go/management"
)

func main() {
	invitationId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.InvitationsAPI.ResendInvitation(context.Background(), invitationId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InvitationsAPI.ResendInvitation``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ResendInvitation`: InvitationEnvelope
	fmt.Fprintf(os.Stdout, "Response from `InvitationsAPI.ResendInvitation`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**invitationId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiResendInvitationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**InvitationEnvelope**](InvitationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## RevokeInvitation

> RevokeInvitation(ctx, invitationId).Execute()

Revoke an invitation

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/trustportidentity/identity-go/management"
)

func main() {
	invitationId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.InvitationsAPI.RevokeInvitation(context.Background(), invitationId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InvitationsAPI.RevokeInvitation``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**invitationId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiRevokeInvitationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

