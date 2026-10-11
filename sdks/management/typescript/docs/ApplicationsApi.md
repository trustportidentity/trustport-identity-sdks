# ApplicationsApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createApplication**](ApplicationsApi.md#createapplication) | **POST** /api/v1/applications | Register an application. The client secret is returned once, in this response. |
| [**deleteApplication**](ApplicationsApi.md#deleteapplication) | **DELETE** /api/v1/applications/{applicationId} | Delete an application |
| [**listApplications**](ApplicationsApi.md#listapplications) | **GET** /api/v1/applications | List applications (OAuth / OIDC clients) |
| [**rotateApplicationSecret**](ApplicationsApi.md#rotateapplicationsecret) | **POST** /api/v1/applications/{applicationId}/rotate-secret | Issue a new client secret (returned once). The old secret stops working. |
| [**updateApplication**](ApplicationsApi.md#updateapplication) | **PATCH** /api/v1/applications/{applicationId} | Update an application\&#39;s name or redirect URIs |



## createApplication

> ApplicationEnvelope createApplication(createApplicationInput)

Register an application. The client secret is returned once, in this response.

### Example

```ts
import {
  Configuration,
  ApplicationsApi,
} from '@trustport/identity-management';
import type { CreateApplicationRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicationsApi(config);

  const body = {
    // CreateApplicationInput
    createApplicationInput: ...,
  } satisfies CreateApplicationRequest;

  try {
    const data = await api.createApplication(body);
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
| **createApplicationInput** | [CreateApplicationInput](CreateApplicationInput.md) |  | |

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

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


## deleteApplication

> deleteApplication(applicationId)

Delete an application

### Example

```ts
import {
  Configuration,
  ApplicationsApi,
} from '@trustport/identity-management';
import type { DeleteApplicationRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicationsApi(config);

  const body = {
    // string
    applicationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteApplicationRequest;

  try {
    const data = await api.deleteApplication(body);
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
| **applicationId** | `string` |  | [Defaults to `undefined`] |

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
| **204** | Deleted. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listApplications

> ApplicationList listApplications()

List applications (OAuth / OIDC clients)

### Example

```ts
import {
  Configuration,
  ApplicationsApi,
} from '@trustport/identity-management';
import type { ListApplicationsRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicationsApi(config);

  try {
    const data = await api.listApplications();
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

[**ApplicationList**](ApplicationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Applications. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rotateApplicationSecret

> ApplicationEnvelope rotateApplicationSecret(applicationId)

Issue a new client secret (returned once). The old secret stops working.

### Example

```ts
import {
  Configuration,
  ApplicationsApi,
} from '@trustport/identity-management';
import type { RotateApplicationSecretRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicationsApi(config);

  const body = {
    // string
    applicationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RotateApplicationSecretRequest;

  try {
    const data = await api.rotateApplicationSecret(body);
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
| **applicationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Rotated. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateApplication

> ApplicationEnvelope updateApplication(applicationId, createApplicationInput)

Update an application\&#39;s name or redirect URIs

### Example

```ts
import {
  Configuration,
  ApplicationsApi,
} from '@trustport/identity-management';
import type { UpdateApplicationRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicationsApi(config);

  const body = {
    // string
    applicationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // CreateApplicationInput
    createApplicationInput: ...,
  } satisfies UpdateApplicationRequest;

  try {
    const data = await api.updateApplication(body);
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
| **applicationId** | `string` |  | [Defaults to `undefined`] |
| **createApplicationInput** | [CreateApplicationInput](CreateApplicationInput.md) |  | |

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

