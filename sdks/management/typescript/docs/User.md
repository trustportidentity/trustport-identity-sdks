
# User


## Properties

Name | Type
------------ | -------------
`id` | string
`username` | string
`email` | string
`firstName` | string
`lastName` | string
`status` | string
`isActive` | boolean
`isLocked` | boolean
`lockedUntil` | Date
`lockReason` | string
`emailVerified` | boolean
`phone` | string
`phoneVerified` | boolean
`mfaRequired` | boolean
`lastLoginAt` | Date
`passwordChangedAt` | Date
`attributes` | { [key: string]: any; }
`externalId` | string
`source` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { User } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "username": null,
  "email": null,
  "firstName": null,
  "lastName": null,
  "status": null,
  "isActive": null,
  "isLocked": null,
  "lockedUntil": null,
  "lockReason": null,
  "emailVerified": null,
  "phone": null,
  "phoneVerified": null,
  "mfaRequired": null,
  "lastLoginAt": null,
  "passwordChangedAt": null,
  "attributes": null,
  "externalId": null,
  "source": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies User

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as User
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


