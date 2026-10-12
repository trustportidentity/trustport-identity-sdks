# User

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **UUID** |  | 
**username** | **String** |  | 
**email** | **String** |  | 
**firstName** | **String** |  | [optional] 
**lastName** | **String** |  | [optional] 
**status** | **String** |  | 
**isActive** | **Bool** |  | 
**isLocked** | **Bool** |  | 
**lockedUntil** | **Date** |  | [optional] 
**lockReason** | **String** |  | [optional] 
**emailVerified** | **Bool** |  | 
**phone** | **String** |  | [optional] 
**phoneVerified** | **Bool** |  | 
**mfaRequired** | **Bool** |  | 
**lastLoginAt** | **Date** |  | [optional] 
**passwordChangedAt** | **Date** |  | [optional] 
**attributes** | **[String: AnyCodable]** |  | 
**externalId** | **String** |  | [optional] 
**source** | **String** | How the account was created (for example local, ldap, scim, google). | 
**createdAt** | **Date** |  | 
**updatedAt** | **Date** |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


