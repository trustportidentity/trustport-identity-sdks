# \RolesAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AssignRole**](RolesAPI.md#AssignRole) | **Post** /api/v1/roles/assign | Assign a role to a user (optionally until a date). Only an owner can grant ownership.
[**CreateRole**](RolesAPI.md#CreateRole) | **Post** /api/v1/roles | Create a role
[**DeleteRole**](RolesAPI.md#DeleteRole) | **Delete** /api/v1/roles/{roleId} | Delete a role
[**ListRoles**](RolesAPI.md#ListRoles) | **Get** /api/v1/roles | List roles
[**ListUserRoles**](RolesAPI.md#ListUserRoles) | **Get** /api/v1/users/{userId}/roles | List the roles assigned to a user
[**RevokeRole**](RolesAPI.md#RevokeRole) | **Post** /api/v1/roles/revoke | Revoke a role from a user



## AssignRole

> AssignRole(ctx).AssignRoleInput(assignRoleInput).Execute()

Assign a role to a user (optionally until a date). Only an owner can grant ownership.

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
	assignRoleInput := *openapiclient.NewAssignRoleInput("UserId_example", "RoleName_example") // AssignRoleInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.RolesAPI.AssignRole(context.Background()).AssignRoleInput(assignRoleInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RolesAPI.AssignRole``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAssignRoleRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assignRoleInput** | [**AssignRoleInput**](AssignRoleInput.md) |  | 

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


## CreateRole

> RoleEnvelope CreateRole(ctx).CreateRoleInput(createRoleInput).Execute()

Create a role

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
	createRoleInput := *openapiclient.NewCreateRoleInput("Name_example") // CreateRoleInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RolesAPI.CreateRole(context.Background()).CreateRoleInput(createRoleInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RolesAPI.CreateRole``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateRole`: RoleEnvelope
	fmt.Fprintf(os.Stdout, "Response from `RolesAPI.CreateRole`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateRoleRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteRole

> DeleteRole(ctx, roleId).Execute()

Delete a role

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
	roleId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.RolesAPI.DeleteRole(context.Background(), roleId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RolesAPI.DeleteRole``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**roleId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteRoleRequest struct via the builder pattern


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


## ListRoles

> RoleList ListRoles(ctx).Execute()

List roles

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
	resp, r, err := apiClient.RolesAPI.ListRoles(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RolesAPI.ListRoles``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListRoles`: RoleList
	fmt.Fprintf(os.Stdout, "Response from `RolesAPI.ListRoles`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListRolesRequest struct via the builder pattern


### Return type

[**RoleList**](RoleList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListUserRoles

> RoleList ListUserRoles(ctx, userId).Execute()

List the roles assigned to a user

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
	userId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RolesAPI.ListUserRoles(context.Background(), userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RolesAPI.ListUserRoles``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListUserRoles`: RoleList
	fmt.Fprintf(os.Stdout, "Response from `RolesAPI.ListUserRoles`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiListUserRolesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**RoleList**](RoleList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## RevokeRole

> RevokeRole(ctx).RevokeRoleInput(revokeRoleInput).Execute()

Revoke a role from a user

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
	revokeRoleInput := *openapiclient.NewRevokeRoleInput("UserId_example", "RoleName_example") // RevokeRoleInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.RolesAPI.RevokeRole(context.Background()).RevokeRoleInput(revokeRoleInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RolesAPI.RevokeRole``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiRevokeRoleRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **revokeRoleInput** | [**RevokeRoleInput**](RevokeRoleInput.md) |  | 

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

