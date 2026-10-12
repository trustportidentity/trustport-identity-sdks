# Invitation

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**Email** | **string** |  | 
**RoleName** | **string** |  | 
**InvitedBy** | **string** |  | 
**Status** | **string** |  | 
**ExpiresAt** | **time.Time** |  | 
**AcceptedAt** | Pointer to **NullableTime** |  | [optional] 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewInvitation

`func NewInvitation(id string, email string, roleName string, invitedBy string, status string, expiresAt time.Time, createdAt time.Time, ) *Invitation`

NewInvitation instantiates a new Invitation object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewInvitationWithDefaults

`func NewInvitationWithDefaults() *Invitation`

NewInvitationWithDefaults instantiates a new Invitation object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Invitation) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Invitation) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Invitation) SetId(v string)`

SetId sets Id field to given value.


### GetEmail

`func (o *Invitation) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *Invitation) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *Invitation) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetRoleName

`func (o *Invitation) GetRoleName() string`

GetRoleName returns the RoleName field if non-nil, zero value otherwise.

### GetRoleNameOk

`func (o *Invitation) GetRoleNameOk() (*string, bool)`

GetRoleNameOk returns a tuple with the RoleName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoleName

`func (o *Invitation) SetRoleName(v string)`

SetRoleName sets RoleName field to given value.


### GetInvitedBy

`func (o *Invitation) GetInvitedBy() string`

GetInvitedBy returns the InvitedBy field if non-nil, zero value otherwise.

### GetInvitedByOk

`func (o *Invitation) GetInvitedByOk() (*string, bool)`

GetInvitedByOk returns a tuple with the InvitedBy field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInvitedBy

`func (o *Invitation) SetInvitedBy(v string)`

SetInvitedBy sets InvitedBy field to given value.


### GetStatus

`func (o *Invitation) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *Invitation) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *Invitation) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetExpiresAt

`func (o *Invitation) GetExpiresAt() time.Time`

GetExpiresAt returns the ExpiresAt field if non-nil, zero value otherwise.

### GetExpiresAtOk

`func (o *Invitation) GetExpiresAtOk() (*time.Time, bool)`

GetExpiresAtOk returns a tuple with the ExpiresAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExpiresAt

`func (o *Invitation) SetExpiresAt(v time.Time)`

SetExpiresAt sets ExpiresAt field to given value.


### GetAcceptedAt

`func (o *Invitation) GetAcceptedAt() time.Time`

GetAcceptedAt returns the AcceptedAt field if non-nil, zero value otherwise.

### GetAcceptedAtOk

`func (o *Invitation) GetAcceptedAtOk() (*time.Time, bool)`

GetAcceptedAtOk returns a tuple with the AcceptedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAcceptedAt

`func (o *Invitation) SetAcceptedAt(v time.Time)`

SetAcceptedAt sets AcceptedAt field to given value.

### HasAcceptedAt

`func (o *Invitation) HasAcceptedAt() bool`

HasAcceptedAt returns a boolean if a field has been set.

### SetAcceptedAtNil

`func (o *Invitation) SetAcceptedAtNil(b bool)`

 SetAcceptedAtNil sets the value for AcceptedAt to be an explicit nil

### UnsetAcceptedAt
`func (o *Invitation) UnsetAcceptedAt()`

UnsetAcceptedAt ensures that no value is present for AcceptedAt, not even an explicit nil
### GetCreatedAt

`func (o *Invitation) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *Invitation) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *Invitation) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


