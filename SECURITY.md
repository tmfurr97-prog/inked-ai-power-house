# Security Policy

## Overview

Inked AI Powerhouse takes the security of user data seriously. This policy covers how we handle vulnerability reports and our commitment to keeping the application safe.

## Supported Versions

Only the latest production release receives security patches.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| Older   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, report it privately by emailing the maintainer directly. Include:

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any relevant logs, screenshots, or proof-of-concept code

You can expect:

- An acknowledgment within **48 hours**
- A status update within **7 days**
- A fix or mitigation plan communicated before any public disclosure

We ask that you follow responsible disclosure and give us reasonable time to address issues before publishing details publicly.

## Security Practices

- **AI Input/Output Handling** — All user-submitted content passed to AI models (Google Genkit / Gemini) is sanitized to prevent prompt injection attacks.
- **No Sensitive Data in Prompts** — Personally identifiable information (PII) is not included in AI model prompts.
- **Authentication** — User sessions are managed securely using industry-standard practices. Credentials are never stored in plaintext.
- **Environment Variables** — API keys and secrets are stored in environment variables and never committed to source control.
- **Dependency Management** — Dependencies are kept up to date. Known vulnerable packages are patched promptly.
- **HTTPS Only** — All traffic is served over HTTPS in production.

## Out of Scope

The following are not considered security vulnerabilities for this project:

- Bugs in third-party AI model outputs (Google Gemini, Genkit)
- Issues in user-generated content that does not affect other users
- Rate limiting bypasses that do not expose data

## Acknowledgments

We appreciate responsible disclosure from the security community and will acknowledge reporters (with permission) in release notes for confirmed, resolved vulnerabilities.
