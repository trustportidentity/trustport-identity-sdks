# ApiKeysApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createApiKey**](ApiKeysApi.md#createapikey) | **POST** /api/v1/api-keys | Create an API key. &#x60;secret_key&#x60; is returned once, in this response. |
| [**deleteApiKey**](ApiKeysApi.md#deleteapikey) | **DELETE** /api/v1/api-keys/{apiKeyId} | Revoke an API key |
| [**listApiKeys**](ApiKeysApi.md#listapikeys) | **GET** /api/v1/api-keys | List API keys (the secret is never shown again) |



## createApiKey

> ApiKeyEnvelope createApiKey(createApiKeyInput)

Create an API key. &#x60;secret_key&#x60; is returned once, in this response.

### Example

```ts
import {
  Configuration,
  ApiKeysApi,
} from '@trustport/identity-management';
import type { CreateApiKeyRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  const body = {
    // CreateApiKeyInput
    createApiKeyInput: ...,
  } satisfies CreateApiKeyRequest;

  try {
    const data = await api.createApiKey(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createApiKeyInput** | [CreateApiKeyInput](CreateApiKeyInput.md) |  | |

### Return type

[**ApiKeyEnvelope**](ApiKeyEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteApiKey

> deleteApiKey(apiKeyId)

Revoke an API key

### Example

```ts
import {
  Configuration,
  ApiKeysApi,
} from '@trustport/identity-management';
import type { DeleteApiKeyRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  const body = {
    // string
    apiKeyId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteApiKeyRequest;

  try {
    const data = await api.deleteApiKey(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **apiKeyId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Revoked. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listApiKeys

> ApiKeyList listApiKeys()

List API keys (the secret is never shown again)

### Example

```ts
import {
  Configuration,
  ApiKeysApi,
} from '@trustport/identity-management';
import type { ListApiKeysRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  try {
    const data = await api.listApiKeys();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ApiKeyList**](ApiKeyList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Keys. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

