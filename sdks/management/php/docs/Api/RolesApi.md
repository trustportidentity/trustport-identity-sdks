# TrustPortIdentityManagement\RolesApi



All URIs are relative to https://id.trustportidentity.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**assignRole()**](RolesApi.md#assignRole) | **POST** /api/v1/roles/assign | Assign a role to a user (optionally until a date). Only an owner can grant ownership. |
| [**createRole()**](RolesApi.md#createRole) | **POST** /api/v1/roles | Create a role |
| [**deleteRole()**](RolesApi.md#deleteRole) | **DELETE** /api/v1/roles/{roleId} | Delete a role |
| [**listRoles()**](RolesApi.md#listRoles) | **GET** /api/v1/roles | List roles |
| [**listUserRoles()**](RolesApi.md#listUserRoles) | **GET** /api/v1/users/{userId}/roles | List the roles assigned to a user |
| [**revokeRole()**](RolesApi.md#revokeRole) | **POST** /api/v1/roles/revoke | Revoke a role from a user |


## `assignRole()`

```php
assignRole($assign_role_input)
```

Assign a role to a user (optionally until a date). Only an owner can grant ownership.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\RolesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$assign_role_input = new \TrustPortIdentityManagement\Model\AssignRoleInput(); // \TrustPortIdentityManagement\Model\AssignRoleInput

try {
    $apiInstance->assignRole($assign_role_input);
} catch (Exception $e) {
    echo 'Exception when calling RolesApi->assignRole: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **assign_role_input** | [**\TrustPortIdentityManagement\Model\AssignRoleInput**](../Model/AssignRoleInput.md)|  | |

### Return type

void (empty response body)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createRole()`

```php
createRole($create_role_input): \TrustPortIdentityManagement\Model\RoleEnvelope
```

Create a role

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\RolesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$create_role_input = new \TrustPortIdentityManagement\Model\CreateRoleInput(); // \TrustPortIdentityManagement\Model\CreateRoleInput

try {
    $result = $apiInstance->createRole($create_role_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RolesApi->createRole: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_role_input** | [**\TrustPortIdentityManagement\Model\CreateRoleInput**](../Model/CreateRoleInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\RoleEnvelope**](../Model/RoleEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteRole()`

```php
deleteRole($role_id)
```

Delete a role

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\RolesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$role_id = 'role_id_example'; // string

try {
    $apiInstance->deleteRole($role_id);
} catch (Exception $e) {
    echo 'Exception when calling RolesApi->deleteRole: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**|  | |

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

## `listRoles()`

```php
listRoles(): \TrustPortIdentityManagement\Model\RoleList
```

List roles

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\RolesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);

try {
    $result = $apiInstance->listRoles();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RolesApi->listRoles: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\TrustPortIdentityManagement\Model\RoleList**](../Model/RoleList.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `listUserRoles()`

```php
listUserRoles($user_id): \TrustPortIdentityManagement\Model\RoleList
```

List the roles assigned to a user

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\RolesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$user_id = 'user_id_example'; // string

try {
    $result = $apiInstance->listUserRoles($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RolesApi->listUserRoles: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**|  | |

### Return type

[**\TrustPortIdentityManagement\Model\RoleList**](../Model/RoleList.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `revokeRole()`

```php
revokeRole($revoke_role_input)
```

Revoke a role from a user

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\RolesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$revoke_role_input = new \TrustPortIdentityManagement\Model\RevokeRoleInput(); // \TrustPortIdentityManagement\Model\RevokeRoleInput

try {
    $apiInstance->revokeRole($revoke_role_input);
} catch (Exception $e) {
    echo 'Exception when calling RolesApi->revokeRole: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **revoke_role_input** | [**\TrustPortIdentityManagement\Model\RevokeRoleInput**](../Model/RevokeRoleInput.md)|  | |

### Return type

void (empty response body)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
