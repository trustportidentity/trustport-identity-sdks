
# Application


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`clientId` | string
`clientSecret` | string
`isDefault` | boolean
`redirectUris` | Array&lt;string&gt;
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Application } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "clientId": null,
  "clientSecret": null,
  "isDefault": null,
  "redirectUris": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Application

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Application
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


