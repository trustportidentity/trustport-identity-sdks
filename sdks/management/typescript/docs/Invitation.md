
# Invitation


## Properties

Name | Type
------------ | -------------
`id` | string
`email` | string
`roleName` | string
`invitedBy` | string
`status` | string
`expiresAt` | Date
`acceptedAt` | Date
`createdAt` | Date

## Example

```typescript
import type { Invitation } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "roleName": null,
  "invitedBy": null,
  "status": null,
  "expiresAt": null,
  "acceptedAt": null,
  "createdAt": null,
} satisfies Invitation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Invitation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


