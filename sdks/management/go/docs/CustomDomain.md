# CustomDomain

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**Domain** | **string** |  | 
**OrganizationId** | Pointer to **string** |  | [optional] 
**VerificationStatus** | **string** |  | 
**TxtHost** | Pointer to **string** |  | [optional] 
**TxtRecord** | **string** |  | 
**CnameRecord** | **string** |  | 
**VerifiedAt** | Pointer to **time.Time** |  | [optional] 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewCustomDomain

`func NewCustomDomain(id string, domain string, verificationStatus string, txtRecord string, cnameRecord string, createdAt time.Time, ) *CustomDomain`

NewCustomDomain instantiates a new CustomDomain object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCustomDomainWithDefaults

`func NewCustomDomainWithDefaults() *CustomDomain`

NewCustomDomainWithDefaults instantiates a new CustomDomain object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *CustomDomain) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *CustomDomain) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *CustomDomain) SetId(v string)`

SetId sets Id field to given value.


### GetDomain

`func (o *CustomDomain) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *CustomDomain) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *CustomDomain) SetDomain(v string)`

SetDomain sets Domain field to given value.


### GetOrganizationId

`func (o *CustomDomain) GetOrganizationId() string`

GetOrganizationId returns the OrganizationId field if non-nil, zero value otherwise.

### GetOrganizationIdOk

`func (o *CustomDomain) GetOrganizationIdOk() (*string, bool)`

GetOrganizationIdOk returns a tuple with the OrganizationId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOrganizationId

`func (o *CustomDomain) SetOrganizationId(v string)`

SetOrganizationId sets OrganizationId field to given value.

### HasOrganizationId

`func (o *CustomDomain) HasOrganizationId() bool`

HasOrganizationId returns a boolean if a field has been set.

### GetVerificationStatus

`func (o *CustomDomain) GetVerificationStatus() string`

GetVerificationStatus returns the VerificationStatus field if non-nil, zero value otherwise.

### GetVerificationStatusOk

`func (o *CustomDomain) GetVerificationStatusOk() (*string, bool)`

GetVerificationStatusOk returns a tuple with the VerificationStatus field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVerificationStatus

`func (o *CustomDomain) SetVerificationStatus(v string)`

SetVerificationStatus sets VerificationStatus field to given value.


### GetTxtHost

`func (o *CustomDomain) GetTxtHost() string`

GetTxtHost returns the TxtHost field if non-nil, zero value otherwise.

### GetTxtHostOk

`func (o *CustomDomain) GetTxtHostOk() (*string, bool)`

GetTxtHostOk returns a tuple with the TxtHost field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTxtHost

`func (o *CustomDomain) SetTxtHost(v string)`

SetTxtHost sets TxtHost field to given value.

### HasTxtHost

`func (o *CustomDomain) HasTxtHost() bool`

HasTxtHost returns a boolean if a field has been set.

### GetTxtRecord

`func (o *CustomDomain) GetTxtRecord() string`

GetTxtRecord returns the TxtRecord field if non-nil, zero value otherwise.

### GetTxtRecordOk

`func (o *CustomDomain) GetTxtRecordOk() (*string, bool)`

GetTxtRecordOk returns a tuple with the TxtRecord field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTxtRecord

`func (o *CustomDomain) SetTxtRecord(v string)`

SetTxtRecord sets TxtRecord field to given value.


### GetCnameRecord

`func (o *CustomDomain) GetCnameRecord() string`

GetCnameRecord returns the CnameRecord field if non-nil, zero value otherwise.

### GetCnameRecordOk

`func (o *CustomDomain) GetCnameRecordOk() (*string, bool)`

GetCnameRecordOk returns a tuple with the CnameRecord field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCnameRecord

`func (o *CustomDomain) SetCnameRecord(v string)`

SetCnameRecord sets CnameRecord field to given value.


### GetVerifiedAt

`func (o *CustomDomain) GetVerifiedAt() time.Time`

GetVerifiedAt returns the VerifiedAt field if non-nil, zero value otherwise.

### GetVerifiedAtOk

`func (o *CustomDomain) GetVerifiedAtOk() (*time.Time, bool)`

GetVerifiedAtOk returns a tuple with the VerifiedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVerifiedAt

`func (o *CustomDomain) SetVerifiedAt(v time.Time)`

SetVerifiedAt sets VerifiedAt field to given value.

### HasVerifiedAt

`func (o *CustomDomain) HasVerifiedAt() bool`

HasVerifiedAt returns a boolean if a field has been set.

### GetCreatedAt

`func (o *CustomDomain) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *CustomDomain) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *CustomDomain) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


