# UpdateOrganizationInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**domains** | **List[str]** |  | [optional] 
**sso_provider** | **str** | Empty string clears it. | [optional] 
**sso_active** | **bool** |  | [optional] 
**directory_sync_active** | **bool** |  | [optional] 

## Example

```python
from trustport_identity_management.models.update_organization_input import UpdateOrganizationInput

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateOrganizationInput from a JSON string
update_organization_input_instance = UpdateOrganizationInput.from_json(json)
# print the JSON string representation of the object
print(UpdateOrganizationInput.to_json())

# convert the object into a dict
update_organization_input_dict = update_organization_input_instance.to_dict()
# create an instance of UpdateOrganizationInput from a dict
update_organization_input_from_dict = UpdateOrganizationInput.from_dict(update_organization_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


