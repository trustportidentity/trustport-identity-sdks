# AssignRoleInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_id** | **UUID** |  | 
**role_name** | **str** |  | 
**expires_at** | **datetime** |  | [optional] 

## Example

```python
from trustport_identity_management.models.assign_role_input import AssignRoleInput

# TODO update the JSON string below
json = "{}"
# create an instance of AssignRoleInput from a JSON string
assign_role_input_instance = AssignRoleInput.from_json(json)
# print the JSON string representation of the object
print(AssignRoleInput.to_json())

# convert the object into a dict
assign_role_input_dict = assign_role_input_instance.to_dict()
# create an instance of AssignRoleInput from a dict
assign_role_input_from_dict = AssignRoleInput.from_dict(assign_role_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


