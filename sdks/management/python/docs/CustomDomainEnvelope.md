# CustomDomainEnvelope


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**CustomDomain**](CustomDomain.md) |  | 

## Example

```python
from trustport_identity_management.models.custom_domain_envelope import CustomDomainEnvelope

# TODO update the JSON string below
json = "{}"
# create an instance of CustomDomainEnvelope from a JSON string
custom_domain_envelope_instance = CustomDomainEnvelope.from_json(json)
# print the JSON string representation of the object
print(CustomDomainEnvelope.to_json())

# convert the object into a dict
custom_domain_envelope_dict = custom_domain_envelope_instance.to_dict()
# create an instance of CustomDomainEnvelope from a dict
custom_domain_envelope_from_dict = CustomDomainEnvelope.from_dict(custom_domain_envelope_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


