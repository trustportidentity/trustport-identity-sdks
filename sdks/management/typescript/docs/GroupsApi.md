# GroupsApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addGroupMember**](GroupsApi.md#addgroupmember) | **POST** /api/v1/groups/{groupId}/members | Add a user to a group |
| [**createGroup**](GroupsApi.md#creategroup) | **POST** /api/v1/groups | Create a group |
| [**deleteGroup**](GroupsApi.md#deletegroup) | **DELETE** /api/v1/groups/{groupId} | Delete a group |
| [**listGroupMembers**](GroupsApi.md#listgroupmembers) | **GET** /api/v1/groups/{groupId}/members | List the members of a group |
| [**listGroups**](GroupsApi.md#listgroups) | **GET** /api/v1/groups | List groups |
| [**removeGroupMember**](GroupsApi.md#removegroupmember) | **DELETE** /api/v1/groups/{groupId}/members/{userId} | Remove a user from a group |



## addGroupMember

> addGroupMember(groupId, addGroupMemberInput)

Add a user to a group

### Example

```ts
import {
  Configuration,
  GroupsApi,
} from '@trustport/identity-management';
import type { AddGroupMemberRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GroupsApi(config);

  const body = {
    // string
    groupId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // AddGroupMemberInput
    addGroupMemberInput: ...,
  } satisfies AddGroupMemberRequest;

  try {
    const data = await api.addGroupMember(body);
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
| **groupId** | `string` |  | [Defaults to `undefined`] |
| **addGroupMemberInput** | [AddGroupMemberInput](AddGroupMemberInput.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Added. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createGroup

> GroupEnvelope createGroup(createGroupInput)

Create a group

### Example

```ts
import {
  Configuration,
  GroupsApi,
} from '@trustport/identity-management';
import type { CreateGroupRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GroupsApi(config);

  const body = {
    // CreateGroupInput
    createGroupInput: ...,
  } satisfies CreateGroupRequest;

  try {
    const data = await api.createGroup(body);
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
| **createGroupInput** | [CreateGroupInput](CreateGroupInput.md) |  | |

### Return type

[**GroupEnvelope**](GroupEnvelope.md)

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


## deleteGroup

> deleteGroup(groupId)

Delete a group

### Example

```ts
import {
  Configuration,
  GroupsApi,
} from '@trustport/identity-management';
import type { DeleteGroupRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GroupsApi(config);

  const body = {
    // string
    groupId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteGroupRequest;

  try {
    const data = await api.deleteGroup(body);
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
| **groupId** | `string` |  | [Defaults to `undefined`] |

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


## listGroupMembers

> GroupMemberList listGroupMembers(groupId)

List the members of a group

### Example

```ts
import {
  Configuration,
  GroupsApi,
} from '@trustport/identity-management';
import type { ListGroupMembersRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GroupsApi(config);

  const body = {
    // string
    groupId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ListGroupMembersRequest;

  try {
    const data = await api.listGroupMembers(body);
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
| **groupId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**GroupMemberList**](GroupMemberList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Members. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listGroups

> GroupList listGroups()

List groups

### Example

```ts
import {
  Configuration,
  GroupsApi,
} from '@trustport/identity-management';
import type { ListGroupsRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GroupsApi(config);

  try {
    const data = await api.listGroups();
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

[**GroupList**](GroupList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Groups. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeGroupMember

> removeGroupMember(groupId, userId)

Remove a user from a group

### Example

```ts
import {
  Configuration,
  GroupsApi,
} from '@trustport/identity-management';
import type { RemoveGroupMemberRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GroupsApi(config);

  const body = {
    // string
    groupId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    userId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RemoveGroupMemberRequest;

  try {
    const data = await api.removeGroupMember(body);
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
| **groupId** | `string` |  | [Defaults to `undefined`] |
| **userId** | `string` |  | [Defaults to `undefined`] |

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

