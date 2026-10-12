# TrustPortIdentityManagement\ApplicationsApi



All URIs are relative to https://id.trustportidentity.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createApplication()**](ApplicationsApi.md#createApplication) | **POST** /api/v1/applications | Register an application. The client secret is returned once, in this response. |
| [**deleteApplication()**](ApplicationsApi.md#deleteApplication) | **DELETE** /api/v1/applications/{applicationId} | Delete an application |
| [**listApplications()**](ApplicationsApi.md#listApplications) | **GET** /api/v1/applications | List applications (OAuth / OIDC clients) |
| [**rotateApplicationSecret()**](ApplicationsApi.md#rotateApplicationSecret) | **POST** /api/v1/applications/{applicationId}/rotate-secret | Issue a new client secret (returned once). The old secret stops working. |
| [**updateApplication()**](ApplicationsApi.md#updateApplication) | **PATCH** /api/v1/applications/{applicationId} | Update an application&#39;s name or redirect URIs |


## `createApplication()`

```php
createApplication($create_application_input): \TrustPortIdentityManagement\Model\ApplicationEnvelope
```

Register an application. The client secret is returned once, in this response.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\ApplicationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$create_application_input = new \TrustPortIdentityManagement\Model\CreateApplicationInput(); // \TrustPortIdentityManagement\Model\CreateApplicationInput

try {
    $result = $apiInstance->createApplication($create_application_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ApplicationsApi->createApplication: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_application_input** | [**\TrustPortIdentityManagement\Model\CreateApplicationInput**](../Model/CreateApplicationInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\ApplicationEnvelope**](../Model/ApplicationEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteApplication()`

```php
deleteApplication($application_id)
```

Delete an application

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\ApplicationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$application_id = 'application_id_example'; // string

try {
    $apiInstance->deleteApplication($application_id);
} catch (Exception $e) {
    echo 'Exception when calling ApplicationsApi->deleteApplication: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **application_id** | **string**|  | |

### Return type

void (empty response body)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `listApplications()`

```php
listApplications(): \TrustPortIdentityManagement\Model\ApplicationList
```

List applications (OAuth / OIDC clients)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\ApplicationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);

try {
    $result = $apiInstance->listApplications();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ApplicationsApi->listApplications: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\TrustPortIdentityManagement\Model\ApplicationList**](../Model/ApplicationList.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `rotateApplicationSecret()`

```php
rotateApplicationSecret($application_id): \TrustPortIdentityManagement\Model\ApplicationEnvelope
```

Issue a new client secret (returned once). The old secret stops working.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\ApplicationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$application_id = 'application_id_example'; // string

try {
    $result = $apiInstance->rotateApplicationSecret($application_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ApplicationsApi->rotateApplicationSecret: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **application_id** | **string**|  | |

### Return type

[**\TrustPortIdentityManagement\Model\ApplicationEnvelope**](../Model/ApplicationEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateApplication()`

```php
updateApplication($application_id, $create_application_input): \TrustPortIdentityManagement\Model\ApplicationEnvelope
```

Update an application's name or redirect URIs

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\ApplicationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$application_id = 'application_id_example'; // string
$create_application_input = new \TrustPortIdentityManagement\Model\CreateApplicationInput(); // \TrustPortIdentityManagement\Model\CreateApplicationInput

try {
    $result = $apiInstance->updateApplication($application_id, $create_application_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ApplicationsApi->updateApplication: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **application_id** | **string**|  | |
| **create_application_input** | [**\TrustPortIdentityManagement\Model\CreateApplicationInput**](../Model/CreateApplicationInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\ApplicationEnvelope**](../Model/ApplicationEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
