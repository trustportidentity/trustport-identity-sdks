
# CreateRoleInput


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`permissions` | Array&lt;string&gt;

## Example

```typescript
import type { CreateRoleInput } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "permissions": null,
} satisfies CreateRoleInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateRoleInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


