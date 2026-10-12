# AssignRoleInput

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**UserId** | **string** |  | 
**RoleName** | **string** |  | 
**ExpiresAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewAssignRoleInput

`func NewAssignRoleInput(userId string, roleName string, ) *AssignRoleInput`

NewAssignRoleInput instantiates a new AssignRoleInput object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAssignRoleInputWithDefaults

`func NewAssignRoleInputWithDefaults() *AssignRoleInput`

NewAssignRoleInputWithDefaults instantiates a new AssignRoleInput object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUserId

`func (o *AssignRoleInput) GetUserId() string`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *AssignRoleInput) GetUserIdOk() (*string, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *AssignRoleInput) SetUserId(v string)`

SetUserId sets UserId field to given value.


### GetRoleName

`func (o *AssignRoleInput) GetRoleName() string`

GetRoleName returns the RoleName field if non-nil, zero value otherwise.

### GetRoleNameOk

`func (o *AssignRoleInput) GetRoleNameOk() (*string, bool)`

GetRoleNameOk returns a tuple with the RoleName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoleName

`func (o *AssignRoleInput) SetRoleName(v string)`

SetRoleName sets RoleName field to given value.


### GetExpiresAt

`func (o *AssignRoleInput) GetExpiresAt() time.Time`

GetExpiresAt returns the ExpiresAt field if non-nil, zero value otherwise.

### GetExpiresAtOk

`func (o *AssignRoleInput) GetExpiresAtOk() (*time.Time, bool)`

GetExpiresAtOk returns a tuple with the ExpiresAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExpiresAt

`func (o *AssignRoleInput) SetExpiresAt(v time.Time)`

SetExpiresAt sets ExpiresAt field to given value.

### HasExpiresAt

`func (o *AssignRoleInput) HasExpiresAt() bool`

HasExpiresAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


