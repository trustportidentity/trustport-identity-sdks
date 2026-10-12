# User

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  |
**username** | **string** |  |
**email** | **string** |  |
**first_name** | **string** |  | [optional]
**last_name** | **string** |  | [optional]
**status** | **string** |  |
**is_active** | **bool** |  |
**is_locked** | **bool** |  |
**locked_until** | **\DateTime** |  | [optional]
**lock_reason** | **string** |  | [optional]
**email_verified** | **bool** |  |
**phone** | **string** |  | [optional]
**phone_verified** | **bool** |  |
**mfa_required** | **bool** |  |
**last_login_at** | **\DateTime** |  | [optional]
**password_changed_at** | **\DateTime** |  | [optional]
**attributes** | **array<string,mixed>** |  |
**external_id** | **string** |  | [optional]
**source** | **string** | How the account was created (for example local, ldap, scim, google). |
**created_at** | **\DateTime** |  |
**updated_at** | **\DateTime** |  |

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
