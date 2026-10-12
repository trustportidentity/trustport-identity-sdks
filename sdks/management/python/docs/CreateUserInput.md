# CreateUserInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**username** | **str** |  | 
**email** | **str** |  | 
**password** | **str** | Hashed server-side; never stored or logged in clear. | 
**phone** | **str** |  | [optional] 
**first_name** | **str** |  | [optional] 
**last_name** | **str** |  | [optional] 

## Example

```python
from trustport_identity_management.models.create_user_input import CreateUserInput

# TODO update the JSON string below
json = "{}"
# create an instance of CreateUserInput from a JSON string
create_user_input_instance = CreateUserInput.from_json(json)
# print the JSON string representation of the object
print(CreateUserInput.to_json())

# convert the object into a dict
create_user_input_dict = create_user_input_instance.to_dict()
# create an instance of CreateUserInput from a dict
create_user_input_from_dict = CreateUserInput.from_dict(create_user_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


