# CreateApplicationInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**redirect_uris** | **List[str]** |  | [optional] 

## Example

```python
from trustport_identity_management.models.create_application_input import CreateApplicationInput

# TODO update the JSON string below
json = "{}"
# create an instance of CreateApplicationInput from a JSON string
create_application_input_instance = CreateApplicationInput.from_json(json)
# print the JSON string representation of the object
print(CreateApplicationInput.to_json())

# convert the object into a dict
create_application_input_dict = create_application_input_instance.to_dict()
# create an instance of CreateApplicationInput from a dict
create_application_input_from_dict = CreateApplicationInput.from_dict(create_application_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


