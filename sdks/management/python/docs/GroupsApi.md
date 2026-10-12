# trustport_identity_management.GroupsApi

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_group_member**](GroupsApi.md#add_group_member) | **POST** /api/v1/groups/{groupId}/members | Add a user to a group
[**create_group**](GroupsApi.md#create_group) | **POST** /api/v1/groups | Create a group
[**delete_group**](GroupsApi.md#delete_group) | **DELETE** /api/v1/groups/{groupId} | Delete a group
[**list_group_members**](GroupsApi.md#list_group_members) | **GET** /api/v1/groups/{groupId}/members | List the members of a group
[**list_groups**](GroupsApi.md#list_groups) | **GET** /api/v1/groups | List groups
[**remove_group_member**](GroupsApi.md#remove_group_member) | **DELETE** /api/v1/groups/{groupId}/members/{userId} | Remove a user from a group


# **add_group_member**
> add_group_member(group_id, add_group_member_input)

Add a user to a group

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.add_group_member_input import AddGroupMemberInput
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
    api_instance = trustport_identity_management.GroupsApi(api_client)
    group_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 
    add_group_member_input = trustport_identity_management.AddGroupMemberInput() # AddGroupMemberInput | 

    try:
        # Add a user to a group
        api_instance.add_group_member(group_id, add_group_member_input)
    except Exception as e:
        print("Exception when calling GroupsApi->add_group_member: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group_id** | **UUID**|  | 
 **add_group_member_input** | [**AddGroupMemberInput**](AddGroupMemberInput.md)|  | 

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
**204** | Added. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_group**
> GroupEnvelope create_group(create_group_input)

Create a group

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.create_group_input import CreateGroupInput
from trustport_identity_management.models.group_envelope import GroupEnvelope
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
    api_instance = trustport_identity_management.GroupsApi(api_client)
    create_group_input = trustport_identity_management.CreateGroupInput() # CreateGroupInput | 

    try:
        # Create a group
        api_response = api_instance.create_group(create_group_input)
        print("The response of GroupsApi->create_group:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling GroupsApi->create_group: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_group_input** | [**CreateGroupInput**](CreateGroupInput.md)|  | 

### Return type

[**GroupEnvelope**](GroupEnvelope.md)

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

# **delete_group**
> delete_group(group_id)

Delete a group

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
    api_instance = trustport_identity_management.GroupsApi(api_client)
    group_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # Delete a group
        api_instance.delete_group(group_id)
    except Exception as e:
        print("Exception when calling GroupsApi->delete_group: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group_id** | **UUID**|  | 

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

# **list_group_members**
> GroupMemberList list_group_members(group_id)

List the members of a group

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.group_member_list import GroupMemberList
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
    api_instance = trustport_identity_management.GroupsApi(api_client)
    group_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # List the members of a group
        api_response = api_instance.list_group_members(group_id)
        print("The response of GroupsApi->list_group_members:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling GroupsApi->list_group_members: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group_id** | **UUID**|  | 

### Return type

[**GroupMemberList**](GroupMemberList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Members. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_groups**
> GroupList list_groups()

List groups

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.group_list import GroupList
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
    api_instance = trustport_identity_management.GroupsApi(api_client)

    try:
        # List groups
        api_response = api_instance.list_groups()
        print("The response of GroupsApi->list_groups:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling GroupsApi->list_groups: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**GroupList**](GroupList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Groups. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **remove_group_member**
> remove_group_member(group_id, user_id)

Remove a user from a group

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
    api_instance = trustport_identity_management.GroupsApi(api_client)
    group_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 
    user_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # Remove a user from a group
        api_instance.remove_group_member(group_id, user_id)
    except Exception as e:
        print("Exception when calling GroupsApi->remove_group_member: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group_id** | **UUID**|  | 
 **user_id** | **UUID**|  | 

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

