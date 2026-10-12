# CreateApiKeyInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**key_type** | **str** |  | 
**environment** | **str** |  | 

## Example

```python
from trustport_identity_management.models.create_api_key_input import CreateApiKeyInput

# TODO update the JSON string below
json = "{}"
# create an instance of CreateApiKeyInput from a JSON string
create_api_key_input_instance = CreateApiKeyInput.from_json(json)
# print the JSON string representation of the object
print(CreateApiKeyInput.to_json())

# convert the object into a dict
create_api_key_input_dict = create_api_key_input_instance.to_dict()
# create an instance of CreateApiKeyInput from a dict
create_api_key_input_from_dict = CreateApiKeyInput.from_dict(create_api_key_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


