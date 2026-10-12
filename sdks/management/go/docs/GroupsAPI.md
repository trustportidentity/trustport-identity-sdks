# \GroupsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddGroupMember**](GroupsAPI.md#AddGroupMember) | **Post** /api/v1/groups/{groupId}/members | Add a user to a group
[**CreateGroup**](GroupsAPI.md#CreateGroup) | **Post** /api/v1/groups | Create a group
[**DeleteGroup**](GroupsAPI.md#DeleteGroup) | **Delete** /api/v1/groups/{groupId} | Delete a group
[**ListGroupMembers**](GroupsAPI.md#ListGroupMembers) | **Get** /api/v1/groups/{groupId}/members | List the members of a group
[**ListGroups**](GroupsAPI.md#ListGroups) | **Get** /api/v1/groups | List groups
[**RemoveGroupMember**](GroupsAPI.md#RemoveGroupMember) | **Delete** /api/v1/groups/{groupId}/members/{userId} | Remove a user from a group



## AddGroupMember

> AddGroupMember(ctx, groupId).AddGroupMemberInput(addGroupMemberInput).Execute()

Add a user to a group

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
	groupId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 
	addGroupMemberInput := *openapiclient.NewAddGroupMemberInput("UserId_example") // AddGroupMemberInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.GroupsAPI.AddGroupMember(context.Background(), groupId).AddGroupMemberInput(addGroupMemberInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupsAPI.AddGroupMember``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiAddGroupMemberRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **addGroupMemberInput** | [**AddGroupMemberInput**](AddGroupMemberInput.md) |  | 

### Return type

 (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateGroup

> GroupEnvelope CreateGroup(ctx).CreateGroupInput(createGroupInput).Execute()

Create a group

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
	createGroupInput := *openapiclient.NewCreateGroupInput("Name_example") // CreateGroupInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupsAPI.CreateGroup(context.Background()).CreateGroupInput(createGroupInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupsAPI.CreateGroup``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateGroup`: GroupEnvelope
	fmt.Fprintf(os.Stdout, "Response from `GroupsAPI.CreateGroup`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateGroupRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteGroup

> DeleteGroup(ctx, groupId).Execute()

Delete a group

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
	groupId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.GroupsAPI.DeleteGroup(context.Background(), groupId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupsAPI.DeleteGroup``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteGroupRequest struct via the builder pattern


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


## ListGroupMembers

> GroupMemberList ListGroupMembers(ctx, groupId).Execute()

List the members of a group

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
	groupId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupsAPI.ListGroupMembers(context.Background(), groupId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupsAPI.ListGroupMembers``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListGroupMembers`: GroupMemberList
	fmt.Fprintf(os.Stdout, "Response from `GroupsAPI.ListGroupMembers`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiListGroupMembersRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**GroupMemberList**](GroupMemberList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListGroups

> GroupList ListGroups(ctx).Execute()

List groups

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
	resp, r, err := apiClient.GroupsAPI.ListGroups(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupsAPI.ListGroups``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListGroups`: GroupList
	fmt.Fprintf(os.Stdout, "Response from `GroupsAPI.ListGroups`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListGroupsRequest struct via the builder pattern


### Return type

[**GroupList**](GroupList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## RemoveGroupMember

> RemoveGroupMember(ctx, groupId, userId).Execute()

Remove a user from a group

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
	groupId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 
	userId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.GroupsAPI.RemoveGroupMember(context.Background(), groupId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupsAPI.RemoveGroupMember``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupId** | **string** |  | 
**userId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiRemoveGroupMemberRequest struct via the builder pattern


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

