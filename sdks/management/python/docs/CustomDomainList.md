# CustomDomainList


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[CustomDomain]**](CustomDomain.md) |  | 

## Example

```python
from trustport_identity_management.models.custom_domain_list import CustomDomainList

# TODO update the JSON string below
json = "{}"
# create an instance of CustomDomainList from a JSON string
custom_domain_list_instance = CustomDomainList.from_json(json)
# print the JSON string representation of the object
print(CustomDomainList.to_json())

# convert the object into a dict
custom_domain_list_dict = custom_domain_list_instance.to_dict()
# create an instance of CustomDomainList from a dict
custom_domain_list_from_dict = CustomDomainList.from_dict(custom_domain_list_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


