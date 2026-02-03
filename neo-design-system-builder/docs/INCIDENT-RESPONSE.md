# Neo Design System - Incident Response Guide

## Purpose

This document outlines the procedures for responding to incidents affecting the Neo Design System infrastructure and applications.

---

## Incident Classification

### Severity Levels

| Severity | Impact | Examples | Response Time | Resolution Target |
|----------|--------|----------|---------------|-------------------|
| **P1 - Critical** | Complete service outage | Production down, data breach | 15 min | 1 hour |
| **P2 - High** | Major feature unavailable | Auth broken, API errors | 30 min | 4 hours |
| **P3 - Medium** | Partial degradation | Slow performance, UI bugs | 2 hours | 24 hours |
| **P4 - Low** | Minor issues | Cosmetic bugs, edge cases | 24 hours | 1 week |

### Impact Assessment Matrix

| Users Affected | Business Impact | Data Impact | Severity |
|----------------|-----------------|-------------|----------|
| All users | Revenue loss | Data loss | P1 |
| Many users | Feature blocked | Data corruption | P2 |
| Some users | Degraded experience | No data impact | P3 |
| Few users | Minor inconvenience | No data impact | P4 |

---

## Response Procedures

### Phase 1: Detection & Triage (0-15 minutes)

#### Automated Detection
- Monitoring alerts from GitHub Actions
- Sentry error notifications
- PagerDuty escalation
- Uptime monitoring alerts

#### Manual Detection
- User reports via support channels
- Internal team observations
- Partner notifications

#### Initial Triage Steps

1. **Acknowledge the Alert**
   ```bash
   # If using PagerDuty CLI
   pd incident:acknowledge --id <incident-id>
   ```

2. **Assess Severity**
   - Check monitoring dashboards
   - Review error logs
   - Identify affected users/features

3. **Create Incident Channel**
   - Slack: `#incident-YYYY-MM-DD-<brief-description>`
   - Invite relevant team members

4. **Initial Status Update**
   ```
   INCIDENT: [Brief Description]
   SEVERITY: P[1-4]
   STATUS: Investigating
   IMPACT: [User/Feature impact]
   LEAD: @[incident-lead]
   ```

### Phase 2: Diagnosis (15-60 minutes)

#### Investigation Checklist

- [ ] Check Vercel deployment status
- [ ] Review recent deployments
- [ ] Check Sentry for errors
- [ ] Review application logs
- [ ] Check external service status
- [ ] Verify environment variables
- [ ] Check database connectivity
- [ ] Review recent code changes

#### Diagnostic Commands

```bash
# Check deployment status
vercel ls

# View recent logs
vercel logs <deployment-url>

# Check GitHub Actions
gh run list --limit 10

# View workflow details
gh run view <run-id>
```

#### Key Metrics to Check

| Metric | Location | Normal Range |
|--------|----------|--------------|
| Error Rate | Sentry | < 0.1% |
| Response Time | Vercel Analytics | < 500ms |
| CPU Usage | Vercel Dashboard | < 80% |
| Memory Usage | Vercel Dashboard | < 80% |
| Uptime | GitHub Actions | > 99.9% |

### Phase 3: Mitigation (Immediate Actions)

#### Option 1: Rollback Deployment

```bash
# Via Vercel CLI
vercel rollback <previous-deployment-url>

# Via GitHub Actions
gh workflow run "Deploy to Production" \
  --field confirm_deploy=DEPLOY \
  --field rollback_to=<deployment-id>
```

#### Option 2: Feature Flag Disable

```typescript
// Disable problematic feature
const FEATURE_FLAGS = {
  problematicFeature: false,
};
```

#### Option 3: Scale/Restart

```bash
# Force new deployment (restart)
vercel --prod --force
```

#### Option 4: Traffic Redirect

- Enable maintenance page
- Redirect to status page
- Implement circuit breaker

### Phase 4: Resolution

#### Verification Steps

1. **Confirm Fix**
   - Run smoke tests
   - Check monitoring metrics
   - Verify user functionality

2. **Monitor for Recurrence**
   - Watch error rates for 30 minutes
   - Check performance metrics
   - Monitor user reports

3. **Update Status**
   ```
   INCIDENT: [Brief Description]
   SEVERITY: P[1-4]
   STATUS: Resolved
   RESOLUTION: [Brief description of fix]
   DURATION: [Start to end time]
   ```

4. **Notify Stakeholders**
   - Internal team update
   - Customer communication (if needed)
   - Status page update

### Phase 5: Post-Incident

#### Postmortem Template

```markdown
# Incident Postmortem: [Title]

## Summary
- **Date:** YYYY-MM-DD
- **Duration:** X hours Y minutes
- **Severity:** P[1-4]
- **Impact:** [Number of users affected, features impacted]

## Timeline
| Time | Event |
|------|-------|
| HH:MM | Incident detected |
| HH:MM | Investigation started |
| HH:MM | Root cause identified |
| HH:MM | Mitigation applied |
| HH:MM | Incident resolved |

## Root Cause
[Detailed explanation of what caused the incident]

## Resolution
[What was done to fix the issue]

## Lessons Learned
### What Went Well
- [List items]

### What Went Wrong
- [List items]

## Action Items
| Action | Owner | Due Date |
|--------|-------|----------|
| [Action item] | @owner | YYYY-MM-DD |

## Prevention
[Steps to prevent similar incidents]
```

---

## Communication Templates

### Initial Alert (Internal)

```
:rotating_light: INCIDENT ALERT

**Severity:** P[X]
**Service:** Neo Design System
**Impact:** [Brief description]
**Status:** Investigating

Incident channel: #incident-YYYY-MM-DD
Incident lead: @[name]

Updates will follow every 15 minutes.
```

### Status Update

```
:information_source: INCIDENT UPDATE

**Incident:** [Brief description]
**Status:** [Investigating/Mitigating/Monitoring/Resolved]
**Update:** [What's been done/found]
**Next Steps:** [What's happening next]
**ETA:** [Estimated resolution time]
```

### Resolution Notification

```
:white_check_mark: INCIDENT RESOLVED

**Incident:** [Brief description]
**Duration:** [Total time]
**Resolution:** [How it was fixed]
**Impact:** [Final user impact assessment]

Postmortem will be shared within 48 hours.
```

### Customer Communication (P1/P2)

```
Subject: [Service Name] Incident - [Status]

Dear Customer,

We experienced an issue with [service/feature] starting at [time].

**Impact:** [What users experienced]
**Status:** [Current status]
**Resolution:** [What we did/are doing]

We apologize for any inconvenience. Please contact support if you have questions.

Best regards,
[Team Name]
```

---

## Escalation Procedures

### Escalation Matrix

| Severity | Initial Responder | 15 min | 30 min | 1 hour |
|----------|-------------------|--------|--------|--------|
| P1 | On-Call Engineer | Tech Lead | Engineering Manager | CTO |
| P2 | On-Call Engineer | Tech Lead | Engineering Manager | - |
| P3 | On-Call Engineer | Tech Lead | - | - |
| P4 | Assigned Engineer | - | - | - |

### When to Escalate

- Unable to diagnose within response time
- Fix requires permissions you don't have
- Customer-facing communication needed
- Legal/compliance implications
- Data breach suspected

---

## Tools & Access

### Essential Tools

| Tool | Purpose | Access |
|------|---------|--------|
| Vercel Dashboard | Deployment management | Team access |
| Sentry | Error tracking | Team access |
| GitHub Actions | CI/CD pipelines | Repo access |
| Slack | Communication | Team workspace |
| PagerDuty | On-call management | On-call team |

### Runbook Links

- [Deployment Runbook](./DEPLOYMENT-RUNBOOK.md)
- [Security Playbook](../SECURITY.md)
- [Architecture Docs](/docs/03-ARCHITECTURE/)

### Emergency Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| On-Call Engineer | PagerDuty | 24/7 |
| Security Team | security@neoloop.com | 24/7 for P1 |
| Infrastructure | infra@neoloop.com | Business hours |

---

## Appendix

### Common Incident Scenarios

#### Scenario 1: Production Site Down

1. Check Vercel status page
2. Verify DNS resolution
3. Check for failed deployments
4. Review recent changes
5. Rollback if needed

#### Scenario 2: High Error Rate

1. Check Sentry for error patterns
2. Identify affected endpoints
3. Review recent code changes
4. Check external dependencies
5. Apply hotfix or rollback

#### Scenario 3: Performance Degradation

1. Check bundle sizes
2. Review API response times
3. Check for memory leaks
4. Analyze database queries
5. Scale resources if needed

#### Scenario 4: Security Incident

1. Isolate affected systems
2. Notify security team immediately
3. Preserve evidence/logs
4. Do NOT discuss publicly
5. Follow security playbook

---

**Document Owner:** DevOps Team
**Last Updated:** 2026-01-31
**Review Frequency:** Quarterly
