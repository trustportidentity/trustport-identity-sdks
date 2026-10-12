# CustomDomain


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **UUID** |  | 
**domain** | **str** |  | 
**organization_id** | **UUID** |  | [optional] 
**verification_status** | **str** |  | 
**txt_host** | **str** |  | [optional] 
**txt_record** | **str** |  | 
**cname_record** | **str** |  | 
**verified_at** | **datetime** |  | [optional] 
**created_at** | **datetime** |  | 

## Example

```python
from trustport_identity_management.models.custom_domain import CustomDomain

# TODO update the JSON string below
json = "{}"
# create an instance of CustomDomain from a JSON string
custom_domain_instance = CustomDomain.from_json(json)
# print the JSON string representation of the object
print(CustomDomain.to_json())

# convert the object into a dict
custom_domain_dict = custom_domain_instance.to_dict()
# create an instance of CustomDomain from a dict
custom_domain_from_dict = CustomDomain.from_dict(custom_domain_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


