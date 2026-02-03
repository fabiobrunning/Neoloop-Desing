# Next Steps - Test Strategy Implementation

**Status:** Ready for Execution
**Date:** 2026-01-30
**Phase:** 1 - Foundation Complete, Implementation Pending

---

## Immediate Actions Required

### 1. Install Testing Dependencies

```bash
cd "/Users/fabiobrunning/Library/Mobile Documents/iCloud~md~obsidian/Documents/Fabio BB/10-Negócios/10.02-Produto/Desing/neo-design-system-builder"

# Install all new dependencies
npm install
```

**Expected time:** 2-3 minutes

**New packages being installed:**
- @axe-core/react ^4.10.0
- @lhci/cli ^0.13.0
- @testing-library/jest-dom ^6.9.1
- @testing-library/react ^16.3.2
- @testing-library/user-event ^14.6.1
- @vitest/coverage-v8 ^2.0.0
- @vitest/ui ^4.0.18
- axe-core ^4.10.0
- jest-axe ^9.0.0
- rollup-plugin-visualizer ^5.12.0
- vite-bundle-visualizer ^1.2.1

---

### 2. Verify Test Setup

```bash
# Run test suite (should show 2 test files with 45 cases)
npm run test:unit

# Expected output:
# ✓ tests/components/Button.test.tsx (45 tests)
# ✓ tests/components/Button.a11y.test.tsx (12 tests)
#
# Test Files  2 passed (2)
# Tests  57 passed (57)
```

**Expected time:** 10-15 seconds

---

### 3. Check Test Coverage

```bash
# Generate coverage report
npm run test:coverage

# Expected output:
# Coverage report generated in ./coverage/
#
# Current coverage:
# - Button.tsx: ~100% (fully tested)
# - Other components: 0% (not tested yet)
```

**Expected time:** 15-20 seconds

---

### 4. Open Test UI (Optional)

```bash
# Launch interactive test UI
npm run test:ui

# Browser will open at http://localhost:51204
```

This is useful for:
- Visualizing test execution
- Debugging failing tests
- Exploring test coverage
- Running specific tests

---

### 5. Run Type Checking

```bash
# Verify TypeScript compilation
npm run typecheck

# Expected output: No errors
```

**Expected time:** 5-10 seconds

---

### 6. Verify Build Process

```bash
# Build production bundle
npm run build

# Expected output:
# dist/index.html
# dist/assets/index-[hash].js
#
# Bundle size: ~245 KB (within 500 KB budget)
```

**Expected time:** 30-60 seconds

---

## Development Workflow

### Watch Mode (During Development)

```bash
# Start test watcher
npm run test:watch

# Tests will re-run automatically when files change
# Press 'a' to run all tests
# Press 'f' to run only failed tests
# Press 'q' to quit
```

**Use this when:**
- Writing new tests
- Fixing failing tests
- Refactoring code

---

### Run Specific Tests

```bash
# Run only Button tests
npm run test:unit Button

# Run only accessibility tests
npm run test:a11y

# Run performance tests
npm run test:performance
```

---

## Next Implementation Steps

### Week 1: Input Component Tests (35 cases)

Create `tests/components/Input.test.tsx`:

```typescript
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import { Input } from '@/components/Input'; // Adjust path as needed

describe('Input Component', () => {
  // Type Tests (18 cases)
  const inputTypes = ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'];

  inputTypes.forEach(type => {
    test(`renders ${type} input correctly`, () => {
      // Implementation here
    });

    test(`accepts ${type} value changes`, () => {
      // Implementation here
    });
  });

  // State Tests (8 cases)
  // Validation Tests (5 cases)
  // Accessibility Tests (4 cases)
});
```

**Expected output after completion:**
- 35 passing tests
- ~100% coverage for Input component

---

### Week 1: Select Component Tests (40 cases)

Create `tests/components/Select.test.tsx`:

```typescript
describe('Select Component', () => {
  // Rendering Tests (5 cases)
  // Interaction Tests (12 cases)
  // Search/Filter Tests (6 cases)
  // State Tests (8 cases)
  // Accessibility Tests (9 cases)
});
```

**Expected output after completion:**
- 40 passing tests
- ~100% coverage for Select component

---

### Week 2: Card Component Tests (25 cases)

Create `tests/components/Card.test.tsx`:

```typescript
describe('Card Component', () => {
  // Layout Tests (10 cases)
  // Slot Rendering Tests (8 cases)
  // Variant Tests (4 cases)
  // Accessibility Tests (3 cases)
});
```

**Expected output after completion:**
- 25 passing tests
- ~100% coverage for Card component

---

### Week 2: Checkbox Component Tests (20 cases)

Create `tests/components/Checkbox.test.tsx`:

```typescript
describe('Checkbox Component', () => {
  // Basic Tests (6 cases)
  // State Tests (6 cases)
  // Interaction Tests (4 cases)
  // Accessibility Tests (4 cases)
});
```

**Expected output after completion:**
- 20 passing tests
- ~100% coverage for Checkbox component

---

## Final Phase 1 Verification

### After All Tests Implemented

```bash
# 1. Run all tests
npm run test:unit

# Expected output:
# Test Files  5 passed (5)
# Tests  165 passed (165)
# Duration: <30s

# 2. Check coverage
npm run test:coverage

# Expected output:
# Lines: 100%
# Functions: 100%
# Branches: 90%+
# Statements: 100%

# 3. Run accessibility tests
npm run test:a11y

# Expected output:
# 0 accessibility violations

# 4. Run all quality checks
npm run typecheck && npm run lint && npm run test:coverage

# Expected output: All passing
```

---

## CI/CD Setup (After Tests Complete)

### Configure GitHub Secrets

1. Go to GitHub repository settings
2. Add secrets:
   - `CODECOV_TOKEN` - From codecov.io
   - `LHCI_GITHUB_APP_TOKEN` - From Lighthouse CI

### Enable GitHub Actions

1. Commit all test files
2. Push to repository
3. GitHub Actions will run automatically
4. Check workflow at: `https://github.com/[user]/[repo]/actions`

---

## Troubleshooting

### Tests fail with "Cannot find module"

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Coverage not showing

```bash
# Delete coverage folder and regenerate
rm -rf coverage
npm run test:coverage
```

### Vitest UI not opening

```bash
# Check if port 51204 is in use
lsof -i :51204

# Kill process if needed
kill -9 [PID]

# Restart UI
npm run test:ui
```

### Type errors in tests

```bash
# Regenerate TypeScript declaration files
npm run typecheck

# Check vitest.config.ts path aliases
```

---

## Performance Targets

### Test Execution Time

| Test Suite | Target | Acceptable |
|------------|--------|------------|
| Unit tests | <10s | <30s |
| Integration | <20s | <60s |
| Accessibility | <30s | <90s |
| All tests | <30s | <120s |

### Coverage Report Generation

| Task | Target | Acceptable |
|------|--------|------------|
| Generate HTML | <5s | <15s |
| Upload to Codecov | <10s | <30s |

---

## Success Indicators

### Phase 1 Complete When:

- [x] All dependencies installed
- [ ] 165 test cases passing
- [ ] 100% line coverage
- [ ] 100% function coverage
- [ ] 90%+ branch coverage
- [ ] Zero accessibility violations
- [ ] All tests run in <30s
- [ ] CI/CD pipeline passing
- [ ] Documentation complete

### Ready for Phase 2 When:

- [ ] Phase 1 complete
- [ ] Lighthouse baseline established
- [ ] Performance metrics tracked
- [ ] Team trained on testing practices
- [ ] PR merge requirements enforced

---

## Resources

### Documentation

- [Test Strategy](./test-strategy-phase-1.md)
- [Baseline Metrics](./baseline-metrics.md)
- [Testing README](./README.md)
- [Implementation Summary](./test-strategy-implementation-summary.md)

### Quick Reference

```bash
# Most used commands
npm run test:watch       # Development
npm run test:coverage    # Check coverage
npm run test:ui         # Visual debugging
npm run lint            # Code quality
npm run typecheck       # Type safety
```

---

## Questions & Support

### Common Questions

**Q: How do I run a single test file?**
```bash
npx vitest run tests/components/Button.test.tsx
```

**Q: How do I debug a failing test?**
```bash
npm run test:ui
# Then navigate to failing test in browser
```

**Q: How do I skip a test temporarily?**
```typescript
test.skip('this test is skipped', () => {
  // Will not run
});
```

**Q: How do I run only one test?**
```typescript
test.only('only this test runs', () => {
  // Only this will run
});
```

---

## Timeline Estimate

### Optimistic (1 week)
- Day 1: Install + verify setup (2h)
- Day 2-3: Input tests (35 cases) (8h)
- Day 4-5: Select tests (40 cases) (10h)
- Day 6: Card tests (25 cases) (6h)
- Day 7: Checkbox tests (20 cases) (4h)

**Total:** ~30 hours

### Realistic (2 weeks)
- Week 1: Setup + Input + Select (20h)
- Week 2: Card + Checkbox + refinements (15h)

**Total:** ~35 hours

### Buffer (3 weeks)
- Includes time for:
  - Learning testing best practices
  - Debugging failing tests
  - CI/CD configuration
  - Documentation updates

---

**Document Status:** ✅ Ready for execution
**Last Updated:** 2026-01-30
**Next Review:** After Phase 1 implementation complete
