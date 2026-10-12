# UpdateOrganizationInput

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | Pointer to **string** |  | [optional] 
**Domains** | Pointer to **[]string** |  | [optional] 
**SsoProvider** | Pointer to **string** | Empty string clears it. | [optional] 
**SsoActive** | Pointer to **bool** |  | [optional] 
**DirectorySyncActive** | Pointer to **bool** |  | [optional] 

## Methods

### NewUpdateOrganizationInput

`func NewUpdateOrganizationInput() *UpdateOrganizationInput`

NewUpdateOrganizationInput instantiates a new UpdateOrganizationInput object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUpdateOrganizationInputWithDefaults

`func NewUpdateOrganizationInputWithDefaults() *UpdateOrganizationInput`

NewUpdateOrganizationInputWithDefaults instantiates a new UpdateOrganizationInput object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *UpdateOrganizationInput) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *UpdateOrganizationInput) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *UpdateOrganizationInput) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *UpdateOrganizationInput) HasName() bool`

HasName returns a boolean if a field has been set.

### GetDomains

`func (o *UpdateOrganizationInput) GetDomains() []string`

GetDomains returns the Domains field if non-nil, zero value otherwise.

### GetDomainsOk

`func (o *UpdateOrganizationInput) GetDomainsOk() (*[]string, bool)`

GetDomainsOk returns a tuple with the Domains field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomains

`func (o *UpdateOrganizationInput) SetDomains(v []string)`

SetDomains sets Domains field to given value.

### HasDomains

`func (o *UpdateOrganizationInput) HasDomains() bool`

HasDomains returns a boolean if a field has been set.

### GetSsoProvider

`func (o *UpdateOrganizationInput) GetSsoProvider() string`

GetSsoProvider returns the SsoProvider field if non-nil, zero value otherwise.

### GetSsoProviderOk

`func (o *UpdateOrganizationInput) GetSsoProviderOk() (*string, bool)`

GetSsoProviderOk returns a tuple with the SsoProvider field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSsoProvider

`func (o *UpdateOrganizationInput) SetSsoProvider(v string)`

SetSsoProvider sets SsoProvider field to given value.

### HasSsoProvider

`func (o *UpdateOrganizationInput) HasSsoProvider() bool`

HasSsoProvider returns a boolean if a field has been set.

### GetSsoActive

`func (o *UpdateOrganizationInput) GetSsoActive() bool`

GetSsoActive returns the SsoActive field if non-nil, zero value otherwise.

### GetSsoActiveOk

`func (o *UpdateOrganizationInput) GetSsoActiveOk() (*bool, bool)`

GetSsoActiveOk returns a tuple with the SsoActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSsoActive

`func (o *UpdateOrganizationInput) SetSsoActive(v bool)`

SetSsoActive sets SsoActive field to given value.

### HasSsoActive

`func (o *UpdateOrganizationInput) HasSsoActive() bool`

HasSsoActive returns a boolean if a field has been set.

### GetDirectorySyncActive

`func (o *UpdateOrganizationInput) GetDirectorySyncActive() bool`

GetDirectorySyncActive returns the DirectorySyncActive field if non-nil, zero value otherwise.

### GetDirectorySyncActiveOk

`func (o *UpdateOrganizationInput) GetDirectorySyncActiveOk() (*bool, bool)`

GetDirectorySyncActiveOk returns a tuple with the DirectorySyncActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDirectorySyncActive

`func (o *UpdateOrganizationInput) SetDirectorySyncActive(v bool)`

SetDirectorySyncActive sets DirectorySyncActive field to given value.

### HasDirectorySyncActive

`func (o *UpdateOrganizationInput) HasDirectorySyncActive() bool`

HasDirectorySyncActive returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


