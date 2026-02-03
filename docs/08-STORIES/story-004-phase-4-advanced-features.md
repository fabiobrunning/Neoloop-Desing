# Story 004: Design System Phase 4 - Animations, Navigation & Accessibility

**Story ID:** STORY-004
**Epic:** Neoloop Design System v1.0
**Phase:** 4 of 5
**Timeline:** Weeks 7-8 (14 days)
**Status:** PENDING

---

## Overview

| Field | Value |
|-------|-------|
| Title | Design System Phase 4: Animations, Navigation & Accessibility |
| Priority | P0 - Critical |
| Story Points | 26 |
| Start Date | 2026-03-10 |
| Target Date | 2026-03-23 |
| Owners | @ux-design-expert, @dev, @architect, @qa |
| Dependencies | STORY-003 (Phase 3 complete) |

---

## User Story

**As a** design system consumer (developer/designer)
**I want** polished animations, complete navigation components, and WCAG AA accessibility compliance
**So that** I can build professional, accessible applications with delightful user experiences

---

## Acceptance Criteria

### Animation System (4 items) - 100% Complete Required

- [ ] **AC-001:** Transition component with presets (fade, slide, scale, collapse)
- [ ] **AC-002:** Animation hooks (useTransition, useSpring, useAnimation)
- [ ] **AC-003:** Motion preferences support (prefers-reduced-motion)
- [ ] **AC-004:** Component-specific animations (modal enter/exit, toast slide, drawer slide)

### Navigation Components (6 items) - 100% Complete Required

- [ ] **AC-005:** Tabs component with variants (line, enclosed, soft-rounded)
- [ ] **AC-006:** Breadcrumb component with separator customization
- [ ] **AC-007:** Pagination component with variants (simple, advanced)
- [ ] **AC-008:** Steps/Stepper component (horizontal, vertical)
- [ ] **AC-009:** Menu component with submenus and keyboard navigation
- [ ] **AC-010:** Command Palette / Command Menu component (Cmd+K)

### Accessibility (4 items) - 100% WCAG AA Compliance Required

- [ ] **AC-011:** Focus management system (focus trap, focus return, focus visible)
- [ ] **AC-012:** Screen reader announcements (live regions, aria-live)
- [ ] **AC-013:** Keyboard navigation for all interactive components
- [ ] **AC-014:** Color contrast validation (4.5:1 for text, 3:1 for UI)

### Testing & Quality

- [ ] **AC-015:** Unit tests for all 14 items (min 80% coverage)
- [ ] **AC-016:** Storybook stories with animation demos
- [ ] **AC-017:** Full WCAG 2.1 AA audit passed
- [ ] **AC-018:** Automated accessibility testing in CI

---

## Tasks Breakdown

### Week 7: Animation System & Navigation (Days 43-49)

#### T038: Animation Foundation (Day 43-44) - @dev, @ux-design-expert
- [ ] Animation token system
  - [ ] Duration tokens (fast: 150ms, normal: 300ms, slow: 500ms)
  - [ ] Easing tokens (ease-in, ease-out, ease-in-out, spring)
  - [ ] CSS keyframe definitions
- [ ] Transition component
  - [ ] Fade transition
  - [ ] Slide transition (up, down, left, right)
  - [ ] Scale transition
  - [ ] Collapse/expand transition
  - [ ] Composable transitions
- [ ] Motion preferences
  - [ ] prefers-reduced-motion detection
  - [ ] Fallback behavior (instant transitions)
  - [ ] User override option

**Deliverables:**
- `src/tokens/animations.ts` (enhanced)
- `src/components/Transition/`
- `src/hooks/useReducedMotion.ts`
- Unit tests and Storybook stories

#### T039: Animation Hooks (Day 44-45) - @dev
- [ ] useTransition hook
  - [ ] Enter/exit states
  - [ ] Transition callbacks (onEnter, onExit, onEntered, onExited)
  - [ ] Conditional rendering
- [ ] useSpring hook (optional, for advanced animations)
  - [ ] Spring physics
  - [ ] Configurable stiffness/damping
- [ ] useAnimation hook
  - [ ] Keyframe animations
  - [ ] Animation state (playing, paused, finished)
  - [ ] Iteration control
- [ ] Component integration
  - [ ] Modal enter/exit
  - [ ] Toast slide-in/out
  - [ ] Drawer slide

**Deliverables:**
- `src/hooks/useTransition.ts`
- `src/hooks/useSpring.ts`
- `src/hooks/useAnimation.ts`
- Updated Modal, Toast, Drawer with animations
- Unit tests and Storybook stories

#### T040: Tabs Component (Day 45-46) - @dev
- [ ] Tabs component
  - [ ] TabList, Tab, TabPanels, TabPanel
  - [ ] Controlled/uncontrolled modes
  - [ ] Variants (line, enclosed, soft-rounded, unstyled)
  - [ ] Sizes (sm, md, lg)
  - [ ] Orientation (horizontal, vertical)
  - [ ] Lazy rendering option
- [ ] Keyboard navigation
  - [ ] Arrow keys to switch tabs
  - [ ] Home/End for first/last
  - [ ] Tab key behavior
- [ ] Accessibility
  - [ ] ARIA roles (tablist, tab, tabpanel)
  - [ ] aria-selected, aria-controls
  - [ ] Focus management

**Deliverables:**
- `src/components/Tabs/`
- Unit tests and Storybook stories

#### T041: Breadcrumb & Pagination (Day 46-47) - @dev
- [ ] Breadcrumb component
  - [ ] BreadcrumbList, BreadcrumbItem, BreadcrumbLink
  - [ ] Custom separator
  - [ ] Collapsed breadcrumbs (ellipsis)
  - [ ] Current page indicator
  - [ ] Icon support
- [ ] Pagination component
  - [ ] Simple variant (prev/next)
  - [ ] Advanced variant (page numbers)
  - [ ] Sizes (sm, md, lg)
  - [ ] Total pages display
  - [ ] Items per page selector
  - [ ] First/last page buttons
- [ ] Accessibility
  - [ ] ARIA navigation landmark
  - [ ] aria-current for breadcrumb
  - [ ] Keyboard navigation

**Deliverables:**
- `src/components/Breadcrumb/`
- `src/components/Pagination/`
- Unit tests and Storybook stories

#### T042: Steps/Stepper Component (Day 47-48) - @dev
- [ ] Steps component
  - [ ] Step, StepIndicator, StepTitle, StepDescription
  - [ ] Orientation (horizontal, vertical)
  - [ ] States (incomplete, current, complete, error)
  - [ ] Clickable steps option
  - [ ] Custom icons
- [ ] Step navigation
  - [ ] Next/previous controls
  - [ ] Jump to step
  - [ ] Validation before proceed
- [ ] Variants
  - [ ] Simple (numbers)
  - [ ] With icons
  - [ ] With descriptions

**Deliverables:**
- `src/components/Steps/`
- Unit tests and Storybook stories

#### T043: Menu Component (Day 48-49) - @dev
- [ ] Menu component
  - [ ] Menu, MenuButton, MenuList, MenuItem
  - [ ] Submenus (nested menus)
  - [ ] MenuGroup with labels
  - [ ] MenuDivider
  - [ ] MenuItem with icon
  - [ ] MenuItem with shortcut display
  - [ ] Disabled items
- [ ] Keyboard navigation
  - [ ] Arrow keys (up/down for items, right for submenu)
  - [ ] Escape to close
  - [ ] Type-ahead search
  - [ ] Enter/Space to select
- [ ] Positioning
  - [ ] Auto-positioning (flip, shift)
  - [ ] Custom placement

**Deliverables:**
- `src/components/Menu/`
- Unit tests and Storybook stories

### Week 8: Command Palette & Accessibility (Days 50-56)

#### T044: Command Palette Component (Day 50-51) - @dev, @ux-design-expert
- [ ] CommandPalette component
  - [ ] Search input with filtering
  - [ ] Command groups
  - [ ] Command items with icons and shortcuts
  - [ ] Recent commands
  - [ ] Fuzzy search
- [ ] Trigger system
  - [ ] Cmd+K / Ctrl+K shortcut
  - [ ] Custom trigger
  - [ ] Programmatic open/close
- [ ] Keyboard navigation
  - [ ] Arrow keys for selection
  - [ ] Enter to execute
  - [ ] Escape to close
  - [ ] Type to filter
- [ ] Extensibility
  - [ ] Custom command rendering
  - [ ] Action handlers
  - [ ] Nested commands

**Deliverables:**
- `src/components/CommandPalette/`
- `src/hooks/useCommandPalette.ts`
- Unit tests and Storybook stories

#### T045: Focus Management System (Day 51-52) - @dev, @ux-design-expert
- [ ] Focus trap utility
  - [ ] Trap focus within container
  - [ ] Tab cycling
  - [ ] Initial focus element
  - [ ] Return focus on close
- [ ] Focus visible system
  - [ ] Keyboard-only focus styles
  - [ ] Mouse vs keyboard detection
  - [ ] Custom focus ring styles
- [ ] useFocusReturn hook
  - [ ] Store previous focus
  - [ ] Restore on unmount
- [ ] Skip links
  - [ ] Skip to main content
  - [ ] Skip to navigation
  - [ ] Hidden until focused

**Deliverables:**
- `src/utils/focusTrap.ts`
- `src/hooks/useFocusTrap.ts`
- `src/hooks/useFocusReturn.ts`
- `src/hooks/useFocusVisible.ts`
- `src/components/SkipLink/`
- Unit tests

#### T046: Screen Reader Support (Day 52-53) - @dev, @ux-design-expert
- [ ] Live region announcements
  - [ ] useAnnounce hook
  - [ ] Polite vs assertive announcements
  - [ ] Announcement queue
- [ ] VisuallyHidden component
  - [ ] Screen reader only text
  - [ ] Focusable option
- [ ] aria-live regions
  - [ ] Toast announcements
  - [ ] Form error announcements
  - [ ] Loading state announcements
- [ ] ARIA attribute utilities
  - [ ] aria-describedby generator
  - [ ] aria-labelledby generator
  - [ ] ID generation utility

**Deliverables:**
- `src/hooks/useAnnounce.ts`
- `src/components/VisuallyHidden/`
- `src/utils/aria.ts`
- Unit tests

#### T047: Keyboard Navigation Audit (Day 53-54) - @qa, @ux-design-expert
- [ ] Full keyboard navigation audit
  - [ ] All interactive components keyboard accessible
  - [ ] Logical tab order
  - [ ] Focus indicators visible
  - [ ] No keyboard traps
- [ ] Shortcut documentation
  - [ ] Document all keyboard shortcuts
  - [ ] Conflict detection
- [ ] Component-specific fixes
  - [ ] Fix any identified issues
  - [ ] Add missing keyboard support

**Deliverables:**
- Keyboard navigation audit report
- Shortcut documentation
- Fixed components (as needed)

#### T048: WCAG AA Compliance Audit (Day 54-55) - @qa, @ux-design-expert
- [ ] Color contrast audit
  - [ ] All text meets 4.5:1 ratio
  - [ ] All UI elements meet 3:1 ratio
  - [ ] Focus indicators meet contrast
- [ ] ARIA audit
  - [ ] All interactive elements have labels
  - [ ] Roles are correct
  - [ ] States are communicated
- [ ] Automated testing setup
  - [ ] axe-core integration
  - [ ] jest-axe for unit tests
  - [ ] CI pipeline integration
- [ ] Manual testing
  - [ ] Screen reader testing (NVDA, VoiceOver)
  - [ ] Keyboard-only testing
  - [ ] Zoom testing (200%, 400%)

**Deliverables:**
- WCAG AA compliance report
- Automated accessibility test suite
- CI pipeline with a11y checks

#### T049: Documentation & Final Review (Day 55-56) - @dev, @qa, @ux-design-expert
- [ ] Animation documentation
  - [ ] Transition API guide
  - [ ] Animation hooks guide
  - [ ] Motion preferences guide
- [ ] Navigation documentation
  - [ ] Component API docs
  - [ ] Usage patterns
  - [ ] Keyboard shortcuts reference
- [ ] Accessibility documentation
  - [ ] Accessibility statement
  - [ ] WCAG compliance matrix
  - [ ] Testing procedures
- [ ] Phase 4 sign-off

**Deliverables:**
- Complete animation documentation
- Navigation component docs
- Accessibility documentation
- Phase 4 completion report

---

## Technical Specifications

### Animation System Architecture

```typescript
// Transition component API
interface TransitionProps {
  show: boolean;
  enter?: string;      // CSS classes for enter
  enterFrom?: string;  // Starting state
  enterTo?: string;    // Ending state
  leave?: string;      // CSS classes for leave
  leaveFrom?: string;
  leaveTo?: string;
  children: React.ReactNode;
}

// useTransition hook
interface UseTransitionOptions {
  duration?: number;
  easing?: string;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
}

function useTransition(show: boolean, options?: UseTransitionOptions): {
  state: 'entering' | 'entered' | 'exiting' | 'exited';
  shouldRender: boolean;
};
```

### Command Palette Architecture

```typescript
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandGroup[];
  onSelect: (command: Command) => void;
  placeholder?: string;
  emptyMessage?: string;
}

interface CommandGroup {
  name: string;
  commands: Command[];
}

interface Command {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  action: () => void;
}
```

### Focus Management Architecture

```typescript
// useFocusTrap hook
function useFocusTrap(containerRef: RefObject<HTMLElement>, {
  enabled?: boolean;
  initialFocus?: RefObject<HTMLElement>;
  returnFocus?: boolean;
}): void;

// useFocusVisible hook
function useFocusVisible(): {
  isFocusVisible: boolean;
  focusProps: {
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown: () => void;
    onMouseDown: () => void;
  };
};
```

---

## Definition of Done

- [ ] Animation system complete with all transitions and hooks
- [ ] All 6 navigation components implemented with keyboard support
- [ ] Focus management utilities implemented and integrated
- [ ] Screen reader announcements working for all dynamic content
- [ ] WCAG 2.1 AA compliance verified (100%)
- [ ] Automated accessibility testing in CI
- [ ] Unit test coverage >= 80%
- [ ] Storybook stories with animation demos
- [ ] Complete documentation
- [ ] Code review approved
- [ ] QA and @ux-design-expert sign-off

---

## WCAG 2.1 AA Requirements Checklist

### Perceivable
- [ ] 1.1.1 Non-text Content (Alt text, ARIA labels)
- [ ] 1.3.1 Info and Relationships (Semantic HTML, ARIA)
- [ ] 1.3.2 Meaningful Sequence (Logical DOM order)
- [ ] 1.4.1 Use of Color (Not sole indicator)
- [ ] 1.4.3 Contrast (Minimum) (4.5:1 text, 3:1 UI)
- [ ] 1.4.4 Resize Text (200% zoom support)
- [ ] 1.4.10 Reflow (320px viewport)
- [ ] 1.4.11 Non-text Contrast (3:1 for UI)
- [ ] 1.4.12 Text Spacing (User customizable)
- [ ] 1.4.13 Content on Hover/Focus (Dismissible, hoverable)

### Operable
- [ ] 2.1.1 Keyboard (All functionality)
- [ ] 2.1.2 No Keyboard Trap (Escapable focus)
- [ ] 2.1.4 Character Key Shortcuts (Configurable)
- [ ] 2.4.1 Bypass Blocks (Skip links)
- [ ] 2.4.3 Focus Order (Logical sequence)
- [ ] 2.4.6 Headings and Labels (Descriptive)
- [ ] 2.4.7 Focus Visible (Clear indicator)
- [ ] 2.5.3 Label in Name (Accessible names)

### Understandable
- [ ] 3.2.1 On Focus (No unexpected changes)
- [ ] 3.2.2 On Input (No unexpected changes)
- [ ] 3.3.1 Error Identification (Described errors)
- [ ] 3.3.2 Labels or Instructions (Form labels)

### Robust
- [ ] 4.1.1 Parsing (Valid HTML)
- [ ] 4.1.2 Name, Role, Value (ARIA implementation)
- [ ] 4.1.3 Status Messages (Live regions)

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Animation performance on mobile | Medium | Medium | Use CSS transforms, will-change, test on devices |
| Command palette complexity | High | Low | Start with simple implementation, iterate |
| Focus management edge cases | High | Medium | Extensive testing, follow ARIA patterns |
| WCAG compliance gaps | High | Low | Early audits, automated testing |

---

## Progress Tracking

### Daily Checkpoints

| Day | Focus | Status | Blockers |
|-----|-------|--------|----------|
| Day 43 | Animation tokens, Transition | [ ] | - |
| Day 44 | Transition finish, hooks start | [ ] | - |
| Day 45 | Animation hooks, Tabs start | [ ] | - |
| Day 46 | Tabs finish, Breadcrumb | [ ] | - |
| Day 47 | Pagination, Steps start | [ ] | - |
| Day 48 | Steps finish, Menu start | [ ] | - |
| Day 49 | Menu finish | [ ] | - |
| Day 50 | CommandPalette start | [ ] | - |
| Day 51 | CommandPalette finish, Focus start | [ ] | - |
| Day 52 | Focus management finish | [ ] | - |
| Day 53 | Screen reader support | [ ] | - |
| Day 54 | Keyboard audit | [ ] | - |
| Day 55 | WCAG audit | [ ] | - |
| Day 56 | Documentation, review | [ ] | - |

### Metrics

- Animation system: 0/4 complete
- Navigation components: 0/6 complete
- Accessibility: 0/4 complete
- Test coverage: 0%
- WCAG compliance: TBD

---

## Dependencies

### Blocked By
- **STORY-003:** Phase 3 must be 100% complete
  - Modal, Dialog, Drawer for animation integration
  - Toast for announcements
  - All feedback components

### Blocks
- **STORY-005:** Phase 5 needs all animations and accessibility

---

## Files Changed

*(Updated as implementation progresses)*

| File | Action | Description |
|------|--------|-------------|
| - | - | - |

---

## Related Documents

- [STORY-001: Phase 1 - Foundation](/docs/08-STORIES/story-001-phase-1-foundation-core-components.md)
- [STORY-002: Phase 2 - UI Components](/docs/08-STORIES/story-002-phase-2-ui-components.md)
- [STORY-003: Phase 3 - Data & Feedback](/docs/08-STORIES/story-003-phase-3-data-feedback.md)
- [UX Strategy: Accessibility](/docs/02-DESIGN/ux-design-expert-estrategia-executiva.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Story Created:** 2026-01-30
**Last Updated:** 2026-01-30
**Version:** 1.0
