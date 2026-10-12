# InvitationEnvelope


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Invitation**](Invitation.md) |  | 

## Example

```python
from trustport_identity_management.models.invitation_envelope import InvitationEnvelope

# TODO update the JSON string below
json = "{}"
# create an instance of InvitationEnvelope from a JSON string
invitation_envelope_instance = InvitationEnvelope.from_json(json)
# print the JSON string representation of the object
print(InvitationEnvelope.to_json())

# convert the object into a dict
invitation_envelope_dict = invitation_envelope_instance.to_dict()
# create an instance of InvitationEnvelope from a dict
invitation_envelope_from_dict = InvitationEnvelope.from_dict(invitation_envelope_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


