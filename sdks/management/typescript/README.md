# @trustport/identity-management@0.1.0

A TypeScript SDK client for the id.trustportidentity.com API.

## Usage

First, install the SDK from npm.

```bash
npm install @trustport/identity-management --save
```

Next, try it out.


```ts
import {
  Configuration,
  ApiKeysApi,
} from '@trustport/identity-management';
import type { CreateApiKeyRequest } from '@trustport/identity-management';

async function example() {
  console.log("🚀 Testing @trustport/identity-management SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  const body = {
    // CreateApiKeyInput
    createApiKeyInput: ...,
  } satisfies CreateApiKeyRequest;

  try {
    const data = await api.createApiKey(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```


## Documentation

### API Endpoints

All URIs are relative to *https://id.trustportidentity.com*

| Class | Method | HTTP request | Description
| ----- | ------ | ------------ | -------------
*ApiKeysApi* | [**createApiKey**](docs/ApiKeysApi.md#createapikey) | **POST** /api/v1/api-keys | Create an API key. &#x60;secret_key&#x60; is returned once, in this response.
*ApiKeysApi* | [**deleteApiKey**](docs/ApiKeysApi.md#deleteapikey) | **DELETE** /api/v1/api-keys/{apiKeyId} | Revoke an API key
*ApiKeysApi* | [**listApiKeys**](docs/ApiKeysApi.md#listapikeys) | **GET** /api/v1/api-keys | List API keys (the secret is never shown again)
*ApplicationsApi* | [**createApplication**](docs/ApplicationsApi.md#createapplication) | **POST** /api/v1/applications | Register an application. The client secret is returned once, in this response.
*ApplicationsApi* | [**deleteApplication**](docs/ApplicationsApi.md#deleteapplication) | **DELETE** /api/v1/applications/{applicationId} | Delete an application
*ApplicationsApi* | [**listApplications**](docs/ApplicationsApi.md#listapplications) | **GET** /api/v1/applications | List applications (OAuth / OIDC clients)
*ApplicationsApi* | [**rotateApplicationSecret**](docs/ApplicationsApi.md#rotateapplicationsecret) | **POST** /api/v1/applications/{applicationId}/rotate-secret | Issue a new client secret (returned once). The old secret stops working.
*ApplicationsApi* | [**updateApplication**](docs/ApplicationsApi.md#updateapplication) | **PATCH** /api/v1/applications/{applicationId} | Update an application\&#39;s name or redirect URIs
*DomainsApi* | [**createCustomDomain**](docs/DomainsApi.md#createcustomdomain) | **POST** /api/v1/domains | Add a custom domain; returns the DNS records to publish
*DomainsApi* | [**deleteCustomDomain**](docs/DomainsApi.md#deletecustomdomain) | **DELETE** /api/v1/domains/{domainId} | Remove a custom domain
*DomainsApi* | [**listCustomDomains**](docs/DomainsApi.md#listcustomdomains) | **GET** /api/v1/domains | List custom domains
*DomainsApi* | [**verifyCustomDomain**](docs/DomainsApi.md#verifycustomdomain) | **POST** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain
*GroupsApi* | [**addGroupMember**](docs/GroupsApi.md#addgroupmember) | **POST** /api/v1/groups/{groupId}/members | Add a user to a group
*GroupsApi* | [**createGroup**](docs/GroupsApi.md#creategroup) | **POST** /api/v1/groups | Create a group
*GroupsApi* | [**deleteGroup**](docs/GroupsApi.md#deletegroup) | **DELETE** /api/v1/groups/{groupId} | Delete a group
*GroupsApi* | [**listGroupMembers**](docs/GroupsApi.md#listgroupmembers) | **GET** /api/v1/groups/{groupId}/members | List the members of a group
*GroupsApi* | [**listGroups**](docs/GroupsApi.md#listgroups) | **GET** /api/v1/groups | List groups
*GroupsApi* | [**removeGroupMember**](docs/GroupsApi.md#removegroupmember) | **DELETE** /api/v1/groups/{groupId}/members/{userId} | Remove a user from a group
*InvitationsApi* | [**createInvitation**](docs/InvitationsApi.md#createinvitation) | **POST** /api/v1/invitations | Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.
*InvitationsApi* | [**listInvitations**](docs/InvitationsApi.md#listinvitations) | **GET** /api/v1/invitations | List invitations
*InvitationsApi* | [**resendInvitation**](docs/InvitationsApi.md#resendinvitation) | **POST** /api/v1/invitations/{invitationId}/resend | Send the invitation email again
*InvitationsApi* | [**revokeInvitation**](docs/InvitationsApi.md#revokeinvitation) | **DELETE** /api/v1/invitations/{invitationId} | Revoke an invitation
*OrganizationsApi* | [**createOrganization**](docs/OrganizationsApi.md#createorganization) | **POST** /api/v1/organizations | Create an organization (at most 20 domains, validated and lower-cased)
*OrganizationsApi* | [**deleteOrganization**](docs/OrganizationsApi.md#deleteorganization) | **DELETE** /api/v1/organizations/{organizationId} | Delete an organization
*OrganizationsApi* | [**listOrganizations**](docs/OrganizationsApi.md#listorganizations) | **GET** /api/v1/organizations | List organizations
*OrganizationsApi* | [**updateOrganization**](docs/OrganizationsApi.md#updateorganization) | **PATCH** /api/v1/organizations/{organizationId} | Update an organization (only the fields you send change)
*RolesApi* | [**assignRole**](docs/RolesApi.md#assignrole) | **POST** /api/v1/roles/assign | Assign a role to a user (optionally until a date). Only an owner can grant ownership.
*RolesApi* | [**createRole**](docs/RolesApi.md#createrole) | **POST** /api/v1/roles | Create a role
*RolesApi* | [**deleteRole**](docs/RolesApi.md#deleterole) | **DELETE** /api/v1/roles/{roleId} | Delete a role
*RolesApi* | [**listRoles**](docs/RolesApi.md#listroles) | **GET** /api/v1/roles | List roles
*RolesApi* | [**listUserRoles**](docs/RolesApi.md#listuserroles) | **GET** /api/v1/users/{userId}/roles | List the roles assigned to a user
*RolesApi* | [**revokeRole**](docs/RolesApi.md#revokerole) | **POST** /api/v1/roles/revoke | Revoke a role from a user
*UsersApi* | [**createUser**](docs/UsersApi.md#createuser) | **POST** /api/v1/users | Create a user
*UsersApi* | [**deleteUser**](docs/UsersApi.md#deleteuser) | **DELETE** /api/v1/users/{userId} | Delete a user (soft delete; sessions are revoked)
*UsersApi* | [**getUser**](docs/UsersApi.md#getuser) | **GET** /api/v1/users/{userId} | Get a user
*UsersApi* | [**listUsers**](docs/UsersApi.md#listusers) | **GET** /api/v1/users | List users
*UsersApi* | [**updateUser**](docs/UsersApi.md#updateuser) | **PATCH** /api/v1/users/{userId} | Update a user (only the fields you send change)


### Models

- [AddGroupMemberInput](docs/AddGroupMemberInput.md)
- [ApiError](docs/ApiError.md)
- [ApiErrorDetail](docs/ApiErrorDetail.md)
- [ApiKey](docs/ApiKey.md)
- [ApiKeyEnvelope](docs/ApiKeyEnvelope.md)
- [ApiKeyList](docs/ApiKeyList.md)
- [Application](docs/Application.md)
- [ApplicationEnvelope](docs/ApplicationEnvelope.md)
- [ApplicationList](docs/ApplicationList.md)
- [AssignRoleInput](docs/AssignRoleInput.md)
- [CreateApiKeyInput](docs/CreateApiKeyInput.md)
- [CreateApplicationInput](docs/CreateApplicationInput.md)
- [CreateCustomDomainInput](docs/CreateCustomDomainInput.md)
- [CreateGroupInput](docs/CreateGroupInput.md)
- [CreateInvitationInput](docs/CreateInvitationInput.md)
- [CreateOrganizationInput](docs/CreateOrganizationInput.md)
- [CreateRoleInput](docs/CreateRoleInput.md)
- [CreateUserInput](docs/CreateUserInput.md)
- [CustomDomain](docs/CustomDomain.md)
- [CustomDomainEnvelope](docs/CustomDomainEnvelope.md)
- [CustomDomainList](docs/CustomDomainList.md)
- [Group](docs/Group.md)
- [GroupEnvelope](docs/GroupEnvelope.md)
- [GroupList](docs/GroupList.md)
- [GroupMember](docs/GroupMember.md)
- [GroupMemberList](docs/GroupMemberList.md)
- [Invitation](docs/Invitation.md)
- [InvitationEnvelope](docs/InvitationEnvelope.md)
- [InvitationList](docs/InvitationList.md)
- [Organization](docs/Organization.md)
- [OrganizationEnvelope](docs/OrganizationEnvelope.md)
- [OrganizationList](docs/OrganizationList.md)
- [RevokeRoleInput](docs/RevokeRoleInput.md)
- [Role](docs/Role.md)
- [RoleEnvelope](docs/RoleEnvelope.md)
- [RoleList](docs/RoleList.md)
- [UpdateOrganizationInput](docs/UpdateOrganizationInput.md)
- [UpdateUserInput](docs/UpdateUserInput.md)
- [User](docs/User.md)
- [UserEnvelope](docs/UserEnvelope.md)
- [UserList](docs/UserList.md)

### Authorization


Authentication schemes defined for the API:
<a id="bearerAuth"></a>
#### bearerAuth


- **Type**: HTTP Bearer Token authentication

## About

This TypeScript SDK client supports the [Fetch API](https://fetch.spec.whatwg.org/)
and is automatically generated by the
[OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `0.1.0`
- Package version: `0.1.0`
- Generator version: `7.26.0`
- Build package: `org.openapitools.codegen.languages.TypeScriptFetchClientCodegen`

The generated npm module supports the following:

- Environments
  * Node.js
  * Webpack
  * Browserify
- Language levels
  * ES5 - you must have a Promises/A+ library installed
  * ES6
- Module systems
  * CommonJS
  * ES6 module system


## Development

### Building

To build the TypeScript source code, you need to have Node.js and npm installed.
After cloning the repository, navigate to the project directory and run:

```bash
npm install
npm run build
```

### Publishing

Once you've built the package, you can publish it to npm:

```bash
npm publish
```

## License

[]()
