
# RevokeRoleInput


## Properties

Name | Type
------------ | -------------
`userId` | string
`roleName` | string

## Example

```typescript
import type { RevokeRoleInput } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "roleName": null,
} satisfies RevokeRoleInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RevokeRoleInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


