# Testing Documentation - Neoloop Design System Builder

**Version:** 1.0.0
**Last Updated:** 2026-01-30
**Status:** Active

---

## Overview

This directory contains all testing documentation for the Neoloop Design System Builder project. The testing strategy follows a comprehensive approach covering unit tests, integration tests, accessibility tests, and performance benchmarks.

---

## Documentation Index

### 1. Strategy Documents

#### [Test Strategy - Phase 1](./test-strategy-phase-1.md)
Complete testing strategy for Phase 1 components with:
- Testing pyramid approach (70% unit, 20% integration, 10% E2E)
- Tool stack (Vitest, Testing Library, axe-core)
- 165+ test case specifications
- Accessibility testing plan (WCAG AA compliance)
- CI/CD integration specs
- Performance benchmarking

**Key Sections:**
- Component test specifications (Button, Input, Select, Card, Checkbox)
- Testing utilities and helpers
- Accessibility compliance checklist
- GitHub Actions workflow

#### [Baseline Metrics](./baseline-metrics.md)
Performance baseline and tracking metrics:
- Bundle size baseline (245 KB current, <500 KB target)
- Test coverage targets (100% for Phase 1)
- Lighthouse performance goals (>90 score)
- Component render performance benchmarks
- Historical tracking

---

## Quick Start

### Install Dependencies

```bash
cd neo-design-system-builder

# Install testing dependencies
npm install --save-dev \
  vitest \
  @vitest/ui \
  @vitest/coverage-v8 \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom \
  jsdom \
  axe-core \
  jest-axe \
  @axe-core/react \
  @lhci/cli
```

### Run Tests

```bash
# Run all tests
npm test

# Watch mode (during development)
npm run test:watch

# Run specific test suites
npm run test:unit              # Unit tests only
npm run test:integration       # Integration tests only
npm run test:a11y             # Accessibility tests only
npm run test:performance      # Performance benchmarks

# Generate coverage report
npm run test:coverage

# Open interactive UI
npm run test:ui
```

### Check Quality

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format check
npm run format:check

# Bundle size analysis
npm run test:bundle-size

# Lighthouse audit
npm run build
npm run test:lighthouse
```

---

## Test Structure

```
neo-design-system-builder/
├── tests/
│   ├── setup.ts                    # Global test setup
│   ├── setup-a11y.ts               # Accessibility setup
│   ├── utils/
│   │   ├── test-utils.tsx          # Custom render with providers
│   │   ├── a11y.ts                 # Accessibility helpers
│   │   └── user-events.ts          # User interaction helpers
│   ├── mocks/
│   │   └── component-props.ts      # Mock data factories
│   └── components/
│       ├── Button.test.tsx         # Unit tests
│       ├── Button.a11y.test.tsx    # Accessibility tests
│       ├── Input.test.tsx
│       ├── Select.test.tsx
│       ├── Card.test.tsx
│       └── Checkbox.test.tsx
├── vitest.config.ts                # Main Vitest config
├── vitest.integration.config.ts    # Integration tests config
├── vitest.a11y.config.ts          # Accessibility tests config
├── vitest.performance.config.ts   # Performance tests config
└── lighthouserc.js                # Lighthouse CI config
```

---

## Test Coverage Requirements

### Phase 1 Components

| Component | Test Cases | Coverage Target |
|-----------|------------|----------------|
| Button | 45 | 100% lines, 90% branches |
| Input | 35 | 100% lines, 90% branches |
| Select | 40 | 100% lines, 90% branches |
| Card | 25 | 100% lines, 90% branches |
| Checkbox | 20 | 100% lines, 90% branches |
| **Total** | **165+** | **100% average** |

### Thresholds

```typescript
coverage: {
  thresholds: {
    lines: 100,
    functions: 100,
    branches: 90,
    statements: 100
  }
}
```

---

## Writing Tests

### Test File Naming

```
ComponentName.test.tsx         # Unit tests
ComponentName.integration.test.tsx  # Integration tests
ComponentName.a11y.test.tsx    # Accessibility tests
ComponentName.performance.test.tsx  # Performance tests
```

### Basic Test Template

```typescript
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<MyComponent />);
      expect(screen.getByRole('...')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('handles click events', async () => {
      const onClick = vi.fn();
      render(<MyComponent onClick={onClick} />);

      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('has no axe violations', async () => {
      const { container } = render(<MyComponent />);
      await checkA11y(container);
    });
  });
});
```

### Accessibility Test Template

```typescript
import { checkA11y } from '@/tests/utils/a11y';

describe('Component Accessibility', () => {
  test('has no axe violations', async () => {
    const { container } = render(<Component />);
    await checkA11y(container);
  });

  test('is keyboard accessible', async () => {
    render(<Component />);
    const element = screen.getByRole('...');

    element.focus();
    expect(element).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    // Assert expected behavior
  });
});
```

---

## CI/CD Integration

### GitHub Actions Workflow

The test suite runs automatically on:
- Every push to `main` or `develop`
- Every pull request
- Manual workflow dispatch

**Jobs:**
1. **Test** - Run all tests with coverage
2. **Bundle Size** - Check bundle size limits
3. **Lighthouse** - Performance audit

### PR Requirements

All PRs must pass:
- [x] Unit tests (100% coverage)
- [x] Integration tests
- [x] Accessibility tests (zero violations)
- [x] Type checking (no errors)
- [x] Linting (zero warnings)
- [x] Bundle size check (<500 KB)

---

## Debugging Tests

### Interactive UI

```bash
npm run test:ui
```

Opens Vitest UI at `http://localhost:51204`

### Watch Mode

```bash
npm run test:watch
```

Re-runs tests on file changes

### Debug Single Test

```bash
# Run specific test file
npx vitest run tests/components/Button.test.tsx

# Run specific test case
npx vitest run tests/components/Button.test.tsx -t "renders without crashing"
```

### VS Code Debugging

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test:watch"],
  "console": "integratedTerminal"
}
```

---

## Performance Testing

### Component Render Benchmarks

```typescript
test('renders within 16ms budget', () => {
  const startTime = performance.now();
  render(<Component />);
  const renderTime = performance.now() - startTime;

  expect(renderTime).toBeLessThan(16); // 60fps
});
```

### Lighthouse CI

```bash
# Build production
npm run build

# Run Lighthouse
npm run test:lighthouse
```

Lighthouse reports saved to `./lighthouseci/`

---

## Best Practices

### Do's ✅

- Write descriptive test names
- Test user behavior, not implementation
- Use `screen` queries (not `container.querySelector`)
- Mock external dependencies
- Test accessibility for every component
- Keep tests isolated and independent
- Use `userEvent` for realistic interactions
- Assert on meaningful outcomes

### Don'ts ❌

- Don't test implementation details
- Don't use `waitFor` unless necessary
- Don't mock React hooks (test behavior)
- Don't skip accessibility tests
- Don't commit failing tests
- Don't ignore coverage thresholds
- Don't test third-party libraries

---

## Useful Commands

```bash
# Development workflow
npm run test:watch              # Watch mode
npm run test:ui                 # Interactive UI

# Quality checks
npm run typecheck              # TypeScript check
npm run lint                   # ESLint check
npm run format:check           # Prettier check

# CI commands
npm run test:ci                # CI test run with JUnit output
npm run test:coverage          # Generate coverage report
npm run test:lighthouse        # Lighthouse audit

# Specific test types
npm run test:unit              # Unit tests only
npm run test:integration       # Integration tests only
npm run test:a11y             # Accessibility tests only
npm run test:performance      # Performance tests only

# Analysis
npm run test:bundle-size      # Bundle size visualization
```

---

## Troubleshooting

### Tests Fail with "Cannot find module"

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Coverage Not Reaching 100%

```bash
# Check coverage report
npm run test:coverage

# Open HTML report
open coverage/index.html
```

### Accessibility Violations

```bash
# Run a11y tests with verbose output
npm run test:a11y -- --reporter=verbose
```

### Performance Tests Failing

```bash
# Run performance tests in isolation
npm run test:performance -- --no-threads
```

---

## Additional Resources

### External Documentation

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [jest-axe Documentation](https://github.com/nickcolley/jest-axe)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Internal Links

- [Test Strategy Document](./test-strategy-phase-1.md)
- [Baseline Metrics](./baseline-metrics.md)
- [Component Architecture](../03-ARCHITECTURE/component-architecture-diagram.md)
- [PRD](../01-REQUIREMENTS/prd-neoloop-design-system-builder-v1.0.md)

---

## Next Steps

### Phase 1 (Current)
- [ ] Implement 165+ test cases for Phase 1 components
- [ ] Achieve 100% test coverage
- [ ] Configure CI/CD pipeline
- [ ] Establish Lighthouse baseline

### Phase 2
- [ ] Visual regression tests (Chromatic)
- [ ] Component interaction tests
- [ ] Form validation flows
- [ ] Cross-browser testing

### Phase 3
- [ ] E2E tests with Playwright
- [ ] Mobile testing
- [ ] Performance monitoring
- [ ] Memory leak detection

---

**Document Owner:** QA Agent (Astrid)
**Last Review:** 2026-01-30
**Next Review:** After Phase 1 implementation
