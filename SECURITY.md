# AI Agent Security Standard

This document defines mandatory security principles and restrictions for all AI coding assistants operating in this repository. All AI agents must follow these requirements without exception.

**Authority:** Derived from [Zendesk Minimum Baseline Security Standard](https://docs.google.com/document/d/17GZ9TpjKCt6WCdw3yxL44Ra_YscbOBVnVkUVGgx5Hz0/) and internal security policies.

---

## Core Security Mandate

Security is a first-class requirement. Every code suggestion must be evaluated against these guidelines. If a request would result in insecure code:

1. **Stop** and flag the security concern
2. **Explain** why it's problematic
3. **Propose** a secure alternative

AI-generated code requires human review before merging.

---

## Absolute Prohibitions

AI agents must **NEVER** do the following:

### Secrets & Credentials
- Hardcode secrets, credentials, API keys, tokens, or passwords in source code
- Store secrets in version control (`.env` files, config with real values)
- Log, print, or expose secret values
- Expose credentials in URLs, logs, or error messages

### Security Controls
- Disable or weaken security controls
- Bypass authentication or authorization checks
- Disable certificate validation
- Weaken password policies or MFA requirements

### Dangerous Code Patterns
- Use `eval()` or `exec()` with user-supplied input
- Implement custom cryptography
- Use deprecated algorithms (MD5, SHA-1, DES, RC4, ECB mode)
- Inject untrusted HTML directly into the DOM without sanitization

### Data Exposure
- Log sensitive data (PII, credentials, tokens, customer data)
- Expose stack traces or internal paths to end users
- Transmit sensitive data over unencrypted channels

---

## Required Security Patterns

### DOM Sanitization

This is a browser-rendered theme — untrusted content must be sanitized before DOM insertion.

```js
// Correct: Use DOMPurify (already a project dependency)
import DOMPurify from "dompurify";
element.innerHTML = DOMPurify.sanitize(untrustedHtml);
```

```js
// NEVER: Raw innerHTML with untrusted content
element.innerHTML = untrustedContent;
```

### API Usage

Only use public Zendesk REST APIs documented at https://developer.zendesk.com/api-reference/

```js
// Correct: Public API endpoint
fetch("/api/v2/requests.json")
```

```js
// NEVER: Undocumented internal endpoints or private APIs
fetch("/internal/api/secret-endpoint")
```

### Secret Management

```js
// Correct: Environment variables or runtime config
const apiKey = process.env.MY_API_KEY;
```

```js
// NEVER: Hardcoded secrets
const apiKey = "sk-abc123XYZ";
```

### Logging

```js
// Correct: Log non-sensitive identifiers only
console.error("Request submission failed", { requestId, errorCode });
```

```js
// NEVER: Log PII or sensitive data
console.log("User data:", { email, password, token });
```

---

## Security Requirements by Domain

### Client-Side Rendering
- Always sanitize HTML from API responses or user input before inserting into the DOM
- Use `DOMPurify` (already a project dependency) for HTML sanitization
- Use `textContent` instead of `innerHTML` when rendering plain text
- Avoid `dangerouslySetInnerHTML` in React components unless content is explicitly sanitized

### API Calls
- Use only public REST APIs documented at https://developer.zendesk.com/api-reference/
- Do not construct API URLs using unsanitized user input
- Handle API errors gracefully — do not expose raw error responses to users
- Use HTTPS — the Help Center runtime enforces this, but never add HTTP fallback logic

### Authentication & Sessions
- Never store authentication tokens in `localStorage` — prefer `sessionStorage` or cookie-managed sessions
- The Help Center authentication is managed by Zendesk — do not implement custom auth flows
- CSRF token handling (`fetchCsrfToken.ts`) must be used for all state-mutating API calls

### Cryptography

| Use Case | Approved | Forbidden |
|----------|----------|-----------|
| Integrity hashing | SHA-256, SHA-3 | MD5, SHA-1 |
| Symmetric encryption | AES-256-GCM | DES, 3DES, AES-ECB |
| TLS | TLS 1.2+ | SSLv2/3, TLS 1.0/1.1 |

### Dependency Security
- Do not introduce new dependencies without reviewing their security posture
- All new packages must be reviewed for known CVEs before adding
- Prefer existing project dependencies (Garden, DOMPurify, react-i18next) over new ones
- Dependabot is enabled for vulnerability scanning — do not dismiss alerts without understanding them

### Accessibility and Security
- Input validation must happen server-side — client-side validation is UX only, never a security boundary
- Form submissions use Zendesk's CSRF token mechanism — preserve this for all form POST operations

---

## When to Stop and Escalate

Stop, explain the concern, and recommend involving Security if a task requires:

- Bypassing or weakening security controls
- Exposing customer data or restricted information
- Circumventing authentication
- Disabling certificate validation or encryption
- Using deprecated protocols or algorithms
- Inserting unsanitized HTML from external sources into the DOM
- Using undocumented or private Zendesk APIs
- Accessing production customer data without authorization

---

## Security Testing

When generating features, include:

- Unit tests for input validation and permission enforcement
- Negative test cases for invalid inputs and unauthorized access
- Tests verifying HTML sanitization is applied for any user-generated or API-sourced content
- Boundary condition tests and error path coverage

---

## References

- [Minimum Baseline Security Standard](https://docs.google.com/document/d/17GZ9TpjKCt6WCdw3yxL44Ra_YscbOBVnVkUVGgx5Hz0/)
- [Cryptography Standards](https://techmenu.zende.sk/standards/cryptography-standards/)
- [Zendesk Public API Reference](https://developer.zendesk.com/api-reference/)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)

---

**Questions?** Reach out to the Security team or file a ticket via the Security Engagement process.

---

## Reporting Vulnerabilities

Bug reports and security vulnerabilities must be submitted through Zendesk's standard support channels: https://www.zendesk.com/contact/
