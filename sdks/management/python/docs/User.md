# User


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **UUID** |  | 
**username** | **str** |  | 
**email** | **str** |  | 
**first_name** | **str** |  | [optional] 
**last_name** | **str** |  | [optional] 
**status** | **str** |  | 
**is_active** | **bool** |  | 
**is_locked** | **bool** |  | 
**locked_until** | **datetime** |  | [optional] 
**lock_reason** | **str** |  | [optional] 
**email_verified** | **bool** |  | 
**phone** | **str** |  | [optional] 
**phone_verified** | **bool** |  | 
**mfa_required** | **bool** |  | 
**last_login_at** | **datetime** |  | [optional] 
**password_changed_at** | **datetime** |  | [optional] 
**attributes** | **Dict[str, object]** |  | 
**external_id** | **str** |  | [optional] 
**source** | **str** | How the account was created (for example local, ldap, scim, google). | 
**created_at** | **datetime** |  | 
**updated_at** | **datetime** |  | 

## Example

```python
from trustport_identity_management.models.user import User

# TODO update the JSON string below
json = "{}"
# create an instance of User from a JSON string
user_instance = User.from_json(json)
# print the JSON string representation of the object
print(User.to_json())

# convert the object into a dict
user_dict = user_instance.to_dict()
# create an instance of User from a dict
user_from_dict = User.from_dict(user_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


