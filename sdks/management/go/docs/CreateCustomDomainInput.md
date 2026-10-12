# CreateCustomDomainInput

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Domain** | **string** |  | 
**OrganizationId** | Pointer to **string** |  | [optional] 

## Methods

### NewCreateCustomDomainInput

`func NewCreateCustomDomainInput(domain string, ) *CreateCustomDomainInput`

NewCreateCustomDomainInput instantiates a new CreateCustomDomainInput object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateCustomDomainInputWithDefaults

`func NewCreateCustomDomainInputWithDefaults() *CreateCustomDomainInput`

NewCreateCustomDomainInputWithDefaults instantiates a new CreateCustomDomainInput object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDomain

`func (o *CreateCustomDomainInput) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *CreateCustomDomainInput) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *CreateCustomDomainInput) SetDomain(v string)`

SetDomain sets Domain field to given value.


### GetOrganizationId

`func (o *CreateCustomDomainInput) GetOrganizationId() string`

GetOrganizationId returns the OrganizationId field if non-nil, zero value otherwise.

### GetOrganizationIdOk

`func (o *CreateCustomDomainInput) GetOrganizationIdOk() (*string, bool)`

GetOrganizationIdOk returns a tuple with the OrganizationId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOrganizationId

`func (o *CreateCustomDomainInput) SetOrganizationId(v string)`

SetOrganizationId sets OrganizationId field to given value.

### HasOrganizationId

`func (o *CreateCustomDomainInput) HasOrganizationId() bool`

HasOrganizationId returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


