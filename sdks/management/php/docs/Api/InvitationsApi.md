# TrustPortIdentityManagement\InvitationsApi



All URIs are relative to https://id.trustportidentity.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createInvitation()**](InvitationsApi.md#createInvitation) | **POST** /api/v1/invitations | Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace. |
| [**listInvitations()**](InvitationsApi.md#listInvitations) | **GET** /api/v1/invitations | List invitations |
| [**resendInvitation()**](InvitationsApi.md#resendInvitation) | **POST** /api/v1/invitations/{invitationId}/resend | Send the invitation email again |
| [**revokeInvitation()**](InvitationsApi.md#revokeInvitation) | **DELETE** /api/v1/invitations/{invitationId} | Revoke an invitation |


## `createInvitation()`

```php
createInvitation($create_invitation_input): \TrustPortIdentityManagement\Model\InvitationEnvelope
```

Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\InvitationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$create_invitation_input = new \TrustPortIdentityManagement\Model\CreateInvitationInput(); // \TrustPortIdentityManagement\Model\CreateInvitationInput

try {
    $result = $apiInstance->createInvitation($create_invitation_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling InvitationsApi->createInvitation: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_invitation_input** | [**\TrustPortIdentityManagement\Model\CreateInvitationInput**](../Model/CreateInvitationInput.md)|  | |

### Return type

[**\TrustPortIdentityManagement\Model\InvitationEnvelope**](../Model/InvitationEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `listInvitations()`

```php
listInvitations(): \TrustPortIdentityManagement\Model\InvitationList
```

List invitations

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\InvitationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);

try {
    $result = $apiInstance->listInvitations();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling InvitationsApi->listInvitations: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\TrustPortIdentityManagement\Model\InvitationList**](../Model/InvitationList.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `resendInvitation()`

```php
resendInvitation($invitation_id): \TrustPortIdentityManagement\Model\InvitationEnvelope
```

Send the invitation email again

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\InvitationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$invitation_id = 'invitation_id_example'; // string

try {
    $result = $apiInstance->resendInvitation($invitation_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling InvitationsApi->resendInvitation: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **invitation_id** | **string**|  | |

### Return type

[**\TrustPortIdentityManagement\Model\InvitationEnvelope**](../Model/InvitationEnvelope.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `revokeInvitation()`

```php
revokeInvitation($invitation_id)
```

Revoke an invitation

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\InvitationsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$invitation_id = 'invitation_id_example'; // string

try {
    $apiInstance->revokeInvitation($invitation_id);
} catch (Exception $e) {
    echo 'Exception when calling InvitationsApi->revokeInvitation: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **invitation_id** | **string**|  | |

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
