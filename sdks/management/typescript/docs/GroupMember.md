
# GroupMember


## Properties

Name | Type
------------ | -------------
`userId` | string
`username` | string
`email` | string
`addedAt` | Date

## Example

```typescript
import type { GroupMember } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "username": null,
  "email": null,
  "addedAt": null,
} satisfies GroupMember

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GroupMember
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


