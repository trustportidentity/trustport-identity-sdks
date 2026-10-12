# CreateOrganizationInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**domains** | **List[str]** |  | [optional] 
**sso_provider** | **str** |  | [optional] 

## Example

```python
from trustport_identity_management.models.create_organization_input import CreateOrganizationInput

# TODO update the JSON string below
json = "{}"
# create an instance of CreateOrganizationInput from a JSON string
create_organization_input_instance = CreateOrganizationInput.from_json(json)
# print the JSON string representation of the object
print(CreateOrganizationInput.to_json())

# convert the object into a dict
create_organization_input_dict = create_organization_input_instance.to_dict()
# create an instance of CreateOrganizationInput from a dict
create_organization_input_from_dict = CreateOrganizationInput.from_dict(create_organization_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


