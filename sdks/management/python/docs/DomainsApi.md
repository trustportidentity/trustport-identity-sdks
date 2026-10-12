# trustport_identity_management.DomainsApi

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_custom_domain**](DomainsApi.md#create_custom_domain) | **POST** /api/v1/domains | Add a custom domain; returns the DNS records to publish
[**delete_custom_domain**](DomainsApi.md#delete_custom_domain) | **DELETE** /api/v1/domains/{domainId} | Remove a custom domain
[**list_custom_domains**](DomainsApi.md#list_custom_domains) | **GET** /api/v1/domains | List custom domains
[**verify_custom_domain**](DomainsApi.md#verify_custom_domain) | **POST** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain


# **create_custom_domain**
> CustomDomainEnvelope create_custom_domain(create_custom_domain_input)

Add a custom domain; returns the DNS records to publish

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.create_custom_domain_input import CreateCustomDomainInput
from trustport_identity_management.models.custom_domain_envelope import CustomDomainEnvelope
from trustport_identity_management.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://id.trustportidentity.com
# See configuration.py for a list of all supported configuration parameters.
configuration = trustport_identity_management.Configuration(
    host = "https://id.trustportidentity.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = trustport_identity_management.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with trustport_identity_management.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = trustport_identity_management.DomainsApi(api_client)
    create_custom_domain_input = trustport_identity_management.CreateCustomDomainInput() # CreateCustomDomainInput | 

    try:
        # Add a custom domain; returns the DNS records to publish
        api_response = api_instance.create_custom_domain(create_custom_domain_input)
        print("The response of DomainsApi->create_custom_domain:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DomainsApi->create_custom_domain: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_custom_domain_input** | [**CreateCustomDomainInput**](CreateCustomDomainInput.md)|  | 

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Created. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_custom_domain**
> delete_custom_domain(domain_id)

Remove a custom domain

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://id.trustportidentity.com
# See configuration.py for a list of all supported configuration parameters.
configuration = trustport_identity_management.Configuration(
    host = "https://id.trustportidentity.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = trustport_identity_management.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with trustport_identity_management.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = trustport_identity_management.DomainsApi(api_client)
    domain_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # Remove a custom domain
        api_instance.delete_custom_domain(domain_id)
    except Exception as e:
        print("Exception when calling DomainsApi->delete_custom_domain: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain_id** | **UUID**|  | 

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Removed. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_custom_domains**
> CustomDomainList list_custom_domains()

List custom domains

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.custom_domain_list import CustomDomainList
from trustport_identity_management.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://id.trustportidentity.com
# See configuration.py for a list of all supported configuration parameters.
configuration = trustport_identity_management.Configuration(
    host = "https://id.trustportidentity.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = trustport_identity_management.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with trustport_identity_management.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = trustport_identity_management.DomainsApi(api_client)

    try:
        # List custom domains
        api_response = api_instance.list_custom_domains()
        print("The response of DomainsApi->list_custom_domains:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DomainsApi->list_custom_domains: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**CustomDomainList**](CustomDomainList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Domains. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verify_custom_domain**
> CustomDomainEnvelope verify_custom_domain(domain_id)

Check the DNS records for a custom domain

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.custom_domain_envelope import CustomDomainEnvelope
from trustport_identity_management.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://id.trustportidentity.com
# See configuration.py for a list of all supported configuration parameters.
configuration = trustport_identity_management.Configuration(
    host = "https://id.trustportidentity.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = trustport_identity_management.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with trustport_identity_management.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = trustport_identity_management.DomainsApi(api_client)
    domain_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # Check the DNS records for a custom domain
        api_response = api_instance.verify_custom_domain(domain_id)
        print("The response of DomainsApi->verify_custom_domain:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DomainsApi->verify_custom_domain: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain_id** | **UUID**|  | 

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Result. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

