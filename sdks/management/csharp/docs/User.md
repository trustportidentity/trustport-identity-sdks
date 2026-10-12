# TrustPort.Identity.Management.Model.User

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **Guid** |  | 
**Username** | **string** |  | 
**Email** | **string** |  | 
**FirstName** | **string** |  | [optional] 
**LastName** | **string** |  | [optional] 
**Status** | **string** |  | 
**IsActive** | **bool** |  | 
**IsLocked** | **bool** |  | 
**LockedUntil** | **DateTime** |  | [optional] 
**LockReason** | **string** |  | [optional] 
**EmailVerified** | **bool** |  | 
**Phone** | **string** |  | [optional] 
**PhoneVerified** | **bool** |  | 
**MfaRequired** | **bool** |  | 
**LastLoginAt** | **DateTime** |  | [optional] 
**PasswordChangedAt** | **DateTime** |  | [optional] 
**Attributes** | **Dictionary&lt;string, Object&gt;** |  | 
**ExternalId** | **string** |  | [optional] 
**Source** | **string** | How the account was created (for example local, ldap, scim, google). | 
**CreatedAt** | **DateTime** |  | 
**UpdatedAt** | **DateTime** |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

