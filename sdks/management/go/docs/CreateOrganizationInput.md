# CreateOrganizationInput

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | **string** |  | 
**Domains** | Pointer to **[]string** |  | [optional] 
**SsoProvider** | Pointer to **string** |  | [optional] 

## Methods

### NewCreateOrganizationInput

`func NewCreateOrganizationInput(name string, ) *CreateOrganizationInput`

NewCreateOrganizationInput instantiates a new CreateOrganizationInput object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateOrganizationInputWithDefaults

`func NewCreateOrganizationInputWithDefaults() *CreateOrganizationInput`

NewCreateOrganizationInputWithDefaults instantiates a new CreateOrganizationInput object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *CreateOrganizationInput) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *CreateOrganizationInput) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *CreateOrganizationInput) SetName(v string)`

SetName sets Name field to given value.


### GetDomains

`func (o *CreateOrganizationInput) GetDomains() []string`

GetDomains returns the Domains field if non-nil, zero value otherwise.

### GetDomainsOk

`func (o *CreateOrganizationInput) GetDomainsOk() (*[]string, bool)`

GetDomainsOk returns a tuple with the Domains field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomains

`func (o *CreateOrganizationInput) SetDomains(v []string)`

SetDomains sets Domains field to given value.

### HasDomains

`func (o *CreateOrganizationInput) HasDomains() bool`

HasDomains returns a boolean if a field has been set.

### GetSsoProvider

`func (o *CreateOrganizationInput) GetSsoProvider() string`

GetSsoProvider returns the SsoProvider field if non-nil, zero value otherwise.

### GetSsoProviderOk

`func (o *CreateOrganizationInput) GetSsoProviderOk() (*string, bool)`

GetSsoProviderOk returns a tuple with the SsoProvider field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSsoProvider

`func (o *CreateOrganizationInput) SetSsoProvider(v string)`

SetSsoProvider sets SsoProvider field to given value.

### HasSsoProvider

`func (o *CreateOrganizationInput) HasSsoProvider() bool`

HasSsoProvider returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


