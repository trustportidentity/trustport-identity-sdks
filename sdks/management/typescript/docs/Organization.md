
# Organization


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`domains` | Array&lt;string&gt;
`ssoProvider` | string
`ssoActive` | boolean
`directorySyncActive` | boolean
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Organization } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "domains": null,
  "ssoProvider": null,
  "ssoActive": null,
  "directorySyncActive": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Organization

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Organization
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


