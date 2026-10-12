# CreateInvitationInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **str** |  | 
**role_name** | **str** | Must be an existing role. Only an owner can invite someone as owner. | [optional] 

## Example

```python
from trustport_identity_management.models.create_invitation_input import CreateInvitationInput

# TODO update the JSON string below
json = "{}"
# create an instance of CreateInvitationInput from a JSON string
create_invitation_input_instance = CreateInvitationInput.from_json(json)
# print the JSON string representation of the object
print(CreateInvitationInput.to_json())

# convert the object into a dict
create_invitation_input_dict = create_invitation_input_instance.to_dict()
# create an instance of CreateInvitationInput from a dict
create_invitation_input_from_dict = CreateInvitationInput.from_dict(create_invitation_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


