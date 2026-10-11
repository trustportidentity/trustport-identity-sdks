
# UserEnvelope


## Properties

Name | Type
------------ | -------------
`data` | [User](User.md)

## Example

```typescript
import type { UserEnvelope } from '@trustport/identity-management'

// TODO: Update the object below with actual values
const example = {
  "data": null,
} satisfies UserEnvelope

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserEnvelope
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


