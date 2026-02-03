# Neo Design System - Disaster Recovery Plan

## Overview

This document outlines the disaster recovery procedures for the Neo Design System, including backup strategies, recovery procedures, and business continuity planning.

---

## Recovery Objectives

### RTO (Recovery Time Objective)

| Component | RTO | Priority |
|-----------|-----|----------|
| Production Application | 1 hour | Critical |
| Staging Environment | 4 hours | High |
| Storybook Documentation | 8 hours | Medium |
| Development Environment | 24 hours | Low |

### RPO (Recovery Point Objective)

| Data Type | RPO | Backup Frequency |
|-----------|-----|------------------|
| Source Code | 0 | Continuous (Git) |
| Configuration | 1 hour | Hourly |
| Design Tokens | 24 hours | Daily |
| User Data | N/A | No user data stored |

---

## Backup Strategy

### 1. Source Code Backups

**Primary:** GitHub Repository
- Continuous synchronization
- All branches preserved
- Full commit history
- Protected branches enabled

**Secondary:** Local Developer Machines
- Daily pulls recommended
- Feature branches locally

**Tertiary:** Archive Backups
- Monthly exports to secure storage
- Retained for 1 year

```bash
# Create repository backup
gh repo clone neoloop/neo-design-system --mirror neo-design-system-backup.git

# Archive backup
tar -czvf neo-design-system-backup-$(date +%Y%m%d).tar.gz neo-design-system-backup.git
```

### 2. Configuration Backups

**Vercel Configuration:**
- Stored in `vercel.json` (version controlled)
- Environment variables documented
- Project settings exportable

**GitHub Configuration:**
- Workflows in `.github/workflows/`
- Branch protection rules documented
- Secrets inventory maintained

**Backup Script:**

```bash
#!/bin/bash
# backup-config.sh

BACKUP_DIR="./backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Export Vercel config
vercel env pull $BACKUP_DIR/vercel-env.txt

# Export GitHub workflow status
gh workflow list --json name,state > $BACKUP_DIR/workflows.json

# Export branch protection
gh api repos/:owner/:repo/branches/main/protection > $BACKUP_DIR/branch-protection.json

echo "Backup completed: $BACKUP_DIR"
```

### 3. Artifact Backups

**Build Artifacts:**
- Retained in GitHub Actions for 90 days
- Production builds archived permanently

**Design Assets:**
- Stored in repository under `assets/`
- Exported from design tools weekly

---

## Disaster Scenarios

### Scenario 1: Vercel Platform Outage

**Symptoms:**
- Production site unreachable
- Vercel status page shows incident
- No deployment possible

**Recovery Steps:**

1. **Immediate (0-15 min):**
   - Verify Vercel status
   - Enable maintenance page (if available)
   - Notify stakeholders

2. **Short-term (15-60 min):**
   - Prepare alternative deployment
   - Build locally for Netlify/AWS

3. **Fallback Deployment:**
   ```bash
   # Build production bundle
   npm run build

   # Deploy to Netlify (backup)
   netlify deploy --prod --dir=dist

   # Or deploy to AWS S3 + CloudFront
   aws s3 sync dist/ s3://neo-design-backup --delete
   aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"
   ```

4. **DNS Redirect (if extended outage):**
   - Update DNS to point to backup deployment
   - TTL: 300 seconds recommended

### Scenario 2: GitHub Outage

**Symptoms:**
- Cannot access repository
- CI/CD pipelines failing
- No code pushes possible

**Recovery Steps:**

1. **Immediate:**
   - Verify GitHub status
   - Use local repository copies

2. **Development Continuity:**
   ```bash
   # Work from local clone
   git log  # Verify local history
   git branch  # Check available branches

   # Push to backup remote (if configured)
   git remote add backup git@gitlab.com:neoloop/neo-design-system.git
   git push backup main
   ```

3. **Build from Local:**
   ```bash
   # Manual build and deploy
   npm run build
   vercel deploy --prod --prebuilt
   ```

### Scenario 3: Accidental Data Deletion

**Symptoms:**
- Files missing from repository
- Configuration deleted
- Environment variables lost

**Recovery Steps:**

1. **Code Recovery:**
   ```bash
   # Find deleted files
   git log --diff-filter=D --summary | grep delete

   # Recover specific file
   git checkout HEAD~1 -- path/to/file

   # Recover from specific commit
   git checkout <commit-sha> -- path/to/file
   ```

2. **Branch Recovery:**
   ```bash
   # Find deleted branch
   git reflog | grep <branch-name>

   # Recover branch
   git checkout -b <branch-name> <commit-sha>
   ```

3. **Configuration Recovery:**
   - Restore from documented backups
   - Re-apply environment variables from password manager
   - Re-configure branch protection rules

### Scenario 4: Security Breach

**Symptoms:**
- Unauthorized access detected
- Secrets potentially exposed
- Malicious code introduced

**Recovery Steps:**

1. **Immediate Containment:**
   ```bash
   # Revoke all tokens
   # (Do this via respective dashboards)

   # Rotate secrets
   vercel env rm VITE_API_KEY
   vercel env add VITE_API_KEY production
   ```

2. **Code Audit:**
   ```bash
   # Check recent commits
   git log --oneline -20

   # Identify potentially malicious changes
   git diff main~10..main

   # Revert if necessary
   git revert <malicious-commit>
   ```

3. **Full Recovery:**
   - Restore from known-good backup
   - Rotate ALL secrets
   - Enable additional security measures
   - Conduct full security audit

### Scenario 5: Complete Infrastructure Loss

**Symptoms:**
- All services unavailable
- No access to any platform
- Full system compromise

**Recovery Steps:**

1. **Establish New Infrastructure:**
   - Create new Vercel project
   - Create new GitHub repository (if needed)
   - Set up new domain/DNS

2. **Restore from Backups:**
   ```bash
   # Clone from backup
   git clone backup-location/neo-design-system.git

   # Initialize new Vercel project
   vercel link

   # Configure environment
   vercel env add VITE_ENV production
   vercel env add VITE_API_URL production
   # ... add all required env vars

   # Deploy
   vercel --prod
   ```

3. **Verify Recovery:**
   - Run all tests
   - Verify functionality
   - Check security configurations

---

## Recovery Procedures

### Full System Recovery Checklist

- [ ] Assess damage and scope
- [ ] Activate disaster recovery team
- [ ] Establish communication channel
- [ ] Restore source code from backup
- [ ] Create new infrastructure (if needed)
- [ ] Configure environment variables
- [ ] Deploy application
- [ ] Run verification tests
- [ ] Update DNS (if needed)
- [ ] Notify stakeholders
- [ ] Document incident
- [ ] Conduct postmortem

### Environment Recovery Order

1. **Production** (Priority 1)
   - Core application functionality
   - Essential API integrations

2. **Staging** (Priority 2)
   - Testing environment
   - Pre-production verification

3. **Documentation** (Priority 3)
   - Storybook
   - API documentation

4. **Development** (Priority 4)
   - CI/CD pipelines
   - Development tools

---

## Backup Verification

### Monthly Verification Checklist

- [ ] Test repository clone
- [ ] Verify backup integrity
- [ ] Test recovery procedure
- [ ] Update recovery documentation
- [ ] Review and rotate old backups

### Recovery Test Script

```bash
#!/bin/bash
# test-recovery.sh

echo "=== Disaster Recovery Test ==="
echo "Date: $(date)"

# Create isolated test directory
TEST_DIR=$(mktemp -d)
cd $TEST_DIR

# Clone repository
echo "Testing repository clone..."
git clone https://github.com/neoloop/neo-design-system.git
cd neo-design-system/neo-design-system-builder

# Install dependencies
echo "Testing dependency installation..."
npm ci

# Run tests
echo "Testing test suite..."
npm run test:ci

# Build application
echo "Testing production build..."
npm run build

# Verify build output
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo "SUCCESS: Build completed successfully"
else
    echo "FAILURE: Build verification failed"
    exit 1
fi

# Cleanup
cd /
rm -rf $TEST_DIR

echo "=== Recovery Test Complete ==="
```

---

## Contact Information

### Recovery Team

| Role | Name | Contact | Responsibility |
|------|------|---------|----------------|
| Recovery Lead | TBD | recovery@neoloop.com | Overall coordination |
| Infrastructure | TBD | infra@neoloop.com | Platform recovery |
| Development | TBD | dev@neoloop.com | Code restoration |
| Security | TBD | security@neoloop.com | Security verification |

### External Contacts

| Service | Support URL | Priority |
|---------|-------------|----------|
| Vercel | vercel.com/support | Critical |
| GitHub | support.github.com | Critical |
| Cloudflare | cloudflare.com/support | High |
| Sentry | sentry.io/support | Medium |

---

## Appendix

### Backup Locations

| Backup Type | Location | Retention |
|-------------|----------|-----------|
| Source Code | GitHub | Permanent |
| Build Artifacts | GitHub Actions | 90 days |
| Configuration | Documented | Current |
| Monthly Archives | Secure Storage | 1 year |

### Recovery Time Estimates

| Scenario | Estimated Recovery Time |
|----------|------------------------|
| Single file recovery | 5 minutes |
| Branch recovery | 15 minutes |
| Configuration restore | 30 minutes |
| Full application redeploy | 1-2 hours |
| Complete infrastructure rebuild | 4-8 hours |

---

**Document Owner:** DevOps Team
**Last Updated:** 2026-01-31
**Review Frequency:** Quarterly
**Next Review:** 2026-04-30
