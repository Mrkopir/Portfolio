## Security Measures

The backend includes several security-focused improvements to reduce common risks for a public contact form and API service.

### Environment Variables

Sensitive configuration values are stored in environment variables and are not committed to the repository.

The project uses an `.env.example` file to describe required variables without exposing real secrets.

Protected values include:

- Telegram bot token
- Telegram chat ID
- Client URL
- Server URL
- Runtime environment

The real `.env` file is excluded from Git using `.gitignore`.

### CORS Protection

CORS is configured to allow requests only from the configured client origin.

This helps prevent unwanted browser-based requests from unknown origins and limits frontend access to trusted domains.

### Request Validation

Incoming request data is validated using NestJS validation mechanisms.

The API accepts only expected fields and rejects unexpected properties.

This reduces the risk of malformed input, unwanted payloads, and accidental processing of untrusted fields.

### DTO-Based Input Control

Contact form data is processed through DTOs.

The following fields are validated before processing:

- name
- email
- message
- hidden honeypot field

Input length and format restrictions are applied to reduce spam, invalid data, and oversized user input.

### Rate Limiting

Rate limiting is applied to reduce spam and repeated automated requests.

The contact endpoint is protected with stricter request limits to prevent abuse of the Telegram notification system.

### Honeypot Anti-Spam Protection

The contact form includes a honeypot field.

Normal users do not interact with this field, but automated bots may fill it in. If the field is detected, the request is silently ignored without sending a Telegram message.

This helps reduce automated spam without affecting normal users.

### Security Headers

The backend uses security headers to reduce exposure to common web-based attacks.

These headers help improve browser-side protection and harden the HTTP response behavior.

### Body Size Limiting

Request body size is limited to prevent oversized payloads from consuming unnecessary server resources.

This helps reduce the risk of simple denial-of-service attempts using large JSON bodies.

### Centralized Error Handling

The backend uses centralized exception handling to return consistent error responses.

In production, internal error details are not exposed to the client.

This prevents leaking stack traces, internal paths, or implementation details.

### External API Request Timeout

Requests to external services are protected with timeout handling.

This prevents the backend from hanging indefinitely if an external service becomes unavailable or slow to respond.

### Static File Safety

Static image handling is restricted to expected file types.

The server validates file names and extensions before exposing image paths to the client.

This helps prevent unintended file exposure from public directories.

### Production Configuration

The application supports separate development and production configurations.

In production mode, the backend avoids exposing unnecessary debugging information and uses stricter runtime behavior.

### Git Hygiene

The repository excludes sensitive and generated files, including:

- `.env`
- `node_modules`
- `dist`
- logs
- temporary files

This reduces the risk of accidentally publishing secrets, build artifacts, or local development files.