# ApiKeyEnvelope


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**ApiKey**](ApiKey.md) |  | 

## Example

```python
from trustport_identity_management.models.api_key_envelope import ApiKeyEnvelope

# TODO update the JSON string below
json = "{}"
# create an instance of ApiKeyEnvelope from a JSON string
api_key_envelope_instance = ApiKeyEnvelope.from_json(json)
# print the JSON string representation of the object
print(ApiKeyEnvelope.to_json())

# convert the object into a dict
api_key_envelope_dict = api_key_envelope_instance.to_dict()
# create an instance of ApiKeyEnvelope from a dict
api_key_envelope_from_dict = ApiKeyEnvelope.from_dict(api_key_envelope_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


