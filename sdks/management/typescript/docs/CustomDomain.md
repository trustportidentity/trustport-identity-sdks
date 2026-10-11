
# CustomDomain


## Properties

Name | Type
------------ | -------------
`id` | string
`domain` | string
`organizationId` | string
`verificationStatus` | string
`txtHost` | string
`txtRecord` | string
`cnameRecord` | string
`verifiedAt` | Date
`createdAt` | Date

## Example

```typescript
import type { CustomDomain } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "domain": null,
  "organizationId": null,
  "verificationStatus": null,
  "txtHost": null,
  "txtRecord": null,
  "cnameRecord": null,
  "verifiedAt": null,
  "createdAt": null,
} satisfies CustomDomain

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CustomDomain
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


