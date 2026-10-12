# TrustPort.Identity.Management.Api.DomainsApi

All URIs are relative to *https://id.trustportidentity.com*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**CreateCustomDomain**](DomainsApi.md#createcustomdomain) | **POST** /api/v1/domains | Add a custom domain; returns the DNS records to publish |
| [**DeleteCustomDomain**](DomainsApi.md#deletecustomdomain) | **DELETE** /api/v1/domains/{domainId} | Remove a custom domain |
| [**ListCustomDomains**](DomainsApi.md#listcustomdomains) | **GET** /api/v1/domains | List custom domains |
| [**VerifyCustomDomain**](DomainsApi.md#verifycustomdomain) | **POST** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain |

<a id="createcustomdomain"></a>
# **CreateCustomDomain**
> CustomDomainEnvelope CreateCustomDomain (CreateCustomDomainInput createCustomDomainInput)

Add a custom domain; returns the DNS records to publish

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
    public class CreateCustomDomainExample
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
            var apiInstance = new DomainsApi(httpClient, config, httpClientHandler);
            var createCustomDomainInput = new CreateCustomDomainInput(); // CreateCustomDomainInput | 

            try
            {
                // Add a custom domain; returns the DNS records to publish
                CustomDomainEnvelope result = apiInstance.CreateCustomDomain(createCustomDomainInput);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DomainsApi.CreateCustomDomain: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the CreateCustomDomainWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Add a custom domain; returns the DNS records to publish
    ApiResponse<CustomDomainEnvelope> response = apiInstance.CreateCustomDomainWithHttpInfo(createCustomDomainInput);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DomainsApi.CreateCustomDomainWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **createCustomDomainInput** | [**CreateCustomDomainInput**](CreateCustomDomainInput.md) |  |  |

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

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

<a id="deletecustomdomain"></a>
# **DeleteCustomDomain**
> void DeleteCustomDomain (Guid domainId)

Remove a custom domain

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
    public class DeleteCustomDomainExample
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
            var apiInstance = new DomainsApi(httpClient, config, httpClientHandler);
            var domainId = "domainId_example";  // Guid | 

            try
            {
                // Remove a custom domain
                apiInstance.DeleteCustomDomain(domainId);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DomainsApi.DeleteCustomDomain: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeleteCustomDomainWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Remove a custom domain
    apiInstance.DeleteCustomDomainWithHttpInfo(domainId);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DomainsApi.DeleteCustomDomainWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **domainId** | **Guid** |  |  |

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
| **204** | Removed. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="listcustomdomains"></a>
# **ListCustomDomains**
> CustomDomainList ListCustomDomains ()

List custom domains

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
    public class ListCustomDomainsExample
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
            var apiInstance = new DomainsApi(httpClient, config, httpClientHandler);

            try
            {
                // List custom domains
                CustomDomainList result = apiInstance.ListCustomDomains();
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DomainsApi.ListCustomDomains: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the ListCustomDomainsWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // List custom domains
    ApiResponse<CustomDomainList> response = apiInstance.ListCustomDomainsWithHttpInfo();
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DomainsApi.ListCustomDomainsWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters
This endpoint does not need any parameter.
### Return type

[**CustomDomainList**](CustomDomainList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Domains. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="verifycustomdomain"></a>
# **VerifyCustomDomain**
> CustomDomainEnvelope VerifyCustomDomain (Guid domainId)

Check the DNS records for a custom domain

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
    public class VerifyCustomDomainExample
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
            var apiInstance = new DomainsApi(httpClient, config, httpClientHandler);
            var domainId = "domainId_example";  // Guid | 

            try
            {
                // Check the DNS records for a custom domain
                CustomDomainEnvelope result = apiInstance.VerifyCustomDomain(domainId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DomainsApi.VerifyCustomDomain: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the VerifyCustomDomainWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Check the DNS records for a custom domain
    ApiResponse<CustomDomainEnvelope> response = apiInstance.VerifyCustomDomainWithHttpInfo(domainId);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DomainsApi.VerifyCustomDomainWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **domainId** | **Guid** |  |  |

### Return type

[**CustomDomainEnvelope**](CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Result. |  -  |
| **0** | Error. &#x60;error.code&#x60; is one of NOT_FOUND, UNAUTHORIZED, FORBIDDEN, CONFLICT, BAD_REQUEST, VALIDATION_ERROR, RATE_LIMITED, INTERNAL and similar. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

