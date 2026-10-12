# ApplicationEnvelope


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Application**](Application.md) |  | 

## Example

```python
from trustport_identity_management.models.application_envelope import ApplicationEnvelope

# TODO update the JSON string below
json = "{}"
# create an instance of ApplicationEnvelope from a JSON string
application_envelope_instance = ApplicationEnvelope.from_json(json)
# print the JSON string representation of the object
print(ApplicationEnvelope.to_json())

# convert the object into a dict
application_envelope_dict = application_envelope_instance.to_dict()
# create an instance of ApplicationEnvelope from a dict
application_envelope_from_dict = ApplicationEnvelope.from_dict(application_envelope_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


