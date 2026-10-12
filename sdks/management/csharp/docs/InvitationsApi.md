# TrustPort.Identity.Management.Api.InvitationsApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**CreateInvitation**](InvitationsApi.md#createinvitation) | **POST** /api/v1/invitations | Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace. |
| [**ListInvitations**](InvitationsApi.md#listinvitations) | **GET** /api/v1/invitations | List invitations |
| [**ResendInvitation**](InvitationsApi.md#resendinvitation) | **POST** /api/v1/invitations/{invitationId}/resend | Send the invitation email again |
| [**RevokeInvitation**](InvitationsApi.md#revokeinvitation) | **DELETE** /api/v1/invitations/{invitationId} | Revoke an invitation |

<a id="createinvitation"></a>
# **CreateInvitation**
> InvitationEnvelope CreateInvitation (CreateInvitationInput createInvitationInput)

Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.

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
    public class CreateInvitationExample
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
            var apiInstance = new InvitationsApi(httpClient, config, httpClientHandler);
            var createInvitationInput = new CreateInvitationInput(); // CreateInvitationInput | 

            try
            {
                // Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.
                InvitationEnvelope result = apiInstance.CreateInvitation(createInvitationInput);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling InvitationsApi.CreateInvitation: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the CreateInvitationWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.
    ApiResponse<InvitationEnvelope> response = apiInstance.CreateInvitationWithHttpInfo(createInvitationInput);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling InvitationsApi.CreateInvitationWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **createInvitationInput** | [**CreateInvitationInput**](CreateInvitationInput.md) |  |  |

### Return type

[**InvitationEnvelope**](InvitationEnvelope.md)

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

<a id="listinvitations"></a>
# **ListInvitations**
> InvitationList ListInvitations ()

List invitations

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
    public class ListInvitationsExample
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
            var apiInstance = new InvitationsApi(httpClient, config, httpClientHandler);

            try
            {
                // List invitations
                InvitationList result = apiInstance.ListInvitations();
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling InvitationsApi.ListInvitations: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the ListInvitationsWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // List invitations
    ApiResponse<InvitationList> response = apiInstance.ListInvitationsWithHttpInfo();
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling InvitationsApi.ListInvitationsWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters
This endpoint does not need any parameter.
### Return type

[**InvitationList**](InvitationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Invitations. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="resendinvitation"></a>
# **ResendInvitation**
> InvitationEnvelope ResendInvitation (Guid invitationId)

Send the invitation email again

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
    public class ResendInvitationExample
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
            var apiInstance = new InvitationsApi(httpClient, config, httpClientHandler);
            var invitationId = "invitationId_example";  // Guid | 

            try
            {
                // Send the invitation email again
                InvitationEnvelope result = apiInstance.ResendInvitation(invitationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling InvitationsApi.ResendInvitation: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the ResendInvitationWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Send the invitation email again
    ApiResponse<InvitationEnvelope> response = apiInstance.ResendInvitationWithHttpInfo(invitationId);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling InvitationsApi.ResendInvitationWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **invitationId** | **Guid** |  |  |

### Return type

[**InvitationEnvelope**](InvitationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Resent. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="revokeinvitation"></a>
# **RevokeInvitation**
> void RevokeInvitation (Guid invitationId)

Revoke an invitation

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
    public class RevokeInvitationExample
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
            var apiInstance = new InvitationsApi(httpClient, config, httpClientHandler);
            var invitationId = "invitationId_example";  // Guid | 

            try
            {
                // Revoke an invitation
                apiInstance.RevokeInvitation(invitationId);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling InvitationsApi.RevokeInvitation: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the RevokeInvitationWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Revoke an invitation
    apiInstance.RevokeInvitationWithHttpInfo(invitationId);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling InvitationsApi.RevokeInvitationWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **invitationId** | **Guid** |  |  |

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
| **204** | Revoked. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

