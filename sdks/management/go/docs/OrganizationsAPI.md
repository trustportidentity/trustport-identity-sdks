# \OrganizationsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateOrganization**](OrganizationsAPI.md#CreateOrganization) | **Post** /api/v1/organizations | Create an organization (at most 20 domains, validated and lower-cased)
[**DeleteOrganization**](OrganizationsAPI.md#DeleteOrganization) | **Delete** /api/v1/organizations/{organizationId} | Delete an organization
[**ListOrganizations**](OrganizationsAPI.md#ListOrganizations) | **Get** /api/v1/organizations | List organizations
[**UpdateOrganization**](OrganizationsAPI.md#UpdateOrganization) | **Patch** /api/v1/organizations/{organizationId} | Update an organization (only the fields you send change)



## CreateOrganization

> OrganizationEnvelope CreateOrganization(ctx).CreateOrganizationInput(createOrganizationInput).Execute()

Create an organization (at most 20 domains, validated and lower-cased)

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
	createOrganizationInput := *openapiclient.NewCreateOrganizationInput("Name_example") // CreateOrganizationInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.OrganizationsAPI.CreateOrganization(context.Background()).CreateOrganizationInput(createOrganizationInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `OrganizationsAPI.CreateOrganization``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateOrganization`: OrganizationEnvelope
	fmt.Fprintf(os.Stdout, "Response from `OrganizationsAPI.CreateOrganization`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateOrganizationRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteOrganization

> DeleteOrganization(ctx, organizationId).Execute()

Delete an organization

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
	organizationId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.OrganizationsAPI.DeleteOrganization(context.Background(), organizationId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `OrganizationsAPI.DeleteOrganization``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**organizationId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteOrganizationRequest struct via the builder pattern


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


## ListOrganizations

> OrganizationList ListOrganizations(ctx).Execute()

List organizations

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
	resp, r, err := apiClient.OrganizationsAPI.ListOrganizations(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `OrganizationsAPI.ListOrganizations``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListOrganizations`: OrganizationList
	fmt.Fprintf(os.Stdout, "Response from `OrganizationsAPI.ListOrganizations`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListOrganizationsRequest struct via the builder pattern


### Return type

[**OrganizationList**](OrganizationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateOrganization

> OrganizationEnvelope UpdateOrganization(ctx, organizationId).UpdateOrganizationInput(updateOrganizationInput).Execute()

Update an organization (only the fields you send change)

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
	organizationId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 
	updateOrganizationInput := *openapiclient.NewUpdateOrganizationInput() // UpdateOrganizationInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.OrganizationsAPI.UpdateOrganization(context.Background(), organizationId).UpdateOrganizationInput(updateOrganizationInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `OrganizationsAPI.UpdateOrganization``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateOrganization`: OrganizationEnvelope
	fmt.Fprintf(os.Stdout, "Response from `OrganizationsAPI.UpdateOrganization`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**organizationId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateOrganizationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateOrganizationInput** | [**UpdateOrganizationInput**](UpdateOrganizationInput.md) |  | 

### Return type

[**OrganizationEnvelope**](OrganizationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

