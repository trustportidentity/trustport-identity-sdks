# TrustPort.Identity.Management.Api.RolesApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**AssignRole**](RolesApi.md#assignrole) | **POST** /api/v1/roles/assign | Assign a role to a user (optionally until a date). Only an owner can grant ownership. |
| [**CreateRole**](RolesApi.md#createrole) | **POST** /api/v1/roles | Create a role |
| [**DeleteRole**](RolesApi.md#deleterole) | **DELETE** /api/v1/roles/{roleId} | Delete a role |
| [**ListRoles**](RolesApi.md#listroles) | **GET** /api/v1/roles | List roles |
| [**ListUserRoles**](RolesApi.md#listuserroles) | **GET** /api/v1/users/{userId}/roles | List the roles assigned to a user |
| [**RevokeRole**](RolesApi.md#revokerole) | **POST** /api/v1/roles/revoke | Revoke a role from a user |

<a id="assignrole"></a>
# **AssignRole**
> void AssignRole (AssignRoleInput assignRoleInput)

Assign a role to a user (optionally until a date). Only an owner can grant ownership.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using TrustPort.Identity.Management.Api;
using TrustPort.Identity.Management.Client;
using TrustPort.Identity.Management.Model;

namespace Example
{
    public class AssignRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://id.trustportidentity.com";
            // Configure Bearer token for authorization: bearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";

            // create instances of HttpClient, HttpClientHandler to be reused later with different Api classes
            HttpClient httpClient = new HttpClient();
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            var apiInstance = new RolesApi(httpClient, config, httpClientHandler);
            var assignRoleInput = new AssignRoleInput(); // AssignRoleInput | 

            try
            {
                // Assign a role to a user (optionally until a date). Only an owner can grant ownership.
                apiInstance.AssignRole(assignRoleInput);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling RolesApi.AssignRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the AssignRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Assign a role to a user (optionally until a date). Only an owner can grant ownership.
    apiInstance.AssignRoleWithHttpInfo(assignRoleInput);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling RolesApi.AssignRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **assignRoleInput** | [**AssignRoleInput**](AssignRoleInput.md) |  |  |

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
| **204** | Assigned. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="createrole"></a>
# **CreateRole**
> RoleEnvelope CreateRole (CreateRoleInput createRoleInput)

Create a role

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using TrustPort.Identity.Management.Api;
using TrustPort.Identity.Management.Client;
using TrustPort.Identity.Management.Model;

namespace Example
{
    public class CreateRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://id.trustportidentity.com";
            // Configure Bearer token for authorization: bearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";

            // create instances of HttpClient, HttpClientHandler to be reused later with different Api classes
            HttpClient httpClient = new HttpClient();
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            var apiInstance = new RolesApi(httpClient, config, httpClientHandler);
            var createRoleInput = new CreateRoleInput(); // CreateRoleInput | 

            try
            {
                // Create a role
                RoleEnvelope result = apiInstance.CreateRole(createRoleInput);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling RolesApi.CreateRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the CreateRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Create a role
    ApiResponse<RoleEnvelope> response = apiInstance.CreateRoleWithHttpInfo(createRoleInput);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling RolesApi.CreateRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **createRoleInput** | [**CreateRoleInput**](CreateRoleInput.md) |  |  |

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
| **201** | Created. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="deleterole"></a>
# **DeleteRole**
> void DeleteRole (Guid roleId)

Delete a role

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using TrustPort.Identity.Management.Api;
using TrustPort.Identity.Management.Client;
using TrustPort.Identity.Management.Model;

namespace Example
{
    public class DeleteRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://id.trustportidentity.com";
            // Configure Bearer token for authorization: bearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";

            // create instances of HttpClient, HttpClientHandler to be reused later with different Api classes
            HttpClient httpClient = new HttpClient();
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            var apiInstance = new RolesApi(httpClient, config, httpClientHandler);
            var roleId = "roleId_example";  // Guid | 

            try
            {
                // Delete a role
                apiInstance.DeleteRole(roleId);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling RolesApi.DeleteRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeleteRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Delete a role
    apiInstance.DeleteRoleWithHttpInfo(roleId);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling RolesApi.DeleteRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **roleId** | **Guid** |  |  |

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
| **204** | Deleted. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="listroles"></a>
# **ListRoles**
> RoleList ListRoles ()

List roles

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using TrustPort.Identity.Management.Api;
using TrustPort.Identity.Management.Client;
using TrustPort.Identity.Management.Model;

namespace Example
{
    public class ListRolesExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://id.trustportidentity.com";
            // Configure Bearer token for authorization: bearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";

            // create instances of HttpClient, HttpClientHandler to be reused later with different Api classes
            HttpClient httpClient = new HttpClient();
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            var apiInstance = new RolesApi(httpClient, config, httpClientHandler);

            try
            {
                // List roles
                RoleList result = apiInstance.ListRoles();
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling RolesApi.ListRoles: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the ListRolesWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // List roles
    ApiResponse<RoleList> response = apiInstance.ListRolesWithHttpInfo();
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling RolesApi.ListRolesWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
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
| **200** | Roles. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="listuserroles"></a>
# **ListUserRoles**
> RoleList ListUserRoles (Guid userId)

List the roles assigned to a user

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using TrustPort.Identity.Management.Api;
using TrustPort.Identity.Management.Client;
using TrustPort.Identity.Management.Model;

namespace Example
{
    public class ListUserRolesExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://id.trustportidentity.com";
            // Configure Bearer token for authorization: bearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";

            // create instances of HttpClient, HttpClientHandler to be reused later with different Api classes
            HttpClient httpClient = new HttpClient();
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            var apiInstance = new RolesApi(httpClient, config, httpClientHandler);
            var userId = "userId_example";  // Guid | 

            try
            {
                // List the roles assigned to a user
                RoleList result = apiInstance.ListUserRoles(userId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling RolesApi.ListUserRoles: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the ListUserRolesWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // List the roles assigned to a user
    ApiResponse<RoleList> response = apiInstance.ListUserRolesWithHttpInfo(userId);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling RolesApi.ListUserRolesWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **userId** | **Guid** |  |  |

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
| **200** | Roles. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="revokerole"></a>
# **RevokeRole**
> void RevokeRole (RevokeRoleInput revokeRoleInput)

Revoke a role from a user

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using TrustPort.Identity.Management.Api;
using TrustPort.Identity.Management.Client;
using TrustPort.Identity.Management.Model;

namespace Example
{
    public class RevokeRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://id.trustportidentity.com";
            // Configure Bearer token for authorization: bearerAuth
            config.AccessToken = "YOUR_BEARER_TOKEN";

            // create instances of HttpClient, HttpClientHandler to be reused later with different Api classes
            HttpClient httpClient = new HttpClient();
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            var apiInstance = new RolesApi(httpClient, config, httpClientHandler);
            var revokeRoleInput = new RevokeRoleInput(); // RevokeRoleInput | 

            try
            {
                // Revoke a role from a user
                apiInstance.RevokeRole(revokeRoleInput);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling RolesApi.RevokeRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the RevokeRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Revoke a role from a user
    apiInstance.RevokeRoleWithHttpInfo(revokeRoleInput);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling RolesApi.RevokeRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **revokeRoleInput** | [**RevokeRoleInput**](RevokeRoleInput.md) |  |  |

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
| **204** | Revoked. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

