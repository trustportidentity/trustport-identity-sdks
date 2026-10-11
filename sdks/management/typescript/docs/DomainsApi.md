# DomainsApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCustomDomain**](DomainsApi.md#createcustomdomain) | **POST** /api/v1/domains | Add a custom domain; returns the DNS records to publish |
| [**deleteCustomDomain**](DomainsApi.md#deletecustomdomain) | **DELETE** /api/v1/domains/{domainId} | Remove a custom domain |
| [**listCustomDomains**](DomainsApi.md#listcustomdomains) | **GET** /api/v1/domains | List custom domains |
| [**verifyCustomDomain**](DomainsApi.md#verifycustomdomain) | **POST** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain |



## createCustomDomain

> CustomDomainEnvelope createCustomDomain(createCustomDomainInput)

Add a custom domain; returns the DNS records to publish

### Example

```ts
import {
  Configuration,
  DomainsApi,
} from '@trustport/identity-management';
import type { CreateCustomDomainRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DomainsApi(config);

  const body = {
    // CreateCustomDomainInput
    createCustomDomainInput: ...,
  } satisfies CreateCustomDomainRequest;

  try {
    const data = await api.createCustomDomain(body);
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
| **createCustomDomainInput** | [CreateCustomDomainInput](CreateCustomDomainInput.md) |  | |

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

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


## deleteCustomDomain

> deleteCustomDomain(domainId)

Remove a custom domain

### Example

```ts
import {
  Configuration,
  DomainsApi,
} from '@trustport/identity-management';
import type { DeleteCustomDomainRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DomainsApi(config);

  const body = {
    // string
    domainId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteCustomDomainRequest;

  try {
    const data = await api.deleteCustomDomain(body);
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
| **domainId** | `string` |  | [Defaults to `undefined`] |

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
| **204** | Removed. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCustomDomains

> CustomDomainList listCustomDomains()

List custom domains

### Example

```ts
import {
  Configuration,
  DomainsApi,
} from '@trustport/identity-management';
import type { ListCustomDomainsRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DomainsApi(config);

  try {
    const data = await api.listCustomDomains();
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

[**CustomDomainList**](CustomDomainList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Domains. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## verifyCustomDomain

> CustomDomainEnvelope verifyCustomDomain(domainId)

Check the DNS records for a custom domain

### Example

```ts
import {
  Configuration,
  DomainsApi,
} from '@trustport/identity-management';
import type { VerifyCustomDomainRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DomainsApi(config);

  const body = {
    // string
    domainId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies VerifyCustomDomainRequest;

  try {
    const data = await api.verifyCustomDomain(body);
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
| **domainId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Result. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

