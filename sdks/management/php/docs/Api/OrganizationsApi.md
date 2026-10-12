# TrustPortIdentityManagement\OrganizationsApi



All URIs are relative to https://id.trustportidentity.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createOrganization()**](OrganizationsApi.md#createOrganization) | **POST** /api/v1/organizations | Create an organization (at most 20 domains, validated and lower-cased) |
| [**deleteOrganization()**](OrganizationsApi.md#deleteOrganization) | **DELETE** /api/v1/organizations/{organizationId} | Delete an organization |
| [**listOrganizations()**](OrganizationsApi.md#listOrganizations) | **GET** /api/v1/organizations | List organizations |
| [**updateOrganization()**](OrganizationsApi.md#updateOrganization) | **PATCH** /api/v1/organizations/{organizationId} | Update an organization (only the fields you send change) |


## `createOrganization()`

```php
createOrganization($create_organization_input): \TrustPortIdentityManagement\Model\OrganizationEnvelope
```

Create an organization (at most 20 domains, validated and lower-cased)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\OrganizationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$create_organization_input = new \TrustPortIdentityManagement\Model\CreateOrganizationInput(); // \TrustPortIdentityManagement\Model\CreateOrganizationInput

try {
    $result = $apiInstance->createOrganization($create_organization_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationsApi->createOrganization: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_organization_input** | [**\TrustPortIdentityManagement\Model\CreateOrganizationInput**](../Model/CreateOrganizationInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\OrganizationEnvelope**](../Model/OrganizationEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteOrganization()`

```php
deleteOrganization($organization_id)
```

Delete an organization

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\OrganizationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$organization_id = 'organization_id_example'; // string

try {
    $apiInstance->deleteOrganization($organization_id);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationsApi->deleteOrganization: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **organization_id** | **string**|  | |

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

## `listOrganizations()`

```php
listOrganizations(): \TrustPortIdentityManagement\Model\OrganizationList
```

List organizations

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\OrganizationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);

try {
    $result = $apiInstance->listOrganizations();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationsApi->listOrganizations: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\TrustPortIdentityManagement\Model\OrganizationList**](../Model/OrganizationList.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateOrganization()`

```php
updateOrganization($organization_id, $update_organization_input): \TrustPortIdentityManagement\Model\OrganizationEnvelope
```

Update an organization (only the fields you send change)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\OrganizationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$organization_id = 'organization_id_example'; // string
$update_organization_input = new \TrustPortIdentityManagement\Model\UpdateOrganizationInput(); // \TrustPortIdentityManagement\Model\UpdateOrganizationInput

try {
    $result = $apiInstance->updateOrganization($organization_id, $update_organization_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationsApi->updateOrganization: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **organization_id** | **string**|  | |
| **update_organization_input** | [**\TrustPortIdentityManagement\Model\UpdateOrganizationInput**](../Model/UpdateOrganizationInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\OrganizationEnvelope**](../Model/OrganizationEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
