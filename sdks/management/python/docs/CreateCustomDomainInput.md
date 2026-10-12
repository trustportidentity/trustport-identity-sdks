# CreateCustomDomainInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**domain** | **str** |  | 
**organization_id** | **UUID** |  | [optional] 

## Example

```python
from trustport_identity_management.models.create_custom_domain_input import CreateCustomDomainInput

# TODO update the JSON string below
json = "{}"
# create an instance of CreateCustomDomainInput from a JSON string
create_custom_domain_input_instance = CreateCustomDomainInput.from_json(json)
# print the JSON string representation of the object
print(CreateCustomDomainInput.to_json())

# convert the object into a dict
create_custom_domain_input_dict = create_custom_domain_input_instance.to_dict()
# create an instance of CreateCustomDomainInput from a dict
create_custom_domain_input_from_dict = CreateCustomDomainInput.from_dict(create_custom_domain_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


