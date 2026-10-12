# GroupMember

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**UserId** | **string** |  | 
**Username** | **string** |  | 
**Email** | **string** |  | 
**AddedAt** | **time.Time** |  | 

## Methods

### NewGroupMember

`func NewGroupMember(userId string, username string, email string, addedAt time.Time, ) *GroupMember`

NewGroupMember instantiates a new GroupMember object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewGroupMemberWithDefaults

`func NewGroupMemberWithDefaults() *GroupMember`

NewGroupMemberWithDefaults instantiates a new GroupMember object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUserId

`func (o *GroupMember) GetUserId() string`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *GroupMember) GetUserIdOk() (*string, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *GroupMember) SetUserId(v string)`

SetUserId sets UserId field to given value.


### GetUsername

`func (o *GroupMember) GetUsername() string`

GetUsername returns the Username field if non-nil, zero value otherwise.

### GetUsernameOk

`func (o *GroupMember) GetUsernameOk() (*string, bool)`

GetUsernameOk returns a tuple with the Username field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsername

`func (o *GroupMember) SetUsername(v string)`

SetUsername sets Username field to given value.


### GetEmail

`func (o *GroupMember) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *GroupMember) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *GroupMember) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetAddedAt

`func (o *GroupMember) GetAddedAt() time.Time`

GetAddedAt returns the AddedAt field if non-nil, zero value otherwise.

### GetAddedAtOk

`func (o *GroupMember) GetAddedAtOk() (*time.Time, bool)`

GetAddedAtOk returns a tuple with the AddedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddedAt

`func (o *GroupMember) SetAddedAt(v time.Time)`

SetAddedAt sets AddedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


