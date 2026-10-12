# Organization

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**Name** | **string** |  | 
**Domains** | **[]string** |  | 
**SsoProvider** | Pointer to **string** |  | [optional] 
**SsoActive** | **bool** |  | 
**DirectorySyncActive** | **bool** |  | 
**CreatedAt** | **time.Time** |  | 
**UpdatedAt** | **time.Time** |  | 

## Methods

### NewOrganization

`func NewOrganization(id string, name string, domains []string, ssoActive bool, directorySyncActive bool, createdAt time.Time, updatedAt time.Time, ) *Organization`

NewOrganization instantiates a new Organization object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewOrganizationWithDefaults

`func NewOrganizationWithDefaults() *Organization`

NewOrganizationWithDefaults instantiates a new Organization object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Organization) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Organization) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Organization) SetId(v string)`

SetId sets Id field to given value.


### GetName

`func (o *Organization) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *Organization) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *Organization) SetName(v string)`

SetName sets Name field to given value.


### GetDomains

`func (o *Organization) GetDomains() []string`

GetDomains returns the Domains field if non-nil, zero value otherwise.

### GetDomainsOk

`func (o *Organization) GetDomainsOk() (*[]string, bool)`

GetDomainsOk returns a tuple with the Domains field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomains

`func (o *Organization) SetDomains(v []string)`

SetDomains sets Domains field to given value.


### GetSsoProvider

`func (o *Organization) GetSsoProvider() string`

GetSsoProvider returns the SsoProvider field if non-nil, zero value otherwise.

### GetSsoProviderOk

`func (o *Organization) GetSsoProviderOk() (*string, bool)`

GetSsoProviderOk returns a tuple with the SsoProvider field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSsoProvider

`func (o *Organization) SetSsoProvider(v string)`

SetSsoProvider sets SsoProvider field to given value.

### HasSsoProvider

`func (o *Organization) HasSsoProvider() bool`

HasSsoProvider returns a boolean if a field has been set.

### GetSsoActive

`func (o *Organization) GetSsoActive() bool`

GetSsoActive returns the SsoActive field if non-nil, zero value otherwise.

### GetSsoActiveOk

`func (o *Organization) GetSsoActiveOk() (*bool, bool)`

GetSsoActiveOk returns a tuple with the SsoActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSsoActive

`func (o *Organization) SetSsoActive(v bool)`

SetSsoActive sets SsoActive field to given value.


### GetDirectorySyncActive

`func (o *Organization) GetDirectorySyncActive() bool`

GetDirectorySyncActive returns the DirectorySyncActive field if non-nil, zero value otherwise.

### GetDirectorySyncActiveOk

`func (o *Organization) GetDirectorySyncActiveOk() (*bool, bool)`

GetDirectorySyncActiveOk returns a tuple with the DirectorySyncActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDirectorySyncActive

`func (o *Organization) SetDirectorySyncActive(v bool)`

SetDirectorySyncActive sets DirectorySyncActive field to given value.


### GetCreatedAt

`func (o *Organization) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *Organization) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *Organization) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.


### GetUpdatedAt

`func (o *Organization) GetUpdatedAt() time.Time`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *Organization) GetUpdatedAtOk() (*time.Time, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *Organization) SetUpdatedAt(v time.Time)`

SetUpdatedAt sets UpdatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


