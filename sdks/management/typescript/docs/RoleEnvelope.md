
# RoleEnvelope


## Properties

Name | Type
------------ | -------------
`data` | [Role](Role.md)

## Example

```typescript
import type { RoleEnvelope } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "data": null,
} satisfies RoleEnvelope

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoleEnvelope
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


