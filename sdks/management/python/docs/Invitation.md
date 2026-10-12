# Invitation


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **UUID** |  | 
**email** | **str** |  | 
**role_name** | **str** |  | 
**invited_by** | **str** |  | 
**status** | **str** |  | 
**expires_at** | **datetime** |  | 
**accepted_at** | **datetime** |  | [optional] 
**created_at** | **datetime** |  | 

## Example

```python
from trustport_identity_management.models.invitation import Invitation

# TODO update the JSON string below
json = "{}"
# create an instance of Invitation from a JSON string
invitation_instance = Invitation.from_json(json)
# print the JSON string representation of the object
print(Invitation.to_json())

# convert the object into a dict
invitation_dict = invitation_instance.to_dict()
# create an instance of Invitation from a dict
invitation_from_dict = Invitation.from_dict(invitation_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


