# RevokeRoleInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_id** | **UUID** |  | 
**role_name** | **str** |  | 

## Example

```python
from trustport_identity_management.models.revoke_role_input import RevokeRoleInput

# TODO update the JSON string below
json = "{}"
# create an instance of RevokeRoleInput from a JSON string
revoke_role_input_instance = RevokeRoleInput.from_json(json)
# print the JSON string representation of the object
print(RevokeRoleInput.to_json())

# convert the object into a dict
revoke_role_input_dict = revoke_role_input_instance.to_dict()
# create an instance of RevokeRoleInput from a dict
revoke_role_input_from_dict = RevokeRoleInput.from_dict(revoke_role_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


