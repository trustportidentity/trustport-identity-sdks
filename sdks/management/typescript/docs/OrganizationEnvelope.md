
# OrganizationEnvelope


## Properties

Name | Type
------------ | -------------
`data` | [Organization](Organization.md)

## Example

```typescript
import type { OrganizationEnvelope } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "data": null,
} satisfies OrganizationEnvelope

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrganizationEnvelope
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


