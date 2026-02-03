# Neo Design System - Deployment Runbook

## Overview

This document provides step-by-step instructions for deploying the Neo Design System to various environments.

---

## Environments

| Environment | URL | Branch | Auto-Deploy |
|-------------|-----|--------|-------------|
| Production | https://neo-design-system.vercel.app | `main` | Manual |
| Staging | https://neo-design-system-staging.vercel.app | `develop` | Automatic |
| Storybook | https://neo-design-system-storybook.vercel.app | `main` | Automatic |

---

## Pre-Deployment Checklist

### Before Any Deployment

- [ ] All tests passing (`npm run test:ci`)
- [ ] Lint check passing (`npm run lint`)
- [ ] TypeScript check passing (`npm run typecheck`)
- [ ] Coverage above 80% (`npm run test:coverage`)
- [ ] Bundle size within budget (`npm run build`)
- [ ] Security audit clean (`npm audit`)
- [ ] No critical/high vulnerabilities

### For Production Deployments

- [ ] Staging deployment verified
- [ ] Smoke tests passed on staging
- [ ] Performance metrics acceptable
- [ ] Stakeholder approval obtained
- [ ] Rollback plan documented

---

## Deployment Procedures

### 1. Staging Deployment

Staging deploys automatically on push to `develop` branch.

**Manual Staging Deploy:**

```bash
# Navigate to project
cd neo-design-system-builder

# Ensure on develop branch
git checkout develop
git pull origin develop

# Run tests
npm run test:ci

# Trigger manual deploy via GitHub Actions
gh workflow run "Deploy to Staging" --ref develop
```

### 2. Production Deployment

Production requires manual trigger with confirmation.

**Via GitHub Actions:**

1. Go to Actions > "Deploy to Production"
2. Click "Run workflow"
3. Enter tag (e.g., `v1.0.0`)
4. Type `DEPLOY` to confirm
5. Click "Run workflow"

**Via CLI:**

```bash
# Create release tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Trigger production deploy
gh workflow run "Deploy to Production" \
  --field confirm_deploy=DEPLOY \
  --field tag=v1.0.0
```

### 3. Storybook Deployment

Storybook deploys automatically on changes to:
- `src/**`
- `components/**`
- `.storybook/**`

**Manual Deploy:**

```bash
gh workflow run "Deploy Storybook" \
  --field deploy_target=both
```

---

## Rollback Procedures

### Vercel Rollback

**Via Vercel Dashboard:**

1. Go to Vercel Dashboard > neo-design-system
2. Navigate to Deployments
3. Find last working deployment
4. Click "..." > "Promote to Production"

**Via CLI:**

```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

**Via GitHub Actions:**

```bash
gh workflow run "Deploy to Production" \
  --field confirm_deploy=DEPLOY \
  --field rollback_to=<deployment-id>
```

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit (CAREFUL!)
git reset --hard <commit-sha>
git push origin main --force
```

---

## Environment Variables

### Required Secrets (GitHub)

| Secret | Description | Required For |
|--------|-------------|--------------|
| `VERCEL_TOKEN` | Vercel deployment token | All deploys |
| `VERCEL_ORG_ID` | Vercel organization ID | All deploys |
| `VERCEL_PROJECT_ID` | Main project ID | Production/Staging |
| `VERCEL_STORYBOOK_PROJECT_ID` | Storybook project ID | Storybook |
| `CHROMATIC_PROJECT_TOKEN` | Chromatic visual testing | Storybook |
| `CODECOV_TOKEN` | Code coverage reporting | CI |
| `SENTRY_DSN` | Error tracking | Production |
| `SLACK_WEBHOOK_URL` | Notifications | All |
| `PAGERDUTY_ROUTING_KEY` | Critical alerts | Monitoring |

### Application Environment Variables

```env
# Production
VITE_ENV=production
VITE_API_URL=https://api.neoloop.com
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_ANALYTICS_ID=UA-XXXXX-X

# Staging
VITE_ENV=staging
VITE_API_URL=https://api-staging.neoloop.com
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## Monitoring

### Health Checks

- **Endpoint:** `https://neo-design-system.vercel.app`
- **Expected Status:** 200
- **Check Frequency:** Every 5 minutes
- **Alert Threshold:** 3 consecutive failures

### Performance Budgets

| Metric | Budget | Alert Threshold |
|--------|--------|-----------------|
| First Contentful Paint | 2s | 3s |
| Largest Contentful Paint | 3s | 4s |
| Total Blocking Time | 300ms | 500ms |
| Cumulative Layout Shift | 0.1 | 0.25 |
| Bundle Size (JS) | 300KB | 400KB |
| Bundle Size (Total) | 500KB | 700KB |

### Error Monitoring (Sentry)

- **Dashboard:** https://sentry.io/organizations/neoloop
- **Alert Rules:**
  - Critical errors: Immediate PagerDuty
  - Error rate > 5%: Slack notification
  - Performance regression: Daily digest

---

## Incident Response

### Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| P1 | Complete outage | 15 minutes | Site down, data loss |
| P2 | Major degradation | 1 hour | Key feature broken |
| P3 | Minor issue | 4 hours | UI bug, edge case |
| P4 | Enhancement | Next sprint | Performance, UX |

### Incident Workflow

1. **Detect** - Monitoring alert or user report
2. **Acknowledge** - Assign owner, update status
3. **Diagnose** - Review logs, identify root cause
4. **Mitigate** - Rollback or hotfix
5. **Resolve** - Verify fix, close incident
6. **Postmortem** - Document learnings

### Contacts

| Role | Contact | Responsibility |
|------|---------|----------------|
| On-Call Engineer | PagerDuty rotation | Initial response |
| Tech Lead | @tech-lead | Escalation |
| Product Owner | @product-owner | Business decisions |

---

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run typecheck

# Check for lint errors
npm run lint
```

#### Deployment Stuck

1. Check GitHub Actions logs
2. Verify Vercel status
3. Check for concurrent deployments
4. Cancel and retry if needed

#### Performance Degradation

1. Check bundle size analysis
2. Review recent changes
3. Run Lighthouse locally
4. Check for memory leaks

#### 500 Errors in Production

1. Check Sentry for errors
2. Review Vercel function logs
3. Verify environment variables
4. Check API connectivity

---

## Appendix

### Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run all tests
npm run test:ci

# Check bundle size
npm run test:bundle-size

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Related Documentation

- [Architecture Overview](/docs/03-ARCHITECTURE/)
- [CI/CD Pipeline Documentation](/docs/04-IMPLEMENTATION/)
- [Security Guidelines](/SECURITY.md)
- [Contributing Guide](/CONTRIBUTING.md)

---

**Last Updated:** 2026-01-31
**Version:** 1.0.0
