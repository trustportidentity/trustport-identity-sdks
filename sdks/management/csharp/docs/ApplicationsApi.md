# TrustPort.Identity.Management.Api.ApplicationsApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**CreateApplication**](ApplicationsApi.md#createapplication) | **POST** /api/v1/applications | Register an application. The client secret is returned once, in this response. |
| [**DeleteApplication**](ApplicationsApi.md#deleteapplication) | **DELETE** /api/v1/applications/{applicationId} | Delete an application |
| [**ListApplications**](ApplicationsApi.md#listapplications) | **GET** /api/v1/applications | List applications (OAuth / OIDC clients) |
| [**RotateApplicationSecret**](ApplicationsApi.md#rotateapplicationsecret) | **POST** /api/v1/applications/{applicationId}/rotate-secret | Issue a new client secret (returned once). The old secret stops working. |
| [**UpdateApplication**](ApplicationsApi.md#updateapplication) | **PATCH** /api/v1/applications/{applicationId} | Update an application&#39;s name or redirect URIs |

<a id="createapplication"></a>
# **CreateApplication**
> ApplicationEnvelope CreateApplication (CreateApplicationInput createApplicationInput)

Register an application. The client secret is returned once, in this response.

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
    public class CreateApplicationExample
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
            var apiInstance = new ApplicationsApi(httpClient, config, httpClientHandler);
            var createApplicationInput = new CreateApplicationInput(); // CreateApplicationInput | 

            try
            {
                // Register an application. The client secret is returned once, in this response.
                ApplicationEnvelope result = apiInstance.CreateApplication(createApplicationInput);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ApplicationsApi.CreateApplication: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the CreateApplicationWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Register an application. The client secret is returned once, in this response.
    ApiResponse<ApplicationEnvelope> response = apiInstance.CreateApplicationWithHttpInfo(createApplicationInput);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ApplicationsApi.CreateApplicationWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **createApplicationInput** | [**CreateApplicationInput**](CreateApplicationInput.md) |  |  |

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

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

<a id="deleteapplication"></a>
# **DeleteApplication**
> void DeleteApplication (Guid applicationId)

Delete an application

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
    public class DeleteApplicationExample
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
            var apiInstance = new ApplicationsApi(httpClient, config, httpClientHandler);
            var applicationId = "applicationId_example";  // Guid | 

            try
            {
                // Delete an application
                apiInstance.DeleteApplication(applicationId);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ApplicationsApi.DeleteApplication: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeleteApplicationWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Delete an application
    apiInstance.DeleteApplicationWithHttpInfo(applicationId);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ApplicationsApi.DeleteApplicationWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **applicationId** | **Guid** |  |  |

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

<a id="listapplications"></a>
# **ListApplications**
> ApplicationList ListApplications ()

List applications (OAuth / OIDC clients)

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
    public class ListApplicationsExample
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
            var apiInstance = new ApplicationsApi(httpClient, config, httpClientHandler);

            try
            {
                // List applications (OAuth / OIDC clients)
                ApplicationList result = apiInstance.ListApplications();
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ApplicationsApi.ListApplications: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the ListApplicationsWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // List applications (OAuth / OIDC clients)
    ApiResponse<ApplicationList> response = apiInstance.ListApplicationsWithHttpInfo();
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ApplicationsApi.ListApplicationsWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters
This endpoint does not need any parameter.
### Return type

[**ApplicationList**](ApplicationList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Applications. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="rotateapplicationsecret"></a>
# **RotateApplicationSecret**
> ApplicationEnvelope RotateApplicationSecret (Guid applicationId)

Issue a new client secret (returned once). The old secret stops working.

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
    public class RotateApplicationSecretExample
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
            var apiInstance = new ApplicationsApi(httpClient, config, httpClientHandler);
            var applicationId = "applicationId_example";  // Guid | 

            try
            {
                // Issue a new client secret (returned once). The old secret stops working.
                ApplicationEnvelope result = apiInstance.RotateApplicationSecret(applicationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ApplicationsApi.RotateApplicationSecret: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the RotateApplicationSecretWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Issue a new client secret (returned once). The old secret stops working.
    ApiResponse<ApplicationEnvelope> response = apiInstance.RotateApplicationSecretWithHttpInfo(applicationId);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ApplicationsApi.RotateApplicationSecretWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **applicationId** | **Guid** |  |  |

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Rotated. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="updateapplication"></a>
# **UpdateApplication**
> ApplicationEnvelope UpdateApplication (Guid applicationId, CreateApplicationInput createApplicationInput)

Update an application's name or redirect URIs

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
    public class UpdateApplicationExample
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
            var apiInstance = new ApplicationsApi(httpClient, config, httpClientHandler);
            var applicationId = "applicationId_example";  // Guid | 
            var createApplicationInput = new CreateApplicationInput(); // CreateApplicationInput | 

            try
            {
                // Update an application's name or redirect URIs
                ApplicationEnvelope result = apiInstance.UpdateApplication(applicationId, createApplicationInput);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ApplicationsApi.UpdateApplication: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the UpdateApplicationWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Update an application's name or redirect URIs
    ApiResponse<ApplicationEnvelope> response = apiInstance.UpdateApplicationWithHttpInfo(applicationId, createApplicationInput);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ApplicationsApi.UpdateApplicationWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **applicationId** | **Guid** |  |  |
| **createApplicationInput** | [**CreateApplicationInput**](CreateApplicationInput.md) |  |  |

### Return type

[**ApplicationEnvelope**](ApplicationEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

