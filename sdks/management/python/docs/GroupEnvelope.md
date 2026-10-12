# GroupEnvelope


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Group**](Group.md) |  | 

## Example

```python
from trustport_identity_management.models.group_envelope import GroupEnvelope

# TODO update the JSON string below
json = "{}"
# create an instance of GroupEnvelope from a JSON string
group_envelope_instance = GroupEnvelope.from_json(json)
# print the JSON string representation of the object
print(GroupEnvelope.to_json())

# convert the object into a dict
group_envelope_dict = group_envelope_instance.to_dict()
# create an instance of GroupEnvelope from a dict
group_envelope_from_dict = GroupEnvelope.from_dict(group_envelope_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


