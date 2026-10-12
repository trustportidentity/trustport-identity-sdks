# trustport_identity_management.OrganizationsApi

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_organization**](OrganizationsApi.md#create_organization) | **POST** /api/v1/organizations | Create an organization (at most 20 domains, validated and lower-cased)
[**delete_organization**](OrganizationsApi.md#delete_organization) | **DELETE** /api/v1/organizations/{organizationId} | Delete an organization
[**list_organizations**](OrganizationsApi.md#list_organizations) | **GET** /api/v1/organizations | List organizations
[**update_organization**](OrganizationsApi.md#update_organization) | **PATCH** /api/v1/organizations/{organizationId} | Update an organization (only the fields you send change)


# **create_organization**
> OrganizationEnvelope create_organization(create_organization_input)

Create an organization (at most 20 domains, validated and lower-cased)

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.create_organization_input import CreateOrganizationInput
from trustport_identity_management.models.organization_envelope import OrganizationEnvelope
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
    api_instance = trustport_identity_management.OrganizationsApi(api_client)
    create_organization_input = trustport_identity_management.CreateOrganizationInput() # CreateOrganizationInput | 

    try:
        # Create an organization (at most 20 domains, validated and lower-cased)
        api_response = api_instance.create_organization(create_organization_input)
        print("The response of OrganizationsApi->create_organization:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrganizationsApi->create_organization: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_organization_input** | [**CreateOrganizationInput**](CreateOrganizationInput.md)|  | 

### Return type

[**OrganizationEnvelope**](OrganizationEnvelope.md)

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

# **delete_organization**
> delete_organization(organization_id)

Delete an organization

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
    api_instance = trustport_identity_management.OrganizationsApi(api_client)
    organization_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # Delete an organization
        api_instance.delete_organization(organization_id)
    except Exception as e:
        print("Exception when calling OrganizationsApi->delete_organization: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organization_id** | **UUID**|  | 

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
**204** | Deleted. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_organizations**
> OrganizationList list_organizations()

List organizations

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.organization_list import OrganizationList
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
    api_instance = trustport_identity_management.OrganizationsApi(api_client)

    try:
        # List organizations
        api_response = api_instance.list_organizations()
        print("The response of OrganizationsApi->list_organizations:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrganizationsApi->list_organizations: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**OrganizationList**](OrganizationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Organizations. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_organization**
> OrganizationEnvelope update_organization(organization_id, update_organization_input)

Update an organization (only the fields you send change)

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.organization_envelope import OrganizationEnvelope
from trustport_identity_management.models.update_organization_input import UpdateOrganizationInput
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
    api_instance = trustport_identity_management.OrganizationsApi(api_client)
    organization_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 
    update_organization_input = trustport_identity_management.UpdateOrganizationInput() # UpdateOrganizationInput | 

    try:
        # Update an organization (only the fields you send change)
        api_response = api_instance.update_organization(organization_id, update_organization_input)
        print("The response of OrganizationsApi->update_organization:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrganizationsApi->update_organization: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organization_id** | **UUID**|  | 
 **update_organization_input** | [**UpdateOrganizationInput**](UpdateOrganizationInput.md)|  | 

### Return type

[**OrganizationEnvelope**](OrganizationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

