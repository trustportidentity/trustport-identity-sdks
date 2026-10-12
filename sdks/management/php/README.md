# OpenAPIClient-php

Manage users, roles, groups, organizations, applications (OAuth clients), API keys, invitations and custom domains of a TrustPort Identity tenant.

Authenticate with `Authorization: Bearer <token>` where the token is either a user access token or a **secret API key** (`sk_live_…` / `sk_test_…`).
Single objects are wrapped as `{ \"data\": ... }`; the users list also carries paging fields at the top level.



## Installation & Usage

### Requirements

PHP 8.1 and later.

### Composer

To install the bindings via [Composer](https://getcomposer.org/), add the following to `composer.json`:

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/GIT_USER_ID/GIT_REPO_ID.git"
    }
  ],
  "require": {
    "GIT_USER_ID/GIT_REPO_ID": "*@dev"
  }
}
```

Then run `composer install`

### Manual Installation

Download the files and include `autoload.php`:

```php
<?php
require_once('/path/to/OpenAPIClient-php/vendor/autoload.php');
```

## Getting Started

Please follow the [installation procedure](#installation--usage) and then run the following:

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



// Configure Bearer authorization: bearerAuth
$config = TrustPortIdentityManagement\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new TrustPortIdentityManagement\Api\ApiKeysApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$create_api_key_input = new \TrustPortIdentityManagement\Model\CreateApiKeyInput(); // \TrustPortIdentityManagement\Model\CreateApiKeyInput

try {
    $result = $apiInstance->createApiKey($create_api_key_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ApiKeysApi->createApiKey: ', $e->getMessage(), PHP_EOL;
}

```

## API Endpoints

All URIs are relative to *https://id.trustportidentity.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*ApiKeysApi* | [**createApiKey**](docs/Api/ApiKeysApi.md#createapikey) | **POST** /api/v1/api-keys | Create an API key. &#x60;secret_key&#x60; is returned once, in this response.
*ApiKeysApi* | [**deleteApiKey**](docs/Api/ApiKeysApi.md#deleteapikey) | **DELETE** /api/v1/api-keys/{apiKeyId} | Revoke an API key
*ApiKeysApi* | [**listApiKeys**](docs/Api/ApiKeysApi.md#listapikeys) | **GET** /api/v1/api-keys | List API keys (the secret is never shown again)
*ApplicationsApi* | [**createApplication**](docs/Api/ApplicationsApi.md#createapplication) | **POST** /api/v1/applications | Register an application. The client secret is returned once, in this response.
*ApplicationsApi* | [**deleteApplication**](docs/Api/ApplicationsApi.md#deleteapplication) | **DELETE** /api/v1/applications/{applicationId} | Delete an application
*ApplicationsApi* | [**listApplications**](docs/Api/ApplicationsApi.md#listapplications) | **GET** /api/v1/applications | List applications (OAuth / OIDC clients)
*ApplicationsApi* | [**rotateApplicationSecret**](docs/Api/ApplicationsApi.md#rotateapplicationsecret) | **POST** /api/v1/applications/{applicationId}/rotate-secret | Issue a new client secret (returned once). The old secret stops working.
*ApplicationsApi* | [**updateApplication**](docs/Api/ApplicationsApi.md#updateapplication) | **PATCH** /api/v1/applications/{applicationId} | Update an application&#39;s name or redirect URIs
*DomainsApi* | [**createCustomDomain**](docs/Api/DomainsApi.md#createcustomdomain) | **POST** /api/v1/domains | Add a custom domain; returns the DNS records to publish
*DomainsApi* | [**deleteCustomDomain**](docs/Api/DomainsApi.md#deletecustomdomain) | **DELETE** /api/v1/domains/{domainId} | Remove a custom domain
*DomainsApi* | [**listCustomDomains**](docs/Api/DomainsApi.md#listcustomdomains) | **GET** /api/v1/domains | List custom domains
*DomainsApi* | [**verifyCustomDomain**](docs/Api/DomainsApi.md#verifycustomdomain) | **POST** /api/v1/domains/{domainId}/verify | Check the DNS records for a custom domain
*GroupsApi* | [**addGroupMember**](docs/Api/GroupsApi.md#addgroupmember) | **POST** /api/v1/groups/{groupId}/members | Add a user to a group
*GroupsApi* | [**createGroup**](docs/Api/GroupsApi.md#creategroup) | **POST** /api/v1/groups | Create a group
*GroupsApi* | [**deleteGroup**](docs/Api/GroupsApi.md#deletegroup) | **DELETE** /api/v1/groups/{groupId} | Delete a group
*GroupsApi* | [**listGroupMembers**](docs/Api/GroupsApi.md#listgroupmembers) | **GET** /api/v1/groups/{groupId}/members | List the members of a group
*GroupsApi* | [**listGroups**](docs/Api/GroupsApi.md#listgroups) | **GET** /api/v1/groups | List groups
*GroupsApi* | [**removeGroupMember**](docs/Api/GroupsApi.md#removegroupmember) | **DELETE** /api/v1/groups/{groupId}/members/{userId} | Remove a user from a group
*InvitationsApi* | [**createInvitation**](docs/Api/InvitationsApi.md#createinvitation) | **POST** /api/v1/invitations | Invite someone by email (sends the invitation email). Fails with 403 if invitations are turned off for the workspace.
*InvitationsApi* | [**listInvitations**](docs/Api/InvitationsApi.md#listinvitations) | **GET** /api/v1/invitations | List invitations
*InvitationsApi* | [**resendInvitation**](docs/Api/InvitationsApi.md#resendinvitation) | **POST** /api/v1/invitations/{invitationId}/resend | Send the invitation email again
*InvitationsApi* | [**revokeInvitation**](docs/Api/InvitationsApi.md#revokeinvitation) | **DELETE** /api/v1/invitations/{invitationId} | Revoke an invitation
*OrganizationsApi* | [**createOrganization**](docs/Api/OrganizationsApi.md#createorganization) | **POST** /api/v1/organizations | Create an organization (at most 20 domains, validated and lower-cased)
*OrganizationsApi* | [**deleteOrganization**](docs/Api/OrganizationsApi.md#deleteorganization) | **DELETE** /api/v1/organizations/{organizationId} | Delete an organization
*OrganizationsApi* | [**listOrganizations**](docs/Api/OrganizationsApi.md#listorganizations) | **GET** /api/v1/organizations | List organizations
*OrganizationsApi* | [**updateOrganization**](docs/Api/OrganizationsApi.md#updateorganization) | **PATCH** /api/v1/organizations/{organizationId} | Update an organization (only the fields you send change)
*RolesApi* | [**assignRole**](docs/Api/RolesApi.md#assignrole) | **POST** /api/v1/roles/assign | Assign a role to a user (optionally until a date). Only an owner can grant ownership.
*RolesApi* | [**createRole**](docs/Api/RolesApi.md#createrole) | **POST** /api/v1/roles | Create a role
*RolesApi* | [**deleteRole**](docs/Api/RolesApi.md#deleterole) | **DELETE** /api/v1/roles/{roleId} | Delete a role
*RolesApi* | [**listRoles**](docs/Api/RolesApi.md#listroles) | **GET** /api/v1/roles | List roles
*RolesApi* | [**listUserRoles**](docs/Api/RolesApi.md#listuserroles) | **GET** /api/v1/users/{userId}/roles | List the roles assigned to a user
*RolesApi* | [**revokeRole**](docs/Api/RolesApi.md#revokerole) | **POST** /api/v1/roles/revoke | Revoke a role from a user
*UsersApi* | [**createUser**](docs/Api/UsersApi.md#createuser) | **POST** /api/v1/users | Create a user
*UsersApi* | [**deleteUser**](docs/Api/UsersApi.md#deleteuser) | **DELETE** /api/v1/users/{userId} | Delete a user (soft delete; sessions are revoked)
*UsersApi* | [**getUser**](docs/Api/UsersApi.md#getuser) | **GET** /api/v1/users/{userId} | Get a user
*UsersApi* | [**listUsers**](docs/Api/UsersApi.md#listusers) | **GET** /api/v1/users | List users
*UsersApi* | [**updateUser**](docs/Api/UsersApi.md#updateuser) | **PATCH** /api/v1/users/{userId} | Update a user (only the fields you send change)

## Models

- [AddGroupMemberInput](docs/Model/AddGroupMemberInput.md)
- [ApiError](docs/Model/ApiError.md)
- [ApiErrorDetail](docs/Model/ApiErrorDetail.md)
- [ApiKey](docs/Model/ApiKey.md)
- [ApiKeyEnvelope](docs/Model/ApiKeyEnvelope.md)
- [ApiKeyList](docs/Model/ApiKeyList.md)
- [Application](docs/Model/Application.md)
- [ApplicationEnvelope](docs/Model/ApplicationEnvelope.md)
- [ApplicationList](docs/Model/ApplicationList.md)
- [AssignRoleInput](docs/Model/AssignRoleInput.md)
- [CreateApiKeyInput](docs/Model/CreateApiKeyInput.md)
- [CreateApplicationInput](docs/Model/CreateApplicationInput.md)
- [CreateCustomDomainInput](docs/Model/CreateCustomDomainInput.md)
- [CreateGroupInput](docs/Model/CreateGroupInput.md)
- [CreateInvitationInput](docs/Model/CreateInvitationInput.md)
- [CreateOrganizationInput](docs/Model/CreateOrganizationInput.md)
- [CreateRoleInput](docs/Model/CreateRoleInput.md)
- [CreateUserInput](docs/Model/CreateUserInput.md)
- [CustomDomain](docs/Model/CustomDomain.md)
- [CustomDomainEnvelope](docs/Model/CustomDomainEnvelope.md)
- [CustomDomainList](docs/Model/CustomDomainList.md)
- [Group](docs/Model/Group.md)
- [GroupEnvelope](docs/Model/GroupEnvelope.md)
- [GroupList](docs/Model/GroupList.md)
- [GroupMember](docs/Model/GroupMember.md)
- [GroupMemberList](docs/Model/GroupMemberList.md)
- [Invitation](docs/Model/Invitation.md)
- [InvitationEnvelope](docs/Model/InvitationEnvelope.md)
- [InvitationList](docs/Model/InvitationList.md)
- [Organization](docs/Model/Organization.md)
- [OrganizationEnvelope](docs/Model/OrganizationEnvelope.md)
- [OrganizationList](docs/Model/OrganizationList.md)
- [RevokeRoleInput](docs/Model/RevokeRoleInput.md)
- [Role](docs/Model/Role.md)
- [RoleEnvelope](docs/Model/RoleEnvelope.md)
- [RoleList](docs/Model/RoleList.md)
- [UpdateOrganizationInput](docs/Model/UpdateOrganizationInput.md)
- [UpdateUserInput](docs/Model/UpdateUserInput.md)
- [User](docs/Model/User.md)
- [UserEnvelope](docs/Model/UserEnvelope.md)
- [UserList](docs/Model/UserList.md)

## Authorization

Authentication schemes defined for the API:
### bearerAuth

- **Type**: Bearer authentication

## Tests

To run the tests, use:

```bash
composer install
vendor/bin/phpunit
```

## Author



## About this package

This PHP package is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `0.1.0`
    - Package version: `0.1.0`
    - Generator version: `7.26.0`
- Build package: `org.openapitools.codegen.languages.PhpClientCodegen`
