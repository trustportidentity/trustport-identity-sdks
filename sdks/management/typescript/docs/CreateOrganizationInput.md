
# CreateOrganizationInput


## Properties

Name | Type
------------ | -------------
`name` | string
`domains` | Array&lt;string&gt;
`ssoProvider` | string

## Example

```typescript
import type { CreateOrganizationInput } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "domains": null,
  "ssoProvider": null,
} satisfies CreateOrganizationInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateOrganizationInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


