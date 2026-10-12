# \DomainsAPI

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateCustomDomain**](DomainsAPI.md#CreateCustomDomain) | **Post** /api/v1/domains | Add a custom domain; returns the DNS records to publish
[**DeleteCustomDomain**](DomainsAPI.md#DeleteCustomDomain) | **Delete** /api/v1/domains/{domainId} | Remove a custom domain
[**ListCustomDomains**](DomainsAPI.md#ListCustomDomains) | **Get** /api/v1/domains | List custom domains
[**VerifyCustomDomain**](DomainsAPI.md#VerifyCustomDomain) | **Post** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain



## CreateCustomDomain

> CustomDomainEnvelope CreateCustomDomain(ctx).CreateCustomDomainInput(createCustomDomainInput).Execute()

Add a custom domain; returns the DNS records to publish

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
	createCustomDomainInput := *openapiclient.NewCreateCustomDomainInput("Domain_example") // CreateCustomDomainInput | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DomainsAPI.CreateCustomDomain(context.Background()).CreateCustomDomainInput(createCustomDomainInput).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DomainsAPI.CreateCustomDomain``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateCustomDomain`: CustomDomainEnvelope
	fmt.Fprintf(os.Stdout, "Response from `DomainsAPI.CreateCustomDomain`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateCustomDomainRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createCustomDomainInput** | [**CreateCustomDomainInput**](CreateCustomDomainInput.md) |  | 

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteCustomDomain

> DeleteCustomDomain(ctx, domainId).Execute()

Remove a custom domain

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
	domainId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.DomainsAPI.DeleteCustomDomain(context.Background(), domainId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DomainsAPI.DeleteCustomDomain``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**domainId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteCustomDomainRequest struct via the builder pattern


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


## ListCustomDomains

> CustomDomainList ListCustomDomains(ctx).Execute()

List custom domains

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
	resp, r, err := apiClient.DomainsAPI.ListCustomDomains(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DomainsAPI.ListCustomDomains``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListCustomDomains`: CustomDomainList
	fmt.Fprintf(os.Stdout, "Response from `DomainsAPI.ListCustomDomains`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListCustomDomainsRequest struct via the builder pattern


### Return type

[**CustomDomainList**](CustomDomainList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## VerifyCustomDomain

> CustomDomainEnvelope VerifyCustomDomain(ctx, domainId).Execute()

Check the DNS records for a custom domain

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
	domainId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DomainsAPI.VerifyCustomDomain(context.Background(), domainId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DomainsAPI.VerifyCustomDomain``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `VerifyCustomDomain`: CustomDomainEnvelope
	fmt.Fprintf(os.Stdout, "Response from `DomainsAPI.VerifyCustomDomain`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**domainId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiVerifyCustomDomainRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

