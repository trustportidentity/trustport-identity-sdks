# OrganizationEnvelope


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Organization**](Organization.md) |  | 

## Example

```python
from trustport_identity_management.models.organization_envelope import OrganizationEnvelope

# TODO update the JSON string below
json = "{}"
# create an instance of OrganizationEnvelope from a JSON string
organization_envelope_instance = OrganizationEnvelope.from_json(json)
# print the JSON string representation of the object
print(OrganizationEnvelope.to_json())

# convert the object into a dict
organization_envelope_dict = organization_envelope_instance.to_dict()
# create an instance of OrganizationEnvelope from a dict
organization_envelope_from_dict = OrganizationEnvelope.from_dict(organization_envelope_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


