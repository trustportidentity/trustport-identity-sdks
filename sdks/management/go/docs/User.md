# User

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**Username** | **string** |  | 
**Email** | **string** |  | 
**FirstName** | Pointer to **string** |  | [optional] 
**LastName** | Pointer to **string** |  | [optional] 
**Status** | **string** |  | 
**IsActive** | **bool** |  | 
**IsLocked** | **bool** |  | 
**LockedUntil** | Pointer to **time.Time** |  | [optional] 
**LockReason** | Pointer to **string** |  | [optional] 
**EmailVerified** | **bool** |  | 
**Phone** | Pointer to **string** |  | [optional] 
**PhoneVerified** | **bool** |  | 
**MfaRequired** | **bool** |  | 
**LastLoginAt** | Pointer to **time.Time** |  | [optional] 
**PasswordChangedAt** | Pointer to **time.Time** |  | [optional] 
**Attributes** | **map[string]interface{}** |  | 
**ExternalId** | Pointer to **string** |  | [optional] 
**Source** | **string** | How the account was created (for example local, ldap, scim, google). | 
**CreatedAt** | **time.Time** |  | 
**UpdatedAt** | **time.Time** |  | 

## Methods

### NewUser

`func NewUser(id string, username string, email string, status string, isActive bool, isLocked bool, emailVerified bool, phoneVerified bool, mfaRequired bool, attributes map[string]interface{}, source string, createdAt time.Time, updatedAt time.Time, ) *User`

NewUser instantiates a new User object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUserWithDefaults

`func NewUserWithDefaults() *User`

NewUserWithDefaults instantiates a new User object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *User) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *User) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *User) SetId(v string)`

SetId sets Id field to given value.


### GetUsername

`func (o *User) GetUsername() string`

GetUsername returns the Username field if non-nil, zero value otherwise.

### GetUsernameOk

`func (o *User) GetUsernameOk() (*string, bool)`

GetUsernameOk returns a tuple with the Username field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsername

`func (o *User) SetUsername(v string)`

SetUsername sets Username field to given value.


### GetEmail

`func (o *User) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *User) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *User) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetFirstName

`func (o *User) GetFirstName() string`

GetFirstName returns the FirstName field if non-nil, zero value otherwise.

### GetFirstNameOk

`func (o *User) GetFirstNameOk() (*string, bool)`

GetFirstNameOk returns a tuple with the FirstName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFirstName

`func (o *User) SetFirstName(v string)`

SetFirstName sets FirstName field to given value.

### HasFirstName

`func (o *User) HasFirstName() bool`

HasFirstName returns a boolean if a field has been set.

### GetLastName

`func (o *User) GetLastName() string`

GetLastName returns the LastName field if non-nil, zero value otherwise.

### GetLastNameOk

`func (o *User) GetLastNameOk() (*string, bool)`

GetLastNameOk returns a tuple with the LastName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastName

`func (o *User) SetLastName(v string)`

SetLastName sets LastName field to given value.

### HasLastName

`func (o *User) HasLastName() bool`

HasLastName returns a boolean if a field has been set.

### GetStatus

`func (o *User) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *User) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *User) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetIsActive

`func (o *User) GetIsActive() bool`

GetIsActive returns the IsActive field if non-nil, zero value otherwise.

### GetIsActiveOk

`func (o *User) GetIsActiveOk() (*bool, bool)`

GetIsActiveOk returns a tuple with the IsActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsActive

`func (o *User) SetIsActive(v bool)`

SetIsActive sets IsActive field to given value.


### GetIsLocked

`func (o *User) GetIsLocked() bool`

GetIsLocked returns the IsLocked field if non-nil, zero value otherwise.

### GetIsLockedOk

`func (o *User) GetIsLockedOk() (*bool, bool)`

GetIsLockedOk returns a tuple with the IsLocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsLocked

`func (o *User) SetIsLocked(v bool)`

SetIsLocked sets IsLocked field to given value.


### GetLockedUntil

`func (o *User) GetLockedUntil() time.Time`

GetLockedUntil returns the LockedUntil field if non-nil, zero value otherwise.

### GetLockedUntilOk

`func (o *User) GetLockedUntilOk() (*time.Time, bool)`

GetLockedUntilOk returns a tuple with the LockedUntil field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLockedUntil

`func (o *User) SetLockedUntil(v time.Time)`

SetLockedUntil sets LockedUntil field to given value.

### HasLockedUntil

`func (o *User) HasLockedUntil() bool`

HasLockedUntil returns a boolean if a field has been set.

### GetLockReason

`func (o *User) GetLockReason() string`

GetLockReason returns the LockReason field if non-nil, zero value otherwise.

### GetLockReasonOk

`func (o *User) GetLockReasonOk() (*string, bool)`

GetLockReasonOk returns a tuple with the LockReason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLockReason

`func (o *User) SetLockReason(v string)`

SetLockReason sets LockReason field to given value.

### HasLockReason

`func (o *User) HasLockReason() bool`

HasLockReason returns a boolean if a field has been set.

### GetEmailVerified

`func (o *User) GetEmailVerified() bool`

GetEmailVerified returns the EmailVerified field if non-nil, zero value otherwise.

### GetEmailVerifiedOk

`func (o *User) GetEmailVerifiedOk() (*bool, bool)`

GetEmailVerifiedOk returns a tuple with the EmailVerified field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmailVerified

`func (o *User) SetEmailVerified(v bool)`

SetEmailVerified sets EmailVerified field to given value.


### GetPhone

`func (o *User) GetPhone() string`

GetPhone returns the Phone field if non-nil, zero value otherwise.

### GetPhoneOk

`func (o *User) GetPhoneOk() (*string, bool)`

GetPhoneOk returns a tuple with the Phone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPhone

`func (o *User) SetPhone(v string)`

SetPhone sets Phone field to given value.

### HasPhone

`func (o *User) HasPhone() bool`

HasPhone returns a boolean if a field has been set.

### GetPhoneVerified

`func (o *User) GetPhoneVerified() bool`

GetPhoneVerified returns the PhoneVerified field if non-nil, zero value otherwise.

### GetPhoneVerifiedOk

`func (o *User) GetPhoneVerifiedOk() (*bool, bool)`

GetPhoneVerifiedOk returns a tuple with the PhoneVerified field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPhoneVerified

`func (o *User) SetPhoneVerified(v bool)`

SetPhoneVerified sets PhoneVerified field to given value.


### GetMfaRequired

`func (o *User) GetMfaRequired() bool`

GetMfaRequired returns the MfaRequired field if non-nil, zero value otherwise.

### GetMfaRequiredOk

`func (o *User) GetMfaRequiredOk() (*bool, bool)`

GetMfaRequiredOk returns a tuple with the MfaRequired field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMfaRequired

`func (o *User) SetMfaRequired(v bool)`

SetMfaRequired sets MfaRequired field to given value.


### GetLastLoginAt

`func (o *User) GetLastLoginAt() time.Time`

GetLastLoginAt returns the LastLoginAt field if non-nil, zero value otherwise.

### GetLastLoginAtOk

`func (o *User) GetLastLoginAtOk() (*time.Time, bool)`

GetLastLoginAtOk returns a tuple with the LastLoginAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastLoginAt

`func (o *User) SetLastLoginAt(v time.Time)`

SetLastLoginAt sets LastLoginAt field to given value.

### HasLastLoginAt

`func (o *User) HasLastLoginAt() bool`

HasLastLoginAt returns a boolean if a field has been set.

### GetPasswordChangedAt

`func (o *User) GetPasswordChangedAt() time.Time`

GetPasswordChangedAt returns the PasswordChangedAt field if non-nil, zero value otherwise.

### GetPasswordChangedAtOk

`func (o *User) GetPasswordChangedAtOk() (*time.Time, bool)`

GetPasswordChangedAtOk returns a tuple with the PasswordChangedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPasswordChangedAt

`func (o *User) SetPasswordChangedAt(v time.Time)`

SetPasswordChangedAt sets PasswordChangedAt field to given value.

### HasPasswordChangedAt

`func (o *User) HasPasswordChangedAt() bool`

HasPasswordChangedAt returns a boolean if a field has been set.

### GetAttributes

`func (o *User) GetAttributes() map[string]interface{}`

GetAttributes returns the Attributes field if non-nil, zero value otherwise.

### GetAttributesOk

`func (o *User) GetAttributesOk() (*map[string]interface{}, bool)`

GetAttributesOk returns a tuple with the Attributes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAttributes

`func (o *User) SetAttributes(v map[string]interface{})`

SetAttributes sets Attributes field to given value.


### GetExternalId

`func (o *User) GetExternalId() string`

GetExternalId returns the ExternalId field if non-nil, zero value otherwise.

### GetExternalIdOk

`func (o *User) GetExternalIdOk() (*string, bool)`

GetExternalIdOk returns a tuple with the ExternalId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExternalId

`func (o *User) SetExternalId(v string)`

SetExternalId sets ExternalId field to given value.

### HasExternalId

`func (o *User) HasExternalId() bool`

HasExternalId returns a boolean if a field has been set.

### GetSource

`func (o *User) GetSource() string`

GetSource returns the Source field if non-nil, zero value otherwise.

### GetSourceOk

`func (o *User) GetSourceOk() (*string, bool)`

GetSourceOk returns a tuple with the Source field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSource

`func (o *User) SetSource(v string)`

SetSource sets Source field to given value.


### GetCreatedAt

`func (o *User) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *User) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *User) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.


### GetUpdatedAt

`func (o *User) GetUpdatedAt() time.Time`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *User) GetUpdatedAtOk() (*time.Time, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *User) SetUpdatedAt(v time.Time)`

SetUpdatedAt sets UpdatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


