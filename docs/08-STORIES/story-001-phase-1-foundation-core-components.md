# Story 001: Design System Phase 1 - Foundation & Core Components

**Story ID:** STORY-001
**Epic:** Neoloop Design System v1.0
**Phase:** 1 of 5
**Timeline:** Weeks 1-2 (14 days)
**Status:** IN_PROGRESS

---

## Overview

| Field | Value |
|-------|-------|
| Title | Design System Phase 1: Foundation & Core Components |
| Priority | P0 - Critical |
| Story Points | 21 |
| Start Date | 2026-01-27 |
| Target Date | 2026-02-09 |
| Owners | @architect, @dev, @ux-design-expert, @qa |
| Dependencies | None (Foundation Phase) |

---

## User Story

**As a** design system consumer (developer/designer)
**I want** a solid foundation with design tokens and core components
**So that** I can build consistent UIs with proper spacing, colors, typography, and basic interactive elements

---

## Acceptance Criteria

### Foundation (15 items) - 100% Complete Required

- [ ] **AC-001:** Color token system implemented with semantic naming (primary, secondary, accent, neutral, success, warning, error)
- [ ] **AC-002:** Typography scale defined with 8+ sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
- [ ] **AC-003:** Spacing scale implemented (4px base: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64)
- [ ] **AC-004:** Border radius tokens defined (none, sm, md, lg, xl, 2xl, full)
- [ ] **AC-005:** Shadow tokens implemented (none, sm, md, lg, xl, 2xl, inner)
- [ ] **AC-006:** Breakpoint tokens defined (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- [ ] **AC-007:** Z-index scale implemented (0, 10, 20, 30, 40, 50, auto)
- [ ] **AC-008:** Transition tokens defined (duration: 75, 100, 150, 200, 300, 500, 700, 1000ms)
- [ ] **AC-009:** Animation easing tokens (linear, ease-in, ease-out, ease-in-out)
- [ ] **AC-010:** Opacity tokens (0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100)
- [ ] **AC-011:** Font family tokens (sans, serif, mono)
- [ ] **AC-012:** Font weight tokens (thin, light, normal, medium, semibold, bold, extrabold, black)
- [ ] **AC-013:** Line height tokens (none, tight, snug, normal, relaxed, loose)
- [ ] **AC-014:** Letter spacing tokens (tighter, tight, normal, wide, wider, widest)
- [ ] **AC-015:** CSS variables exported and documented

### Core Components (5 items) - 100% Complete Required

- [ ] **AC-016:** Button component with variants (primary, secondary, outline, ghost, destructive) and sizes (sm, md, lg)
- [ ] **AC-017:** Input component with states (default, focus, error, disabled) and types (text, email, password, number)
- [ ] **AC-018:** Card component with header, body, footer slots and variants (default, elevated, outlined)
- [ ] **AC-019:** Badge component with variants (default, secondary, outline, destructive) and sizes (sm, md, lg)
- [ ] **AC-020:** Avatar component with sizes (xs, sm, md, lg, xl), fallback initials, and image support

### Testing & Documentation

- [ ] **AC-021:** Unit tests for all 5 core components (min 80% coverage)
- [ ] **AC-022:** Storybook stories for each component with all variants
- [ ] **AC-023:** Component API documentation (props, events, slots)
- [ ] **AC-024:** Design token documentation with visual previews
- [ ] **AC-025:** Accessibility audit passed (WCAG AA) for all components

---

## Tasks Breakdown

### Week 1: Foundation (Days 1-7)

#### T001: Token System Architecture (Day 1-2) - @architect
- [ ] Define token naming convention
- [ ] Create token file structure
- [ ] Implement CSS custom properties system
- [ ] Setup token build pipeline
- [ ] Document token architecture

**Deliverables:**
- `src/tokens/index.ts`
- `src/tokens/colors.ts`
- `src/tokens/typography.ts`
- `src/tokens/spacing.ts`
- `docs/03-ARCHITECTURE/decisions/001-token-architecture.md`

#### T002: Color Tokens Implementation (Day 2-3) - @dev, @ux-design-expert
- [ ] Define color palette (primary, secondary, accent)
- [ ] Create semantic color tokens
- [ ] Implement dark mode color variants
- [ ] WCAG contrast validation
- [ ] Export as CSS variables

**Deliverables:**
- `src/tokens/colors.ts`
- `src/styles/colors.css`
- `docs/02-DESIGN/color-system.md`
- WCAG contrast audit report

#### T003: Typography Tokens Implementation (Day 3-4) - @dev, @ux-design-expert
- [ ] Define type scale (modular scale 1.25)
- [ ] Font family tokens
- [ ] Font weight tokens
- [ ] Line height tokens
- [ ] Letter spacing tokens

**Deliverables:**
- `src/tokens/typography.ts`
- `src/styles/typography.css`
- `docs/02-DESIGN/typography-system.md`

#### T004: Spacing & Layout Tokens (Day 4-5) - @dev
- [ ] Spacing scale (4px base)
- [ ] Border radius tokens
- [ ] Shadow tokens
- [ ] Z-index scale
- [ ] Breakpoint tokens

**Deliverables:**
- `src/tokens/spacing.ts`
- `src/tokens/borders.ts`
- `src/tokens/shadows.ts`
- `src/styles/layout.css`

#### T005: Animation & Transition Tokens (Day 5-6) - @dev
- [ ] Transition duration tokens
- [ ] Animation easing tokens
- [ ] Opacity tokens
- [ ] Base animation utilities

**Deliverables:**
- `src/tokens/animations.ts`
- `src/styles/animations.css`

#### T006: Token Build & Export (Day 6-7) - @architect, @dev
- [ ] Token build pipeline
- [ ] CSS variable export
- [ ] JSON export
- [ ] TypeScript types export
- [ ] Documentation generation

**Deliverables:**
- `scripts/build-tokens.ts`
- `dist/tokens.css`
- `dist/tokens.json`
- `dist/tokens.d.ts`

### Week 2: Core Components (Days 8-14)

#### T007: Button Component (Day 8-9) - @dev
- [ ] Base button structure
- [ ] Variant styles (primary, secondary, outline, ghost, destructive)
- [ ] Size variants (sm, md, lg)
- [ ] Loading state
- [ ] Disabled state
- [ ] Icon support (left, right, icon-only)
- [ ] Unit tests
- [ ] Storybook stories

**Deliverables:**
- `src/components/Button/Button.tsx`
- `src/components/Button/Button.test.tsx`
- `src/components/Button/Button.stories.tsx`
- `src/components/Button/index.ts`

#### T008: Input Component (Day 9-10) - @dev
- [ ] Base input structure
- [ ] Input types (text, email, password, number)
- [ ] States (default, focus, error, disabled)
- [ ] Label integration
- [ ] Helper text / error message
- [ ] Icon support (prefix, suffix)
- [ ] Unit tests
- [ ] Storybook stories

**Deliverables:**
- `src/components/Input/Input.tsx`
- `src/components/Input/Input.test.tsx`
- `src/components/Input/Input.stories.tsx`
- `src/components/Input/index.ts`

#### T009: Card Component (Day 10-11) - @dev
- [ ] Base card structure
- [ ] Header slot
- [ ] Body slot
- [ ] Footer slot
- [ ] Variants (default, elevated, outlined)
- [ ] Clickable card variant
- [ ] Unit tests
- [ ] Storybook stories

**Deliverables:**
- `src/components/Card/Card.tsx`
- `src/components/Card/CardHeader.tsx`
- `src/components/Card/CardBody.tsx`
- `src/components/Card/CardFooter.tsx`
- `src/components/Card/Card.test.tsx`
- `src/components/Card/Card.stories.tsx`

#### T010: Badge Component (Day 11-12) - @dev
- [ ] Base badge structure
- [ ] Variants (default, secondary, outline, destructive)
- [ ] Sizes (sm, md, lg)
- [ ] Dot indicator variant
- [ ] Removable badge
- [ ] Unit tests
- [ ] Storybook stories

**Deliverables:**
- `src/components/Badge/Badge.tsx`
- `src/components/Badge/Badge.test.tsx`
- `src/components/Badge/Badge.stories.tsx`
- `src/components/Badge/index.ts`

#### T011: Avatar Component (Day 12-13) - @dev
- [ ] Base avatar structure
- [ ] Sizes (xs, sm, md, lg, xl)
- [ ] Image support
- [ ] Fallback initials
- [ ] Status indicator
- [ ] Avatar group
- [ ] Unit tests
- [ ] Storybook stories

**Deliverables:**
- `src/components/Avatar/Avatar.tsx`
- `src/components/Avatar/AvatarGroup.tsx`
- `src/components/Avatar/Avatar.test.tsx`
- `src/components/Avatar/Avatar.stories.tsx`
- `src/components/Avatar/index.ts`

#### T012: Testing & Documentation (Day 13-14) - @qa, @dev
- [ ] Run all unit tests
- [ ] Verify 80%+ coverage
- [ ] Accessibility audit (axe-core)
- [ ] Cross-browser testing
- [ ] Complete API documentation
- [ ] Review Storybook deployment

**Deliverables:**
- Test coverage report
- Accessibility audit report
- Component API docs
- Storybook live deployment

---

## Technical Specifications

### Token System Architecture

```typescript
// Token structure
interface TokenSystem {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
  animations: AnimationTokens;
}

// CSS Variable naming convention
--neoloop-{category}-{variant}-{modifier}
// Example: --neoloop-color-primary-500
```

### Component Architecture

```typescript
// Component structure
interface ComponentProps {
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// File structure per component
ComponentName/
├── ComponentName.tsx      // Main component
├── ComponentName.test.tsx // Unit tests
├── ComponentName.stories.tsx // Storybook
├── ComponentName.module.css  // Styles (optional)
└── index.ts              // Exports
```

---

## Definition of Done

- [ ] All 15 foundation tokens implemented and exported
- [ ] All 5 core components functional with all variants
- [ ] Unit test coverage >= 80%
- [ ] All Storybook stories created and reviewed
- [ ] WCAG AA compliance verified for all components
- [ ] Documentation complete and reviewed
- [ ] Code review approved by @architect
- [ ] QA sign-off by @qa

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Token naming conflicts | Medium | Low | Follow strict naming convention from day 1 |
| Component complexity creep | High | Medium | Stick to MVP specs, defer advanced features |
| Accessibility issues | High | Medium | Run axe-core in CI, @ux-design-expert review |
| Timeline slip | Medium | Low | Daily standups, early escalation |

---

## Progress Tracking

### Daily Checkpoints

| Day | Focus | Status | Blockers |
|-----|-------|--------|----------|
| Day 1 | Token architecture | [ ] | - |
| Day 2 | Token architecture + Colors | [ ] | - |
| Day 3 | Colors + Typography | [ ] | - |
| Day 4 | Typography + Spacing | [ ] | - |
| Day 5 | Spacing + Animations | [ ] | - |
| Day 6 | Token build pipeline | [ ] | - |
| Day 7 | Token export + docs | [ ] | - |
| Day 8 | Button component | [ ] | - |
| Day 9 | Button + Input start | [ ] | - |
| Day 10 | Input + Card start | [ ] | - |
| Day 11 | Card + Badge start | [ ] | - |
| Day 12 | Badge + Avatar start | [ ] | - |
| Day 13 | Avatar + Testing | [ ] | - |
| Day 14 | Testing + Documentation | [ ] | - |

### Metrics

- Foundation tokens: 0/15 complete
- Core components: 0/5 complete
- Test coverage: 0%
- Storybook stories: 0/25 planned
- Accessibility issues: TBD

---

## Files Changed

*(Updated as implementation progresses)*

| File | Action | Description |
|------|--------|-------------|
| - | - | - |

---

## Related Documents

- [PRD: Neoloop Design System](/docs/01-REQUIREMENTS/)
- [Architecture: Token System](/docs/03-ARCHITECTURE/)
- [Design: Color System](/docs/02-DESIGN/)
- [UX Strategy: Accessibility](/docs/02-DESIGN/ux-design-expert-estrategia-executiva.md)

---

**Story Created:** 2026-01-30
**Last Updated:** 2026-01-30
**Version:** 1.0
