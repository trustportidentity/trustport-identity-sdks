# \ApplicationsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateApplication**](ApplicationsAPI.md#CreateApplication) | **Post** /api/v1/applications | Register an application. The client secret is returned once, in this response.
[**DeleteApplication**](ApplicationsAPI.md#DeleteApplication) | **Delete** /api/v1/applications/{applicationId} | Delete an application
[**ListApplications**](ApplicationsAPI.md#ListApplications) | **Get** /api/v1/applications | List applications (OAuth / OIDC clients)
[**RotateApplicationSecret**](ApplicationsAPI.md#RotateApplicationSecret) | **Post** /api/v1/applications/{applicationId}/rotate-secret | Issue a new client secret (returned once). The old secret stops working.
[**UpdateApplication**](ApplicationsAPI.md#UpdateApplication) | **Patch** /api/v1/applications/{applicationId} | Update an application&#39;s name or redirect URIs



## CreateApplication

> ApplicationEnvelope CreateApplication(ctx).CreateApplicationInput(createApplicationInput).Execute()

Register an application. The client secret is returned once, in this response.

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
	createApplicationInput := *openapiclient.NewCreateApplicationInput("Name_example") // CreateApplicationInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ApplicationsAPI.CreateApplication(context.Background()).CreateApplicationInput(createApplicationInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ApplicationsAPI.CreateApplication``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateApplication`: ApplicationEnvelope
	fmt.Fprintf(os.Stdout, "Response from `ApplicationsAPI.CreateApplication`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateApplicationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createApplicationInput** | [**CreateApplicationInput**](CreateApplicationInput.md) |  | 

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteApplication

> DeleteApplication(ctx, applicationId).Execute()

Delete an application

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
	applicationId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.ApplicationsAPI.DeleteApplication(context.Background(), applicationId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ApplicationsAPI.DeleteApplication``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**applicationId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteApplicationRequest struct via the builder pattern


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


## ListApplications

> ApplicationList ListApplications(ctx).Execute()

List applications (OAuth / OIDC clients)

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
	resp, r, err := apiClient.ApplicationsAPI.ListApplications(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ApplicationsAPI.ListApplications``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListApplications`: ApplicationList
	fmt.Fprintf(os.Stdout, "Response from `ApplicationsAPI.ListApplications`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListApplicationsRequest struct via the builder pattern


### Return type

[**ApplicationList**](ApplicationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## RotateApplicationSecret

> ApplicationEnvelope RotateApplicationSecret(ctx, applicationId).Execute()

Issue a new client secret (returned once). The old secret stops working.

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
	applicationId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ApplicationsAPI.RotateApplicationSecret(context.Background(), applicationId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ApplicationsAPI.RotateApplicationSecret``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `RotateApplicationSecret`: ApplicationEnvelope
	fmt.Fprintf(os.Stdout, "Response from `ApplicationsAPI.RotateApplicationSecret`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**applicationId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiRotateApplicationSecretRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateApplication

> ApplicationEnvelope UpdateApplication(ctx, applicationId).CreateApplicationInput(createApplicationInput).Execute()

Update an application's name or redirect URIs

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
	applicationId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 
	createApplicationInput := *openapiclient.NewCreateApplicationInput("Name_example") // CreateApplicationInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ApplicationsAPI.UpdateApplication(context.Background(), applicationId).CreateApplicationInput(createApplicationInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ApplicationsAPI.UpdateApplication``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateApplication`: ApplicationEnvelope
	fmt.Fprintf(os.Stdout, "Response from `ApplicationsAPI.UpdateApplication`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**applicationId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateApplicationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **createApplicationInput** | [**CreateApplicationInput**](CreateApplicationInput.md) |  | 

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

