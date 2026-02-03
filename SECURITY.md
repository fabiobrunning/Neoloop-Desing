# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Neo Design System seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send an email to: security@neoloop.com.br

Please include the following information in your report:

- Type of vulnerability (e.g., XSS, injection, authentication bypass)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Resolution:** Depends on severity and complexity

### What to Expect

1. **Acknowledgment:** We will acknowledge receipt of your vulnerability report
2. **Communication:** We will keep you informed of the progress
3. **Credit:** We will credit you in the security advisory (if you wish)
4. **Disclosure:** We follow responsible disclosure practices

## Security Measures

### Code Security

- All code is reviewed before merge
- Automated security scanning via CodeQL
- Dependency vulnerability scanning via Dependabot
- SAST (Static Application Security Testing) in CI/CD

### Infrastructure Security

- HTTPS enforced everywhere
- Secrets managed via GitHub Secrets
- No credentials in code
- Regular security audits

### Best Practices

We follow these security best practices:

- Input validation and sanitization
- Output encoding
- CSRF protection
- Content Security Policy headers
- Regular dependency updates
- Principle of least privilege

## Security-Related Configuration

### Content Security Policy

Our application implements a strict Content Security Policy. Contact us if you need to report CSP-related issues.

### Dependency Management

We use:
- Dependabot for automated security updates
- npm audit in CI/CD pipeline
- Regular manual review of dependencies

## Acknowledgments

We would like to thank the following researchers for responsibly disclosing vulnerabilities:

*(This list will be updated as we receive and address security reports)*

---

Thank you for helping keep Neo Design System and our users safe!
