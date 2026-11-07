---
date: 2025-10-31T18:28:00
published: false
author: Richard
categories:
  - Security
tags:
  - Security
  - Authentication
  - OAuth2
  - OpenID Connect
  - SAML
  - Identity
  - Cryptography
title: 'Demystifying Federated Authentication: Architectural Mechanics of OAuth 2.0, OpenID Connect, and SAML'
description: A comprehensive engineering guide to federated identity, examining authorization code flows with PKCE, JWT signature validation against JWKS endpoints, and critical security vulnerabilities.
image: /assets/images/posts/covers/federated_identity_login_cover.jpg
image_alt: 'Federated Authentication sequence diagram detailing OIDC PKCE exchange and token validation'
layout: post
key_points:
  - Federated identity decouples credential custody from application logic by delegating authentication to dedicated identity providers.
  - OAuth 2.0 provides delegated authorization, whereas OpenID Connect adds an identity verification layer issuing signed JSON Web Tokens.
  - Implementations must enforce strict redirect URI matching, dynamic state validation, and proof key code exchanges to prevent token interception.
card_items:
  - title: The Federation Triad
    description: Contrasting the operational roles of User Agents, Relying Parties, and authoritative Identity Providers.
  - title: Cryptographic Token Proof
    description: Verifying asymmetric RSA-2048 and ECDSA signatures on incoming ID tokens using remote JWKS keystores.
  - title: Defense Against Account Takeover
    description: Mitigating identity spoofing caused by trusting unverified email claims across multi-tenant social logins.
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

Federated login sign up with an external service, Google, Okta, hope to clarify this

END WRITER NOTE -->

Modern web applications rarely implement isolated username and password tables from scratch. Storing salted password hashes introduces severe compliance overhead, credential stuffing exposure, and user onboarding friction. 

Instead, software architectures delegate authentication to external identity providers such as Google, Microsoft Entra ID, GitHub, or Okta through federated identity protocols.

To the end user, clicking "Continue with Google" appears as a simple popup window. Beneath this user experience lies a multi-party cryptographic handshake coordinating trust across untrusted public networks. 

Understanding this interaction requires dissecting the functional boundaries separating OAuth 2.0, OpenID Connect (OIDC), and Security Assertion Markup Language (SAML 2.0).

| Federation Entity | Technical Role | Implementation Responsibility |
| :--- | :--- | :--- |
| **End User / Client** | User Agent (Browser or Mobile App) | Initiates login and manages session cookies or local state |
| **Relying Party (RP)** | Application Frontend & Backend API | Verifies tokens and protects internal application routes |
| **Identity Provider (IdP)** | Authoritative Custodian (Google, GitHub, Okta) | Authenticates credentials and issues cryptographically signed claims |

## The Federation Spectrum: OAuth 2.0 vs OIDC vs SAML 2.0

Engineering teams frequently confuse authorization with authentication:

- **Authentication (AuthN)**: Verifying the asserted identity of the user agent or actor.
- **Authorization (AuthZ)**: Determining the explicit access permissions and resources granted to that entity.

| Protocol Standard | Core Specification | Primary Function | Primary Token / Artifact |
| :--- | :--- | :--- | :--- |
| **OAuth 2.0** | RFC 6749 | Delegated authorization | Access Token (opaque or JWT) |
| **OpenID Connect (OIDC)** | OIDC Core 1.0 | Federated authentication | ID Token (signed JWT containing identity claims) |
| **SAML 2.0** | OASIS Standard | Enterprise single sign-on (SSO) | XML-based SAML Assertion over HTTP POST |

### Protocol Comparison Matrix

| Protocol | Primary Transport | Token Format | Core Use Case | Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **OAuth 2.0** | HTTP / JSON | Bearer Tokens (Opaque or JWT) | Granting third-party API permissions without sharing credentials | Moderate |
| **OpenID Connect** | HTTP / REST | JSON Web Token (JWT) | Modern consumer and enterprise web and mobile authentication | Moderate |
| **SAML 2.0** | HTTP POST / XML | Signed XML Assertions | Legacy enterprise intranet, corporate Active Directory SSO | High |

While enterprise environments still rely heavily on SAML 2.0 due to established enterprise software integrations, modern consumer and SaaS applications default to OpenID Connect.

## The OpenID Connect Authorization Code Flow with PKCE

The most secure architecture for web and mobile federated login is the Authorization Code Flow augmented with Proof Key for Code Exchange (PKCE, RFC 7636). 

Historically, public clients (single-page applications and native mobile apps) relied on the Implicit Flow, which returned access tokens directly in the URL hash fragment. Because browser history, referer headers, and malicious browser extensions can inspect URL fragments, modern standards mandate PKCE for all authorization flows.

| Step | Originator | Target | Protocol Action |
| :--- | :--- | :--- | :--- |
| **1** | Client Browser | Local State | Generates cryptographically secure `code_verifier` and SHA-256 challenge |
| **2** | Client Browser | Identity Provider | Redirects user to authorization endpoint with challenge and scopes |
| **3** | User | Identity Provider | User inputs credentials (password, biometric WebAuthn passkey) |
| **4** | Identity Provider | Client Browser | Redirects back to Relying Party callback with ephemeral `auth_code` |
| **5** | Relying Party Backend | Identity Provider | Backchannel POST exchanging `auth_code` plus original `code_verifier` |
| **6** | Identity Provider | Relying Party Backend | Verifies challenge hash and issues cryptographically signed ID Token |
| **7** | Relying Party Backend | Client Browser | Establishes secure, `HttpOnly` encrypted application session |

### Cryptographic Derivation of PKCE Parameters

Before initiating the login redirect, the client generates a high-entropy cryptographic secret string known as the `code_verifier`. 

The `code_verifier` consists of unreserved URL characters with a minimum length of 43 characters up to a maximum of 128 characters:

```python
import base64
import hashlib
import os

# Generate 32 bytes of secure random entropy
random_bytes = os.urandom(32)
code_verifier = base64.urlsafe_b64encode(random_bytes).decode('utf-8').rstrip('=')

# Calculate SHA-256 hash
digest = hashlib.sha256(code_verifier.encode('utf-8')).digest()
code_challenge = base64.urlsafe_b64encode(digest).decode('utf-8').rstrip('=')
```

The mathematical transformation ensures a one-way preimage resistant relationship:

$$\text{code\_challenge} = \text{Base64URL}\left( \text{SHA256}(\text{code\_verifier}) \right)$$

The client initiates authentication by sending the browser to the Identity Provider authorization endpoint with the following query parameters:

```http
GET /authorize?
  response_type=code
  &client_id=client_982347102938
  &redirect_uri=https%3A%2F%2Fmyapp.com%2Fauth%2Fcallback
  &scope=openid%20email%20profile
  &state=c3ab87f910a2d3e4b
  &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
  &code_challenge_method=S256 HTTP/1.1
Host: accounts.google.com
```

### The State Parameter and CSRF Mitigation

The `state` parameter serves as a cryptographically randomized nonce binding the user agent browser session to the initial authorization redirect. 

When the Identity Provider completes authentication, it appends this exact `state` string to the callback URL. 

The application backend verifies that the returned `state` matches the session cookie established before redirection. Without strict `state` validation, an attacker could trick a victim into submitting an authorization code belonging to the attacker account, binding the victim session to attacker data.

## Anatomical Structure and Verification of the ID Token

Once the application exchanges the temporary authorization code over a secure TLS backchannel, the Identity Provider returns an OpenID Connect ID Token. 

An ID Token is formatted as a compact JSON Web Token (JWT) consisting of three Base64URL-encoded segments separated by periods:

```
[ Base64URL Header ] . [ Base64URL Payload ] . [ Base64URL Cryptographic Signature ]
```

```json
// JWT Header:
{
  "alg": "RS256",
  "kid": "key_2026_primary",
  "typ": "JWT"
}

// JWT Claims Payload:
{
  "iss": "https://accounts.google.com",
  "sub": "109283019283019283019",
  "aud": "client_982347102938",
  "exp": 1792752000,
  "iat": 1792748400,
  "email": "engineer@company.com",
  "email_verified": true
}
```

### Signature Verification via JSON Web Key Sets (JWKS)

Applications must never parse JWT payload claims without first mathematically validating the digital signature against the authoritative public key of the Identity Provider.

1. **Discovery**: The application queries the Identity Provider OpenID discovery endpoint located at `/.well-known/openid-configuration`, retrieving the `jwks_uri` URL.
2. **Key Retrieval**: The application fetches the JSON Web Key Set containing active public certificates:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "alg": "RS256",
      "use": "sig",
      "kid": "key_2026_primary",
      "n": "u1P5tQ...",
      "e": "AQAB"
    }
  ]
}
```

3. **Cryptographic Validation**: Using the RSA public modulus $$n$$ and exponent $$e$$, the backend validates the RS256 signature using the formula:

$$\text{Verify}_{\text{PubKey}}\left(\text{Header} \mathbin{\Vert} \text{Payload}, \text{Signature}\right) \equiv \text{True}$$

4. **Claims Inspection**: After confirming cryptographic integrity, the verification logic must validate four essential claims:
   - **Issuer (`iss`)**: Must exactly match the designated Identity Provider URL string.
   - **Audience (`aud`)**: Must match the unique client application identifier registered with the Identity Provider.
   - **Expiration (`exp`)**: Current Unix epoch timestamp must precede the token expiration timestamp with a small clock skew allowance (typically under 60 seconds).
   - **Subject (`sub`)**: The immutable, unique identifier for the user account inside the Identity Provider database.

## Critical Security Vulnerabilities in Federated Login

While federated login avoids local password storage, improper protocol implementation introduces critical attack vectors.

| Threat Vector | Vulnerability Mechanism | Protective Countermeasure |
| :--- | :--- | :--- |
| **Pre-Account Takeover** | Linking accounts on unverified email claims | Require explicit password confirmation or verify `email_verified: true` |
| **Redirect URI Poisoning** | Wildcard subdomain matching in IdP console | Configure exact, strict URI whitelists in developer console |
| **Algorithm Confusion** | Attacker flips token header from RS256 to HS256 | Hardcode verification to asymmetric RS256 using public JWKS |
| **Subject Identifier Drift** | Relying on mutable email addresses rather than `sub` | Bind local database accounts strictly to immutable `sub` UUIDs |

### Pre-Account Takeover via Unverified Email Claims

A widespread software engineering bug occurs when applications link accounts solely on the `email` string returned in the JWT payload without verifying the `email_verified` boolean flag.

Consider this exploit progression:

1. A victim registers for a SaaS platform using traditional email and password (`alice@corporate.com`).
2. An attacker creates a free account on an identity provider that permits registration with arbitrary unverified email addresses.
3. The attacker initiates a "Log in with External Provider" flow into the SaaS platform.
4. If the SaaS application matches users by raw email without verifying `email_verified: true`, the system attaches the attacker federated token to the victim pre-existing account, granting full administrative access to the attacker.

Applications must strictly enforce:

```python
def link_federated_identity(jwt_claims, db_session):
    if not jwt_claims.get("email_verified", False):
        raise SecurityException("Refusing to link unverified identity claim.")
    
    # Anchor on the immutable subject identifier rather than mutable email
    idp_subject = jwt_claims["sub"]
    idp_issuer = jwt_claims["iss"]
    return db_session.get_or_create_user(issuer=idp_issuer, subject=idp_subject)
```

### Redirect URI Poisoning

When registering an application with an Identity Provider, developers specify permissible `redirect_uri` endpoints. Allowing directory wildcards (such as `https://myapp.com/*`) allows attackers to execute Open Redirect attacks. 

By crafting a link that routes through an open redirect parameter on the legitimate domain, an attacker can siphon valid authorization codes directly to an attacker-controlled listener. 

Redirect URIs must always be registered as exact, fully qualified strings without wildcards.

## Architectural Summary

Federated authentication shifts the responsibility of identity verification to specialized institutions with dedicated security infrastructure. By combining the authorization delegation mechanics of OAuth 2.0 with the structured identity verification layers of OpenID Connect, modern systems eliminate password custody risks.

Robust implementations require strict cryptographic hygiene: enforcing PKCE on all client interactions, verifying RS256 token signatures against rotating JWKS endpoints, requiring anti-CSRF state parameters, and indexing user accounts on immutable subject claims rather than volatile email addresses.
