# AddGroupMemberInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_id** | **UUID** |  | 

## Example

```python
from trustport_identity_management.models.add_group_member_input import AddGroupMemberInput

# TODO update the JSON string below
json = "{}"
# create an instance of AddGroupMemberInput from a JSON string
add_group_member_input_instance = AddGroupMemberInput.from_json(json)
# print the JSON string representation of the object
print(AddGroupMemberInput.to_json())

# convert the object into a dict
add_group_member_input_dict = add_group_member_input_instance.to_dict()
# create an instance of AddGroupMemberInput from a dict
add_group_member_input_from_dict = AddGroupMemberInput.from_dict(add_group_member_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


