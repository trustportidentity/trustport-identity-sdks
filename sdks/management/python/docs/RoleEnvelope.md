# RoleEnvelope


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Role**](Role.md) |  | 

## Example

```python
from trustport_identity_management.models.role_envelope import RoleEnvelope

# TODO update the JSON string below
json = "{}"
# create an instance of RoleEnvelope from a JSON string
role_envelope_instance = RoleEnvelope.from_json(json)
# print the JSON string representation of the object
print(RoleEnvelope.to_json())

# convert the object into a dict
role_envelope_dict = role_envelope_instance.to_dict()
# create an instance of RoleEnvelope from a dict
role_envelope_from_dict = RoleEnvelope.from_dict(role_envelope_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


