# trustport_identity_management.RolesApi

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**assign_role**](RolesApi.md#assign_role) | **POST** /api/v1/roles/assign | Assign a role to a user (optionally until a date). Only an owner can grant ownership.
[**create_role**](RolesApi.md#create_role) | **POST** /api/v1/roles | Create a role
[**delete_role**](RolesApi.md#delete_role) | **DELETE** /api/v1/roles/{roleId} | Delete a role
[**list_roles**](RolesApi.md#list_roles) | **GET** /api/v1/roles | List roles
[**list_user_roles**](RolesApi.md#list_user_roles) | **GET** /api/v1/users/{userId}/roles | List the roles assigned to a user
[**revoke_role**](RolesApi.md#revoke_role) | **POST** /api/v1/roles/revoke | Revoke a role from a user


# **assign_role**
> assign_role(assign_role_input)

Assign a role to a user (optionally until a date). Only an owner can grant ownership.

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.assign_role_input import AssignRoleInput
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
    api_instance = trustport_identity_management.RolesApi(api_client)
    assign_role_input = trustport_identity_management.AssignRoleInput() # AssignRoleInput | 

    try:
        # Assign a role to a user (optionally until a date). Only an owner can grant ownership.
        api_instance.assign_role(assign_role_input)
    except Exception as e:
        print("Exception when calling RolesApi->assign_role: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assign_role_input** | [**AssignRoleInput**](AssignRoleInput.md)|  | 

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Assigned. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_role**
> RoleEnvelope create_role(create_role_input)

Create a role

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.create_role_input import CreateRoleInput
from trustport_identity_management.models.role_envelope import RoleEnvelope
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
    api_instance = trustport_identity_management.RolesApi(api_client)
    create_role_input = trustport_identity_management.CreateRoleInput() # CreateRoleInput | 

    try:
        # Create a role
        api_response = api_instance.create_role(create_role_input)
        print("The response of RolesApi->create_role:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RolesApi->create_role: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_role_input** | [**CreateRoleInput**](CreateRoleInput.md)|  | 

### Return type

[**RoleEnvelope**](RoleEnvelope.md)

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

# **delete_role**
> delete_role(role_id)

Delete a role

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
    api_instance = trustport_identity_management.RolesApi(api_client)
    role_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # Delete a role
        api_instance.delete_role(role_id)
    except Exception as e:
        print("Exception when calling RolesApi->delete_role: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role_id** | **UUID**|  | 

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

# **list_roles**
> RoleList list_roles()

List roles

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.role_list import RoleList
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
    api_instance = trustport_identity_management.RolesApi(api_client)

    try:
        # List roles
        api_response = api_instance.list_roles()
        print("The response of RolesApi->list_roles:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RolesApi->list_roles: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**RoleList**](RoleList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Roles. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_user_roles**
> RoleList list_user_roles(user_id)

List the roles assigned to a user

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.role_list import RoleList
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
    api_instance = trustport_identity_management.RolesApi(api_client)
    user_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # List the roles assigned to a user
        api_response = api_instance.list_user_roles(user_id)
        print("The response of RolesApi->list_user_roles:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RolesApi->list_user_roles: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_id** | **UUID**|  | 

### Return type

[**RoleList**](RoleList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Roles. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revoke_role**
> revoke_role(revoke_role_input)

Revoke a role from a user

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.revoke_role_input import RevokeRoleInput
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
    api_instance = trustport_identity_management.RolesApi(api_client)
    revoke_role_input = trustport_identity_management.RevokeRoleInput() # RevokeRoleInput | 

    try:
        # Revoke a role from a user
        api_instance.revoke_role(revoke_role_input)
    except Exception as e:
        print("Exception when calling RolesApi->revoke_role: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **revoke_role_input** | [**RevokeRoleInput**](RevokeRoleInput.md)|  | 

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Revoked. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

