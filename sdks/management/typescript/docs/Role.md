
# Role


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`isSystem` | boolean
`permissions` | Array&lt;string&gt;
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Role } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "description": null,
  "isSystem": null,
  "permissions": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Role

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Role
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


