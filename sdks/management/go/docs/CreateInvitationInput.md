# CreateInvitationInput

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Email** | **string** |  | 
**RoleName** | Pointer to **string** | Must be an existing role. Only an owner can invite someone as owner. | [optional] 

## Methods

### NewCreateInvitationInput

`func NewCreateInvitationInput(email string, ) *CreateInvitationInput`

NewCreateInvitationInput instantiates a new CreateInvitationInput object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateInvitationInputWithDefaults

`func NewCreateInvitationInputWithDefaults() *CreateInvitationInput`

NewCreateInvitationInputWithDefaults instantiates a new CreateInvitationInput object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetEmail

`func (o *CreateInvitationInput) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *CreateInvitationInput) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *CreateInvitationInput) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetRoleName

`func (o *CreateInvitationInput) GetRoleName() string`

GetRoleName returns the RoleName field if non-nil, zero value otherwise.

### GetRoleNameOk

`func (o *CreateInvitationInput) GetRoleNameOk() (*string, bool)`

GetRoleNameOk returns a tuple with the RoleName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoleName

`func (o *CreateInvitationInput) SetRoleName(v string)`

SetRoleName sets RoleName field to given value.

### HasRoleName

`func (o *CreateInvitationInput) HasRoleName() bool`

HasRoleName returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


