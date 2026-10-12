# CreateRoleInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**description** | **str** |  | [optional] 
**permissions** | **List[str]** |  | [optional] 

## Example

```python
from trustport_identity_management.models.create_role_input import CreateRoleInput

# TODO update the JSON string below
json = "{}"
# create an instance of CreateRoleInput from a JSON string
create_role_input_instance = CreateRoleInput.from_json(json)
# print the JSON string representation of the object
print(CreateRoleInput.to_json())

# convert the object into a dict
create_role_input_dict = create_role_input_instance.to_dict()
# create an instance of CreateRoleInput from a dict
create_role_input_from_dict = CreateRoleInput.from_dict(create_role_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


