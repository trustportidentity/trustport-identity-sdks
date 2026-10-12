# trustport_identity_management.ApiKeysApi

All URIs are relative to *https://id.trustportidentity.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_api_key**](ApiKeysApi.md#create_api_key) | **POST** /api/v1/api-keys | Create an API key. &#x60;secret_key&#x60; is returned once, in this response.
[**delete_api_key**](ApiKeysApi.md#delete_api_key) | **DELETE** /api/v1/api-keys/{apiKeyId} | Revoke an API key
[**list_api_keys**](ApiKeysApi.md#list_api_keys) | **GET** /api/v1/api-keys | List API keys (the secret is never shown again)


# **create_api_key**
> ApiKeyEnvelope create_api_key(create_api_key_input)

Create an API key. `secret_key` is returned once, in this response.

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.api_key_envelope import ApiKeyEnvelope
from trustport_identity_management.models.create_api_key_input import CreateApiKeyInput
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
    api_instance = trustport_identity_management.ApiKeysApi(api_client)
    create_api_key_input = trustport_identity_management.CreateApiKeyInput() # CreateApiKeyInput | 

    try:
        # Create an API key. `secret_key` is returned once, in this response.
        api_response = api_instance.create_api_key(create_api_key_input)
        print("The response of ApiKeysApi->create_api_key:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ApiKeysApi->create_api_key: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_api_key_input** | [**CreateApiKeyInput**](CreateApiKeyInput.md)|  | 

### Return type

[**ApiKeyEnvelope**](ApiKeyEnvelope.md)

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

# **delete_api_key**
> delete_api_key(api_key_id)

Revoke an API key

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
    api_instance = trustport_identity_management.ApiKeysApi(api_client)
    api_key_id = UUID('38400000-8cf0-11bd-b23e-10b96e4ef00d') # UUID | 

    try:
        # Revoke an API key
        api_instance.delete_api_key(api_key_id)
    except Exception as e:
        print("Exception when calling ApiKeysApi->delete_api_key: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **api_key_id** | **UUID**|  | 

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
**204** | Revoked. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_api_keys**
> ApiKeyList list_api_keys()

List API keys (the secret is never shown again)

### Example

* Bearer Authentication (bearerAuth):

```python
import trustport_identity_management
from trustport_identity_management.models.api_key_list import ApiKeyList
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
    api_instance = trustport_identity_management.ApiKeysApi(api_client)

    try:
        # List API keys (the secret is never shown again)
        api_response = api_instance.list_api_keys()
        print("The response of ApiKeysApi->list_api_keys:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ApiKeysApi->list_api_keys: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**ApiKeyList**](ApiKeyList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Keys. |  -  |
**0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

