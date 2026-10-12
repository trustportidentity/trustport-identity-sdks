# TrustPortIdentityManagement\UsersApi



All URIs are relative to https://id.trustportidentity.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createUser()**](UsersApi.md#createUser) | **POST** /api/v1/users | Create a user |
| [**deleteUser()**](UsersApi.md#deleteUser) | **DELETE** /api/v1/users/{userId} | Delete a user (soft delete; sessions are revoked) |
| [**getUser()**](UsersApi.md#getUser) | **GET** /api/v1/users/{userId} | Get a user |
| [**listUsers()**](UsersApi.md#listUsers) | **GET** /api/v1/users | List users |
| [**updateUser()**](UsersApi.md#updateUser) | **PATCH** /api/v1/users/{userId} | Update a user (only the fields you send change) |


## `createUser()`

```php
createUser($create_user_input): \TrustPortIdentityManagement\Model\UserEnvelope
```

Create a user

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\UsersApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$create_user_input = new \TrustPortIdentityManagement\Model\CreateUserInput(); // \TrustPortIdentityManagement\Model\CreateUserInput

try {
    $result = $apiInstance->createUser($create_user_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UsersApi->createUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_user_input** | [**\TrustPortIdentityManagement\Model\CreateUserInput**](../Model/CreateUserInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\UserEnvelope**](../Model/UserEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteUser()`

```php
deleteUser($user_id)
```

Delete a user (soft delete; sessions are revoked)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\UsersApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$user_id = 'user_id_example'; // string

try {
    $apiInstance->deleteUser($user_id);
} catch (Exception $e) {
    echo 'Exception when calling UsersApi->deleteUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**|  | |

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

## `getUser()`

```php
getUser($user_id): \TrustPortIdentityManagement\Model\UserEnvelope
```

Get a user

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\UsersApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$user_id = 'user_id_example'; // string

try {
    $result = $apiInstance->getUser($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UsersApi->getUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**|  | |

### Return type

[**\TrustPortIdentityManagement\Model\UserEnvelope**](../Model/UserEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `listUsers()`

```php
listUsers($page, $per_page, $q, $status): \TrustPortIdentityManagement\Model\UserList
```

List users

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\UsersApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$page = 1; // int
$per_page = 20; // int
$q = 'q_example'; // string | Searches username, email, first and last name.
$status = 'status_example'; // string

try {
    $result = $apiInstance->listUsers($page, $per_page, $q, $status);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UsersApi->listUsers: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **page** | **int**|  | [optional] [default to 1] |
| **per_page** | **int**|  | [optional] [default to 20] |
| **q** | **string**| Searches username, email, first and last name. | [optional] |
| **status** | **string**|  | [optional] |

### Return type

[**\TrustPortIdentityManagement\Model\UserList**](../Model/UserList.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateUser()`

```php
updateUser($user_id, $update_user_input): \TrustPortIdentityManagement\Model\UserEnvelope
```

Update a user (only the fields you send change)

Setting `is_active` to false also revokes the user's live sessions. Only an owner can deactivate an owner, and the last owner cannot be removed.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\UsersApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$user_id = 'user_id_example'; // string
$update_user_input = new \TrustPortIdentityManagement\Model\UpdateUserInput(); // \TrustPortIdentityManagement\Model\UpdateUserInput

try {
    $result = $apiInstance->updateUser($user_id, $update_user_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UsersApi->updateUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**|  | |
| **update_user_input** | [**\TrustPortIdentityManagement\Model\UpdateUserInput**](../Model/UpdateUserInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\UserEnvelope**](../Model/UserEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
