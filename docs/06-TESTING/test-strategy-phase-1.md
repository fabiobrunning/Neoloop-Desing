# Test Strategy & Automation Foundation - Phase 1

**Document Version:** 1.0.0
**Date:** 2026-01-30
**Project:** Neoloop Design System Builder
**Author:** QA Agent (Astrid)
**Status:** Active

---

## Executive Summary

This document defines the comprehensive testing strategy for the Neoloop Design System Builder, with focus on Phase 1 components (Button, Input, Select, Card, Checkbox). The strategy establishes a foundation for automated testing that ensures quality, accessibility, and performance across the entire design system.

### Key Objectives

1. **100% Component Coverage** - All Phase 1 components tested exhaustively
2. **Accessibility First** - WCAG AA compliance for all UI elements
3. **Performance Baseline** - Establish metrics for bundle size and runtime performance
4. **CI/CD Integration** - Automated testing in GitHub Actions pipeline
5. **Developer Experience** - Fast test execution with helpful error messages

### Success Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Unit Test Coverage | 100% | 0% | Pending |
| Component Test Cases | 165+ | 0 | Pending |
| Accessibility Tests | WCAG AA | - | Pending |
| Performance Budget | <500KB | 245KB | Pass |
| Test Execution Time | <30s | - | Pending |

---

## 1. Testing Pyramid Strategy

```
                    /\
                   /  \
                  / E2E \          10% - Critical user flows (Phase 5)
                 /      \
                /--------\
               / Integration \     20% - Component interactions
              /              \
             /----------------\
            /   Unit Tests      \  70% - Components, utilities, hooks
           /____________________\
```

### Phase 1 Focus: Unit + Integration Tests

**Why this approach:**
- Fast feedback loop for developers
- Catches bugs early in development
- Easy to maintain and debug
- Can run in CI/CD without complex setup
- Provides documentation through test cases

---

## 2. Test Stack & Tools

### Core Testing Framework

| Tool | Version | Purpose | Rationale |
|------|---------|---------|-----------|
| **Vitest** | ^2.0.0 | Test runner | Fast, Vite-native, ESM support |
| **Testing Library** | ^16.0.0 | Component testing | User-centric testing approach |
| **@testing-library/react** | ^16.0.0 | React utilities | React-specific queries and utilities |
| **@testing-library/user-event** | ^14.5.0 | User interactions | Realistic user behavior simulation |
| **@testing-library/jest-dom** | ^6.5.0 | Custom matchers | Better assertions for DOM |

### Accessibility Testing

| Tool | Version | Purpose |
|------|---------|---------|
| **axe-core** | ^4.10.0 | Automated a11y checks |
| **@axe-core/react** | ^4.10.0 | React integration |
| **jest-axe** | ^9.0.0 | Vitest matchers for axe |

### Visual Regression (Phase 2)

| Tool | Version | Purpose |
|------|---------|---------|
| **Chromatic** | TBD | Visual diff testing |
| **Percy** | TBD | Alternative option |

### Performance Testing

| Tool | Version | Purpose |
|------|---------|---------|
| **@vitest/coverage-v8** | ^2.0.0 | Code coverage |
| **vite-plugin-bundle-size** | TBD | Bundle size tracking |
| **lighthouse-ci** | ^0.13.0 | Performance audits |

---

## 3. Test Coverage Requirements

### Coverage Targets by Type

```yaml
# vitest.config.ts coverage thresholds
coverage:
  lines: 100
  functions: 100
  branches: 90
  statements: 100
```

### Component Coverage Matrix

| Component | Unit Tests | Integration | A11y | Visual | E2E |
|-----------|------------|-------------|------|--------|-----|
| Button | 45 cases | ✓ | ✓ | Phase 2 | Phase 5 |
| Input | 35 cases | ✓ | ✓ | Phase 2 | Phase 5 |
| Select | 40 cases | ✓ | ✓ | Phase 2 | Phase 5 |
| Card | 25 cases | ✓ | ✓ | Phase 2 | Phase 5 |
| Checkbox | 20 cases | ✓ | ✓ | Phase 2 | Phase 5 |
| **Total** | **165+** | **5** | **5** | - | - |

### Test Categories

1. **Rendering Tests** (20%)
   - Component mounts without errors
   - Props are rendered correctly
   - Children are displayed
   - Default values applied

2. **Interaction Tests** (30%)
   - Click handlers fire
   - Keyboard navigation works
   - Focus management correct
   - State updates properly

3. **State Tests** (20%)
   - Disabled state
   - Loading state
   - Error state
   - Active/hover/focus states

4. **Accessibility Tests** (15%)
   - ARIA attributes present
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast validation

5. **Edge Cases** (15%)
   - Empty props
   - Invalid props
   - Boundary values
   - Error handling

---

## 4. Component Test Specifications

### 4.1 Button Component (45 Test Cases)

#### Variant Tests (8 variants × 3 states = 24 tests)

```typescript
describe('Button Variants', () => {
  const variants = ['primary', 'secondary', 'outline', 'ghost',
                    'danger', 'success', 'warning', 'link'];

  variants.forEach(variant => {
    describe(`${variant} variant`, () => {
      test('renders with correct styles', () => {});
      test('handles click events', () => {});
      test('shows disabled state correctly', () => {});
    });
  });
});
```

**Test Cases:**
1. Primary variant renders
2. Primary variant handles click
3. Primary variant disabled
4. Secondary variant renders
5. Secondary variant handles click
6. Secondary variant disabled
7. Outline variant renders
8. Outline variant handles click
9. Outline variant disabled
10. Ghost variant renders
11. Ghost variant handles click
12. Ghost variant disabled
13. Danger variant renders
14. Danger variant handles click
15. Danger variant disabled
16. Success variant renders
17. Success variant handles click
18. Success variant disabled
19. Warning variant renders
20. Warning variant handles click
21. Warning variant disabled
22. Link variant renders
23. Link variant handles click
24. Link variant disabled

#### Size Tests (5 sizes × 2 checks = 10 tests)

25. XS size renders correctly
26. XS size has correct padding
27. SM size renders correctly
28. SM size has correct padding
29. MD size renders correctly (default)
30. MD size has correct padding
31. LG size renders correctly
32. LG size has correct padding
33. XL size renders correctly
34. XL size has correct padding

#### Icon Tests (6 tests)

35. Icon left renders
36. Icon right renders
37. Both icons render
38. Icon-only button renders
39. Icon size scales with button size
40. Icons hidden during loading

#### Loading State Tests (3 tests)

41. Loading spinner appears
42. Loading text replaces children
43. Button disabled during loading

#### Accessibility Tests (2 tests)

44. Has no axe violations
45. Keyboard accessible (Enter/Space)

**Total: 45 test cases**

---

### 4.2 Input Component (35 Test Cases)

#### Type Tests (9 types × 2 checks = 18 tests)

```typescript
const inputTypes = ['text', 'email', 'password', 'number',
                    'tel', 'url', 'search', 'date', 'time'];

inputTypes.forEach(type => {
  test(`renders ${type} input correctly`, () => {});
  test(`accepts ${type} value changes`, () => {});
});
```

**Test Cases:**
1. Text input renders
2. Text input accepts value
3. Email input renders
4. Email input accepts value
5. Password input renders
6. Password input accepts value
7. Number input renders
8. Number input accepts value
9. Tel input renders
10. Tel input accepts value
11. URL input renders
12. URL input accepts value
13. Search input renders
14. Search input accepts value
15. Date input renders
16. Date input accepts value
17. Time input renders
18. Time input accepts value

#### State Tests (8 tests)

19. Disabled state works
20. Readonly state works
21. Required indicator shows
22. Error state displays
23. Success state displays
24. Focus state highlights
25. Hover state works
26. Placeholder text shows

#### Validation Tests (5 tests)

27. Required validation works
28. Email validation works
29. Min/max length validation
30. Pattern validation works
31. Custom validation function

#### Accessibility Tests (4 tests)

32. Label association correct
33. Error message announced
34. Required attribute set
35. No axe violations

**Total: 35 test cases**

---

### 4.3 Select Component (40 Test Cases)

#### Rendering Tests (5 tests)

1. Component mounts successfully
2. Label renders correctly
3. Placeholder shows when no selection
4. Default value selected
5. All options render

#### Interaction Tests (12 tests)

6. Opens dropdown on click
7. Closes dropdown on outside click
8. Closes dropdown on selection
9. Closes dropdown on Escape
10. Arrow keys navigate options
11. Enter key selects option
12. Space key opens dropdown
13. Home key jumps to first option
14. End key jumps to last option
15. Typing focuses matching option
16. Tab key closes dropdown
17. Selected option highlighted

#### Search/Filter Tests (6 tests)

18. Search input appears when enabled
19. Filters options on input
20. Shows "no results" message
21. Clears search on selection
22. Search is case-insensitive
23. Clears search on dropdown close

#### State Tests (8 tests)

24. Disabled state prevents interaction
25. Loading state shows spinner
26. Error state displays message
27. Multiple selection works
28. Clear button removes selection
29. Selected values display correctly
30. Dropdown position adjusts
31. Max selections enforced

#### Accessibility Tests (9 tests)

32. Has role="combobox"
33. aria-expanded updates
34. aria-haspopup set
35. aria-activedescendant updates
36. Options have role="option"
37. Selected option has aria-selected
38. Keyboard navigation announced
39. Label association correct
40. No axe violations

**Total: 40 test cases**

---

### 4.4 Card Component (25 Test Cases)

#### Layout Tests (5 layouts × 2 checks = 10 tests)

```typescript
const layouts = ['default', 'horizontal', 'minimal', 'product', 'feature'];

layouts.forEach(layout => {
  test(`${layout} layout renders correctly`, () => {});
  test(`${layout} layout applies correct classes`, () => {});
});
```

**Test Cases:**
1. Default layout renders
2. Default layout has correct structure
3. Horizontal layout renders
4. Horizontal layout has flex row
5. Minimal layout renders
6. Minimal layout has minimal padding
7. Product layout renders
8. Product layout has image slot
9. Feature layout renders
10. Feature layout has icon slot

#### Slot Rendering Tests (8 tests)

11. Header slot renders
12. Body slot renders
13. Footer slot renders
14. Image slot renders
15. Icon slot renders
16. Actions slot renders
17. Multiple slots render together
18. Empty slots don't break layout

#### Variant Tests (4 tests)

19. Elevated variant has shadow
20. Outlined variant has border
21. Filled variant has background
22. Flat variant has no elevation

#### Accessibility Tests (3 tests)

23. Has semantic HTML structure
24. Clickable cards have proper role
25. No axe violations

**Total: 25 test cases**

---

### 4.5 Checkbox Component (20 Test Cases)

#### Basic Tests (6 tests)

1. Renders unchecked by default
2. Renders checked when defaultChecked
3. Label text displays correctly
4. Handles click to toggle
5. Controlled value works
6. Uncontrolled value works

#### State Tests (6 tests)

7. Indeterminate state renders
8. Disabled state prevents interaction
9. Error state shows
10. Focus state highlights
11. Hover state works
12. Active (pressed) state works

#### Interaction Tests (4 tests)

13. Space key toggles
14. Enter key toggles (if in form)
15. Label click toggles checkbox
16. onChange event fires

#### Accessibility Tests (4 tests)

17. Has role="checkbox"
18. aria-checked updates correctly
19. aria-invalid set on error
20. No axe violations

**Total: 20 test cases**

---

## 5. Testing Utilities & Helpers

### 5.1 Custom Render Function

```typescript
// tests/utils/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { DesignSystemProvider } from '@/src/context/DesignSystemProvider';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: Partial<DesignSystemState>;
}

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { initialState, ...renderOptions } = options || {};

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <DesignSystemProvider initialState={initialState}>
        {children}
      </DesignSystemProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
```

### 5.2 Accessibility Testing Helper

```typescript
// tests/utils/a11y.ts
import { axe, toHaveNoViolations } from 'jest-axe';
import { RenderResult } from '@testing-library/react';

expect.extend(toHaveNoViolations);

export async function checkA11y(container: RenderResult['container']) {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

export async function checkA11yWithRules(
  container: RenderResult['container'],
  rules: string[]
) {
  const results = await axe(container, {
    rules: rules.reduce((acc, rule) => ({ ...acc, [rule]: { enabled: true } }), {})
  });
  expect(results).toHaveNoViolations();
}
```

### 5.3 User Event Helpers

```typescript
// tests/utils/user-events.ts
import userEvent from '@testing-library/user-event';

export function setupUser() {
  return userEvent.setup();
}

export async function clickElement(element: HTMLElement) {
  const user = setupUser();
  await user.click(element);
}

export async function typeIntoElement(element: HTMLElement, text: string) {
  const user = setupUser();
  await user.type(element, text);
}

export async function selectOption(selectElement: HTMLElement, optionText: string) {
  const user = setupUser();
  await user.selectOptions(selectElement, optionText);
}
```

### 5.4 Mock Data Factories

```typescript
// tests/mocks/component-props.ts
import { ButtonProps, InputProps, SelectProps, CardProps, CheckboxProps } from '@/components';

export const mockButtonProps = (overrides?: Partial<ButtonProps>): ButtonProps => ({
  variant: 'primary',
  size: 'md',
  children: 'Click me',
  ...overrides
});

export const mockInputProps = (overrides?: Partial<InputProps>): InputProps => ({
  type: 'text',
  label: 'Test Input',
  placeholder: 'Enter text',
  ...overrides
});

export const mockSelectProps = (overrides?: Partial<SelectProps>): SelectProps => ({
  label: 'Test Select',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ],
  ...overrides
});

export const mockCardProps = (overrides?: Partial<CardProps>): CardProps => ({
  children: 'Card content',
  ...overrides
});

export const mockCheckboxProps = (overrides?: Partial<CheckboxProps>): CheckboxProps => ({
  label: 'Test Checkbox',
  ...overrides
});
```

---

## 6. Performance Benchmarks

### 6.1 Bundle Size Baseline (Current State)

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Initial Bundle** | 245 KB | <500 KB | ✅ Pass |
| **Main Chunk** | 185 KB | <300 KB | ✅ Pass |
| **Lazy Chunks** | 10 chunks | - | - |
| **Total Gzipped** | ~75 KB | <150 KB | ✅ Pass |

### 6.2 Component Size Budget

| Component | Size (gzipped) | Budget | Status |
|-----------|----------------|--------|--------|
| Button | ~2 KB | <5 KB | TBD |
| Input | ~3 KB | <5 KB | TBD |
| Select | ~5 KB | <8 KB | TBD |
| Card | ~2 KB | <5 KB | TBD |
| Checkbox | ~1.5 KB | <3 KB | TBD |

### 6.3 Runtime Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to Interactive** | <3s | Lighthouse |
| **First Contentful Paint** | <1.5s | Lighthouse |
| **Largest Contentful Paint** | <2.5s | Lighthouse |
| **Cumulative Layout Shift** | <0.1 | Lighthouse |
| **Total Blocking Time** | <300ms | Lighthouse |

### 6.4 Component Render Performance

```typescript
// tests/performance/component-benchmarks.test.ts
import { render } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button Performance', () => {
  test('renders within performance budget', () => {
    const startTime = performance.now();

    render(<Button>Click me</Button>);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(16); // 60fps budget
  });

  test('handles 100 rapid clicks without degradation', async () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');

    const startTime = performance.now();

    for (let i = 0; i < 100; i++) {
      button.click();
    }

    const endTime = performance.now();
    const totalTime = endTime - startTime;

    expect(totalTime).toBeLessThan(100); // <1ms per click
  });
});
```

---

## 7. Accessibility Testing Plan

### 7.1 WCAG AA Compliance Checklist

#### Perceivable
- [ ] **1.1.1** Text alternatives for non-text content
- [ ] **1.3.1** Info and relationships programmatically determined
- [ ] **1.3.2** Meaningful sequence preserved
- [ ] **1.4.1** Color not sole means of conveying information
- [ ] **1.4.3** Contrast ratio at least 4.5:1 (text)
- [ ] **1.4.3** Contrast ratio at least 3:1 (large text, UI components)
- [ ] **1.4.4** Text can be resized up to 200%
- [ ] **1.4.10** Reflow content without horizontal scrolling (320px)
- [ ] **1.4.11** Non-text contrast at least 3:1

#### Operable
- [ ] **2.1.1** All functionality keyboard accessible
- [ ] **2.1.2** No keyboard trap
- [ ] **2.4.3** Logical focus order
- [ ] **2.4.7** Visible focus indicator
- [ ] **2.5.1** Complex gestures have single-pointer alternative
- [ ] **2.5.3** Label in name matches accessible name

#### Understandable
- [ ] **3.1.1** Language of page programmatically determined
- [ ] **3.2.1** Focus doesn't trigger unexpected context change
- [ ] **3.2.2** Input doesn't trigger unexpected context change
- [ ] **3.3.1** Error messages identify errors
- [ ] **3.3.2** Labels provided for inputs
- [ ] **3.3.3** Error suggestions provided
- [ ] **3.3.4** Error prevention for legal/financial/data

#### Robust
- [ ] **4.1.1** Valid HTML (parsing)
- [ ] **4.1.2** Name, role, value for UI components
- [ ] **4.1.3** Status messages programmatically determined

### 7.2 Automated Accessibility Tests

```typescript
// tests/a11y/component-accessibility.test.ts
import { render } from '@/tests/utils/test-utils';
import { checkA11y } from '@/tests/utils/a11y';
import { Button, Input, Select, Card, Checkbox } from '@/components';

describe('Component Accessibility', () => {
  describe('Button', () => {
    test('has no axe violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      await checkA11y(container);
    });

    test('is keyboard accessible', async () => {
      const onClick = vi.fn();
      const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
      const button = getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalled();

      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Input', () => {
    test('has no axe violations', async () => {
      const { container } = render(
        <Input label="Email" type="email" />
      );
      await checkA11y(container);
    });

    test('label is properly associated', () => {
      const { getByLabelText } = render(
        <Input label="Email" type="email" id="email-input" />
      );
      const input = getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });

    test('error message is announced', () => {
      const { getByRole } = render(
        <Input label="Email" error="Invalid email" />
      );
      const input = getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAccessibleDescription(/Invalid email/);
    });
  });

  // ... similar for Select, Card, Checkbox
});
```

### 7.3 Keyboard Navigation Tests

```typescript
// tests/a11y/keyboard-navigation.test.ts
describe('Keyboard Navigation', () => {
  test('Tab navigates through all focusable elements', async () => {
    const { getByRole } = render(
      <div>
        <Button>First</Button>
        <Input label="Email" />
        <Select label="Country" options={[...]} />
        <Checkbox label="Accept terms" />
        <Button>Submit</Button>
      </div>
    );

    const firstButton = getByRole('button', { name: 'First' });
    const input = getByRole('textbox');
    const select = getByRole('combobox');
    const checkbox = getByRole('checkbox');
    const submitButton = getByRole('button', { name: 'Submit' });

    firstButton.focus();
    expect(firstButton).toHaveFocus();

    await userEvent.tab();
    expect(input).toHaveFocus();

    await userEvent.tab();
    expect(select).toHaveFocus();

    await userEvent.tab();
    expect(checkbox).toHaveFocus();

    await userEvent.tab();
    expect(submitButton).toHaveFocus();

    // Shift+Tab goes backwards
    await userEvent.tab({ shift: true });
    expect(checkbox).toHaveFocus();
  });

  test('Escape key closes dropdown', async () => {
    const { getByRole, queryByRole } = render(
      <Select label="Country" options={[...]} />
    );

    const select = getByRole('combobox');
    await userEvent.click(select);

    expect(getByRole('listbox')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });
});
```

### 7.4 Screen Reader Testing

**Manual Testing Checklist:**

- [ ] Button announces role and label
- [ ] Button announces disabled state
- [ ] Button announces loading state
- [ ] Input announces label and type
- [ ] Input announces error messages
- [ ] Input announces required state
- [ ] Select announces role and label
- [ ] Select announces expanded state
- [ ] Select announces selected option
- [ ] Select announces filtered results count
- [ ] Checkbox announces checked state
- [ ] Checkbox announces indeterminate state
- [ ] Card structure is logical
- [ ] Focus indicators are visible at 200% zoom

**Tools:**
- VoiceOver (macOS)
- NVDA (Windows)
- JAWS (Windows)
- TalkBack (Android)
- VoiceOver (iOS)

---

## 8. CI/CD Integration Specifications

### 8.1 GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type checking
        run: npm run typecheck

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

      - name: Run accessibility tests
        run: npm run test:a11y

      - name: Generate coverage report
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage/coverage-final.json
          fail_ci_if_error: true

      - name: Check bundle size
        run: npm run test:bundle-size

      - name: Run performance tests
        run: npm run test:performance

  lighthouse:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Install dependencies
        run: npm ci

      - name: Build production
        run: npm run build

      - name: Run Lighthouse CI
        run: npm run test:lighthouse
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 8.2 Test Scripts (package.json)

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --reporter=verbose",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:a11y": "vitest run --config vitest.a11y.config.ts",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:ui": "vitest --ui",
    "test:bundle-size": "vite-bundle-visualizer",
    "test:performance": "vitest run --config vitest.performance.config.ts",
    "test:lighthouse": "lhci autorun",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0"
  }
}
```

### 8.3 Coverage Requirements

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/types/**',
        'src/**/__tests__/**'
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 90,
        statements: 100
      }
    }
  }
});
```

### 8.4 Failure Thresholds

| Check | Threshold | Action on Failure |
|-------|-----------|-------------------|
| Unit tests fail | Any failure | Block PR merge |
| Coverage < 100% | Lines/Functions | Block PR merge |
| Coverage < 90% | Branches | Block PR merge |
| Accessibility violations | Any violation | Block PR merge |
| Bundle size > 500KB | +10% increase | Warning (review required) |
| Lighthouse Performance < 90 | Score | Warning (review required) |
| TypeScript errors | Any error | Block PR merge |
| Lint warnings | >0 warnings | Block PR merge |

---

## 9. Test Execution Plan

### 9.1 Development Workflow

```bash
# Before starting work
git pull origin develop
npm install

# During development (watch mode)
npm run test:watch

# Before committing
npm run typecheck
npm run lint
npm run test:unit

# Before opening PR
npm run test:coverage
npm run test:a11y
npm run test:bundle-size
```

### 9.2 Pre-commit Hooks

```json
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run typecheck || exit 1
npm run lint || exit 1
npm run test:unit || exit 1
```

### 9.3 Pre-push Hooks

```json
// .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:coverage || exit 1
npm run test:a11y || exit 1
```

---

## 10. Test Documentation Standards

### 10.1 Test File Naming

```
components/
├── Button.tsx
├── Button.test.tsx              # Unit tests
├── Button.integration.test.tsx  # Integration tests
├── Button.a11y.test.tsx         # Accessibility tests
└── __tests__/
    ├── Button.spec.tsx
    └── Button.performance.test.tsx
```

### 10.2 Test Case Naming Convention

```typescript
// ✅ Good - Descriptive and follows pattern
test('renders primary button with correct styles', () => {});
test('handles click event and calls onClick handler', () => {});
test('shows loading spinner when loading prop is true', () => {});

// ❌ Bad - Too vague
test('works', () => {});
test('button', () => {});
test('test1', () => {});
```

### 10.3 Test Organization

```typescript
describe('Button Component', () => {
  // Setup
  const defaultProps = { children: 'Click me' };

  describe('Rendering', () => {
    test('renders without crashing', () => {});
    test('renders children correctly', () => {});
  });

  describe('Variants', () => {
    test('applies primary variant styles', () => {});
    test('applies secondary variant styles', () => {});
  });

  describe('Interactions', () => {
    test('calls onClick when clicked', () => {});
    test('does not call onClick when disabled', () => {});
  });

  describe('Accessibility', () => {
    test('has no axe violations', async () => {});
    test('is keyboard accessible', async () => {});
  });

  describe('Edge Cases', () => {
    test('handles undefined onClick gracefully', () => {});
    test('handles invalid variant prop', () => {});
  });
});
```

---

## 11. Performance Monitoring

### 11.1 Bundle Size Tracking

```javascript
// vite.config.ts - bundle size plugin
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});
```

### 11.2 Lighthouse CI Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4173/'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

---

## 12. Next Steps & Roadmap

### Phase 1 (Current) - Foundation
- [x] Test strategy documented
- [ ] Vitest + Testing Library setup
- [ ] 165+ test cases implemented
- [ ] 100% coverage achieved
- [ ] CI/CD pipeline configured
- [ ] Accessibility baseline established

### Phase 2 - Visual Regression
- [ ] Chromatic integration
- [ ] Visual diff baselines
- [ ] Component storybook stories
- [ ] Cross-browser testing

### Phase 3 - Integration Testing
- [ ] Component interaction tests
- [ ] Form validation flows
- [ ] Design token integration tests
- [ ] Context provider tests

### Phase 4 - Performance
- [ ] Component render benchmarks
- [ ] Bundle size monitoring
- [ ] Runtime performance tracking
- [ ] Memory leak detection

### Phase 5 - E2E Testing
- [ ] Playwright setup
- [ ] Critical user journey tests
- [ ] Cross-browser E2E
- [ ] Mobile E2E testing

---

## Appendix A: Test Case Index

### Button (45 cases)
- Variants: 24 cases
- Sizes: 10 cases
- Icons: 6 cases
- Loading: 3 cases
- Accessibility: 2 cases

### Input (35 cases)
- Types: 18 cases
- States: 8 cases
- Validation: 5 cases
- Accessibility: 4 cases

### Select (40 cases)
- Rendering: 5 cases
- Interaction: 12 cases
- Search: 6 cases
- States: 8 cases
- Accessibility: 9 cases

### Card (25 cases)
- Layouts: 10 cases
- Slots: 8 cases
- Variants: 4 cases
- Accessibility: 3 cases

### Checkbox (20 cases)
- Basic: 6 cases
- States: 6 cases
- Interaction: 4 cases
- Accessibility: 4 cases

**Total: 165 test cases**

---

## Appendix B: References

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Web.dev Performance](https://web.dev/performance/)

---

**Document Status:** ✅ Complete
**Next Review:** After Phase 1 implementation
**Owner:** QA Agent (Astrid)
