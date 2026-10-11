# InvitationsApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createInvitation**](InvitationsApi.md#createinvitation) | **POST** /api/v1/invitations | Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace. |
| [**listInvitations**](InvitationsApi.md#listinvitations) | **GET** /api/v1/invitations | List invitations |
| [**resendInvitation**](InvitationsApi.md#resendinvitation) | **POST** /api/v1/invitations/{invitationId}/resend | Send the invitation email again |
| [**revokeInvitation**](InvitationsApi.md#revokeinvitation) | **DELETE** /api/v1/invitations/{invitationId} | Revoke an invitation |



## createInvitation

> InvitationEnvelope createInvitation(createInvitationInput)

Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '@trustport/identity-management';
import type { CreateInvitationRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // CreateInvitationInput
    createInvitationInput: ...,
  } satisfies CreateInvitationRequest;

  try {
    const data = await api.createInvitation(body);
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
| **createInvitationInput** | [CreateInvitationInput](CreateInvitationInput.md) |  | |

### Return type

[**InvitationEnvelope**](InvitationEnvelope.md)

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


## listInvitations

> InvitationList listInvitations()

List invitations

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '@trustport/identity-management';
import type { ListInvitationsRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  try {
    const data = await api.listInvitations();
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

[**InvitationList**](InvitationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Invitations. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## resendInvitation

> InvitationEnvelope resendInvitation(invitationId)

Send the invitation email again

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '@trustport/identity-management';
import type { ResendInvitationRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // string
    invitationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ResendInvitationRequest;

  try {
    const data = await api.resendInvitation(body);
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
| **invitationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**InvitationEnvelope**](InvitationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Resent. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## revokeInvitation

> revokeInvitation(invitationId)

Revoke an invitation

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '@trustport/identity-management';
import type { RevokeInvitationRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // string
    invitationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RevokeInvitationRequest;

  try {
    const data = await api.revokeInvitation(body);
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
| **invitationId** | `string` |  | [Defaults to `undefined`] |

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

