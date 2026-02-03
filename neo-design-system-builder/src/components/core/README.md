# Core Components - Phase 1 Implementation

## Overview

This directory contains the 5 core components implemented in Phase 1 (Sprint 1-2) of the Neoloop Design System Builder project.

## Components Delivered

### 1. Button Component

A versatile button component with 8 variants, 5 sizes, and full state management.

**Features:**
- ✅ 8 variants: primary, secondary, tertiary, danger, success, warning, info, ghost
- ✅ 5 sizes: xs, sm, md, lg, xl
- ✅ States: default, hover, active, disabled, loading
- ✅ Icon support (left/right positioning)
- ✅ Full TypeScript types
- ✅ Comprehensive unit tests
- ✅ Storybook stories with all variants

**Files:**
- `Button.tsx` - Component implementation
- `Button.test.tsx` - Unit tests
- `Button.stories.tsx` - Storybook stories

### 2. Input Component

A flexible input component with validation states and various input types.

**Features:**
- ✅ Types: text, email, password, number, tel, url
- ✅ States: default, focus, filled, disabled, error, success, warning
- ✅ Icon, prefix, suffix support
- ✅ Character count display
- ✅ Password visibility toggle
- ✅ Helper text and error messages
- ✅ Full TypeScript types
- ✅ Comprehensive unit tests
- ✅ Storybook stories

**Files:**
- `Input.tsx` - Component implementation
- `Input.test.tsx` - Unit tests
- `Input.stories.tsx` - Storybook stories

### 3. Select Component

A dropdown select component with search, multi-select, and validation states.

**Features:**
- ✅ Single and multiple selection
- ✅ Searchable/filterable options
- ✅ States: closed, open, disabled, error, loading
- ✅ Clearable selection
- ✅ Disabled options support
- ✅ Full TypeScript types
- ✅ Comprehensive unit tests
- ✅ Storybook stories

**Files:**
- `Select.tsx` - Component implementation
- `Select.test.tsx` - Unit tests
- `Select.stories.tsx` - Storybook stories

### 4. Card Component

A composable card component with multiple layouts and styles.

**Features:**
- ✅ 4 variants: blank, elevated, outline, filled
- ✅ 5 padding sizes: none, sm, md, lg, xl
- ✅ 5 shadow levels: none, sm, md, lg, xl
- ✅ 6 border radius options: none, sm, md, lg, xl, full
- ✅ Composition: Card, CardHeader, CardBody, CardFooter
- ✅ Clickable cards with keyboard support
- ✅ Full TypeScript types
- ✅ Comprehensive unit tests
- ✅ Storybook stories

**Files:**
- `Card.tsx` - Component implementation
- `Card.test.tsx` - Unit tests
- `Card.stories.tsx` - Storybook stories

### 5. Checkbox Component

A checkbox input with support for checked, unchecked, and indeterminate states.

**Features:**
- ✅ Checked/unchecked states
- ✅ Indeterminate state (for "select all")
- ✅ Disabled state
- ✅ Label and helper text
- ✅ Error states
- ✅ Full keyboard accessibility
- ✅ Full TypeScript types
- ✅ Comprehensive unit tests
- ✅ Storybook stories

**Files:**
- `Checkbox.tsx` - Component implementation
- `Checkbox.test.tsx` - Unit tests
- `Checkbox.stories.tsx` - Storybook stories

## Test Coverage

**Current Status:**
- ✅ 150+ unit tests passing
- ✅ ~82% test coverage
- ✅ All components tested for:
  - Rendering
  - User interactions
  - State management
  - Accessibility
  - Keyboard navigation

## Usage

### Import Components

```typescript
import {
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox
} from '@/src/components/core'
```

### Example Usage

```tsx
// Button
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Input
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  state="error"
  helperText="Invalid email"
/>

// Select
<Select
  options={options}
  value={selected}
  onChange={setSelected}
  searchable
  clearable
/>

// Card
<Card variant="elevated" shadow="md" padding="lg">
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    <p>Content</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Checkbox
<Checkbox
  label="Accept terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

## Development Commands

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Type check
npm run typecheck

# Lint
npm run lint
npm run lint:fix
```

## Accessibility

All components follow WCAG 2.1 AA accessibility standards:

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ Color contrast compliance (when using design system tokens)

## TypeScript Support

All components are fully typed with:
- ✅ Props interfaces exported
- ✅ Type inference support
- ✅ Strict mode compliant
- ✅ JSDoc documentation

## Performance

Components are optimized for performance:
- ✅ React.forwardRef for ref forwarding
- ✅ Efficient re-renders
- ✅ No unnecessary dependencies
- ✅ Lightweight bundle size

## Next Steps (Phase 2)

Planned improvements for future phases:
- [ ] Add RadioButton component
- [ ] Add Switch/Toggle component
- [ ] Add Slider component
- [ ] Add Progress component
- [ ] Add Badge component
- [ ] Add Avatar component
- [ ] Enhanced accessibility testing
- [ ] Visual regression testing
- [ ] Performance benchmarks

## Contributing

When adding new components:
1. Create component file: `ComponentName.tsx`
2. Add unit tests: `ComponentName.test.tsx`
3. Add Storybook stories: `ComponentName.stories.tsx`
4. Export from `index.ts`
5. Update this README
6. Ensure 80%+ test coverage
7. Follow existing patterns and conventions

---

**Sprint:** 1-2 (Weeks 1-2)
**Completude:** 5/5 components (100%)
**Test Coverage:** 82%+
**Status:** ✅ COMPLETE
