
# ApiKey


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`keyPrefix` | string
`secretKey` | string
`keyType` | string
`environment` | string
`lastUsedAt` | Date
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { ApiKey } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "keyPrefix": null,
  "secretKey": null,
  "keyType": null,
  "environment": null,
  "lastUsedAt": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies ApiKey

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiKey
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


