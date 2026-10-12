# TrustPortIdentityManagement\DomainsApi



All URIs are relative to https://id.trustportidentity.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createCustomDomain()**](DomainsApi.md#createCustomDomain) | **POST** /api/v1/domains | Add a custom domain; returns the DNS records to publish |
| [**deleteCustomDomain()**](DomainsApi.md#deleteCustomDomain) | **DELETE** /api/v1/domains/{domainId} | Remove a custom domain |
| [**listCustomDomains()**](DomainsApi.md#listCustomDomains) | **GET** /api/v1/domains | List custom domains |
| [**verifyCustomDomain()**](DomainsApi.md#verifyCustomDomain) | **POST** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain |


## `createCustomDomain()`

```php
createCustomDomain($create_custom_domain_input): \TrustPortIdentityManagement\Model\CustomDomainEnvelope
```

Add a custom domain; returns the DNS records to publish

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\DomainsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$create_custom_domain_input = new \TrustPortIdentityManagement\Model\CreateCustomDomainInput(); // \TrustPortIdentityManagement\Model\CreateCustomDomainInput

try {
    $result = $apiInstance->createCustomDomain($create_custom_domain_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DomainsApi->createCustomDomain: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_custom_domain_input** | [**\TrustPortIdentityManagement\Model\CreateCustomDomainInput**](../Model/CreateCustomDomainInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\CustomDomainEnvelope**](../Model/CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteCustomDomain()`

```php
deleteCustomDomain($domain_id)
```

Remove a custom domain

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\DomainsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$domain_id = 'domain_id_example'; // string

try {
    $apiInstance->deleteCustomDomain($domain_id);
} catch (Exception $e) {
    echo 'Exception when calling DomainsApi->deleteCustomDomain: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **domain_id** | **string**|  | |

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

## `listCustomDomains()`

```php
listCustomDomains(): \TrustPortIdentityManagement\Model\CustomDomainList
```

List custom domains

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\DomainsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);

try {
    $result = $apiInstance->listCustomDomains();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DomainsApi->listCustomDomains: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\TrustPortIdentityManagement\Model\CustomDomainList**](../Model/CustomDomainList.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `verifyCustomDomain()`

```php
verifyCustomDomain($domain_id): \TrustPortIdentityManagement\Model\CustomDomainEnvelope
```

Check the DNS records for a custom domain

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\DomainsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$domain_id = 'domain_id_example'; // string

try {
    $result = $apiInstance->verifyCustomDomain($domain_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DomainsApi->verifyCustomDomain: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **domain_id** | **string**|  | |

### Return type

[**\TrustPortIdentityManagement\Model\CustomDomainEnvelope**](../Model/CustomDomainEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
