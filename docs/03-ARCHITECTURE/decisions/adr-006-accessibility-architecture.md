# ADR-006: Accessibility Architecture

**Date:** 2026-01-31
**Status:** Accepted
**Deciders:** @architect, @dev, @qa
**Related:** Phase 4 - Accessibility Architecture

---

## Context

The Neoloop Design System Builder must be accessible to all users, including those with disabilities. We need to establish a comprehensive accessibility architecture that ensures WCAG 2.1 AA compliance (minimum) and AAA compliance where feasible.

### Requirements

1. **WCAG 2.1 AA Compliance**: Legal requirement and ethical imperative
2. **Keyboard Navigation**: Full app functionality via keyboard
3. **Screen Reader Support**: Compatible with NVDA, JAWS, VoiceOver
4. **Focus Management**: Proper focus handling in modals, drawers, etc.
5. **Color Contrast**: WCAG AA (4.5:1) minimum for all text
6. **Testing**: Automated and manual accessibility testing
7. **Documentation**: Clear guidelines for developers

### Constraints

- Target: 100% WCAG 2.1 AA compliance
- Lighthouse Accessibility Score: 100
- Zero axe violations in production
- Support: Modern screen readers (NVDA, JAWS, VoiceOver)

---

## Decision

**We will implement a comprehensive, multi-layered accessibility architecture:**

### 1. Foundation Layer (Design Tokens)
- Color contrast validation in design system
- Accessible color pickers with WCAG indicators
- Semantic color system (not relying on color alone)

### 2. Component Layer (Primitives)
- All components WCAG 2.1 AA compliant by default
- ARIA attributes built into component APIs
- Keyboard navigation patterns (roving tabindex, arrow keys)
- Focus management utilities

### 3. Application Layer (Patterns)
- Focus trap for modals/drawers
- Focus return after closing overlays
- Live regions for dynamic content
- Skip links for main content

### 4. Testing Layer
- Automated: jest-axe, eslint-plugin-jsx-a11y
- Manual: Screen reader testing
- CI/CD: Accessibility regression prevention

### 5. Documentation Layer
- Developer guidelines
- Component accessibility documentation
- Testing procedures

---

## Rationale

### Why This Approach?

**Benefits:**

1. **Accessibility by Default**: Components are accessible out of the box
2. **Developer-Friendly**: Easy to build accessible UIs
3. **Testable**: Automated testing catches regressions
4. **Compliance**: Meets WCAG 2.1 AA (and some AAA)
5. **Maintainable**: Clear patterns and guidelines

### WCAG 2.1 Coverage

| Level | Target | Implementation |
|-------|--------|---------------|
| **A** | 100% | All criteria met |
| **AA** | 100% | All criteria met |
| **AAA** | 80% | Where feasible |

---

## Architecture Components

### 1. Focus Management System

```typescript
// src/hooks/useFocusTrap.ts
export function useFocusTrap(isActive: boolean) {
  // Traps focus within a container (modals, drawers)
  // Handles Tab and Shift+Tab
  // Returns focus when closed
}

// src/hooks/useFocusReturn.ts
export function useFocusReturn(isActive: boolean) {
  // Stores previous focus
  // Returns focus after component unmounts
}

// src/hooks/useRovingTabIndex.ts
export function useRovingTabIndex(itemCount: number) {
  // Implements roving tabindex for lists/menus
  // Arrow key navigation
  // Home/End key support
}
```

**Why?**
- Modal focus management is complex
- Without focus traps, users can tab outside modals
- Screen readers need proper focus flow

---

### 2. ARIA Attribute System

```typescript
// src/a11y/aria-patterns.ts
export const ariaPatterns = {
  button: { role: 'button', 'aria-pressed': false },
  dialog: { role: 'dialog', 'aria-modal': true },
  menu: { role: 'menu', 'aria-orientation': 'vertical' },
  tab: { role: 'tab', 'aria-selected': false },
  // ... all standard patterns
}

// src/hooks/useAriaAttributes.ts
export function useAriaAttributes(componentType, state) {
  // Returns correct ARIA attributes for component
  // Merges base attributes with dynamic state
}
```

**Why?**
- Ensures consistent ARIA usage
- Prevents common ARIA mistakes
- Self-documenting component APIs

---

### 3. Keyboard Navigation

```typescript
// src/hooks/useKeyboardNavigation.ts
export function useKeyboardNavigation({
  onEnter,
  onEscape,
  onArrowUp,
  onArrowDown,
  onHome,
  onEnd,
}) {
  // Handles common keyboard patterns
  // Prevents default browser behavior
  // Fires appropriate callbacks
}

// src/hooks/useKeyboardShortcuts.ts
export function useKeyboardShortcuts(shortcuts) {
  // Global keyboard shortcuts
  // Ctrl/Cmd + S (Save)
  // Ctrl/Cmd + E (Export)
  // Respects form inputs (doesn't override)
}
```

**Why?**
- Many users rely on keyboard navigation
- Power users expect keyboard shortcuts
- Required for WCAG 2.1 AA compliance

---

### 4. Screen Reader Support

```typescript
// src/components/a11y/VisuallyHidden.tsx
export function VisuallyHidden({ children }) {
  // Hides content visually but keeps it for screen readers
  // Used for icon-only buttons, labels, etc.
}

// src/utils/announce.ts
export function announce(message, priority = 'polite') {
  // Creates live region announcement
  // Notifies screen reader users of changes
}

// src/components/layout/Landmarks.tsx
export function Main({ children }) {
  return <main role="main" aria-label="Main content">{children}</main>
}
```

**Why?**
- Screen reader users need context
- Visual-only cues exclude blind users
- Landmark regions help navigation

---

### 5. Color Contrast Validation

```typescript
// src/utils/contrast.ts
export function getContrastRatio(color1, color2): number {
  // Calculates WCAG contrast ratio
}

export function meetsWCAGAA(fg, bg): boolean {
  return getContrastRatio(fg, bg) >= 4.5
}

export function meetsWCAGAAA(fg, bg): boolean {
  return getContrastRatio(fg, bg) >= 7
}

// Used in color picker UI:
<ColorPairValidator fg={selectedFg} bg={selectedBg} />
```

**Why?**
- Low contrast is a common WCAG violation
- Design system must prevent bad color combinations
- Real-time validation helps designers

---

### 6. Touch Target Sizing

```typescript
// src/a11y/touch-targets.ts
export const touchTargetGuidelines = {
  minimum: { width: 44, height: 44 }, // WCAG 2.1 AA
  recommended: { width: 48, height: 48 },
  spacing: 8, // Between targets
}

// CSS utility:
.touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

**Why?**
- Small touch targets exclude motor-impaired users
- WCAG 2.1 requires 44x44px minimum
- Mobile users benefit too

---

## Testing Strategy

### 1. Automated Testing

```typescript
// jest-axe integration
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('Button has no a11y violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

**Tools:**
- **jest-axe**: Automated WCAG testing
- **eslint-plugin-jsx-a11y**: Linting for accessibility
- **@testing-library/react**: Encourages accessible queries
- **Lighthouse CI**: Accessibility score in CI/CD

---

### 2. Manual Testing

**Screen Reader Testing Matrix:**

| Screen Reader | Browser | OS | Frequency |
|--------------|---------|-----|-----------|
| NVDA | Firefox | Windows | Every release |
| JAWS | Chrome | Windows | Every release |
| VoiceOver | Safari | macOS | Every release |
| VoiceOver | Safari | iOS | Monthly |
| TalkBack | Chrome | Android | Monthly |

**Testing Procedure:**
1. Navigate entire app with screen reader
2. Test all interactive elements
3. Verify form validation announcements
4. Test modal focus trapping
5. Verify skip links work

---

### 3. Keyboard Testing

**Keyboard Testing Checklist:**
- [ ] All interactive elements reachable via Tab
- [ ] Focus visible on all elements
- [ ] Tab order is logical
- [ ] Shift+Tab works (reverse)
- [ ] Arrow keys work in menus/lists
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals/drawers
- [ ] Home/End keys work in lists

---

## Implementation Guidelines

### Rule 1: Semantic HTML First

```typescript
// ❌ BAD: Div soup
<div onClick={handleClick}>Click me</div>

// ✅ GOOD: Semantic button
<button onClick={handleClick}>Click me</button>
```

### Rule 2: Always Provide Text Alternatives

```typescript
// ❌ BAD: Icon without label
<button><TrashIcon /></button>

// ✅ GOOD: Icon with accessible label
<button aria-label="Delete item">
  <TrashIcon />
  <VisuallyHidden>Delete item</VisuallyHidden>
</button>
```

### Rule 3: Manage Focus Properly

```typescript
// ❌ BAD: No focus management
function Modal({ isOpen, onClose, children }) {
  return isOpen ? <div>{children}</div> : null
}

// ✅ GOOD: Focus trap and focus return
function Modal({ isOpen, onClose, children }) {
  const trapRef = useFocusTrap(isOpen)
  useFocusReturn(isOpen)

  return isOpen ? (
    <div ref={trapRef} role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null
}
```

### Rule 4: Use ARIA Sparingly

```typescript
// ❌ BAD: Unnecessary ARIA
<button role="button" aria-label="Click me">Click me</button>

// ✅ GOOD: Native HTML is enough
<button>Click me</button>

// ✅ GOOD: ARIA when needed
<div role="button" tabIndex={0} onClick={handleClick}>
  Custom button
</div>
```

### Rule 5: Test with Real Assistive Tech

```typescript
// ❌ BAD: Only automated testing
npm run test

// ✅ GOOD: Manual + automated
npm run test
npm run lighthouse
# + Manual screen reader testing
```

---

## Performance Budget

| Tool | Bundle Size | Purpose |
|------|-------------|---------|
| jest-axe | 0 KB (dev only) | Automated testing |
| Focus management hooks | ~2 KB | Focus utilities |
| ARIA utilities | ~1 KB | ARIA helpers |
| **Total** | **~3 KB** | A11y overhead |

**Impact:** Minimal (~3 KB) for comprehensive accessibility

---

## Success Metrics

| Metric | Target | Critical | Tool |
|--------|--------|----------|------|
| Lighthouse A11y | 100 | Yes | Chrome DevTools |
| axe violations | 0 | Yes | jest-axe |
| Keyboard nav | 100% | Yes | Manual testing |
| Screen reader | 100% | Yes | Manual testing |
| Color contrast | WCAG AA | Yes | Contrast checker |
| Touch targets | 44x44px | Yes | Visual inspection |

---

## Alternatives Considered

### Alternative 1: Radix UI Primitives

**Pros:**
- ✅ Accessibility built-in
- ✅ Headless components
- ✅ Great ARIA support

**Cons:**
- ❌ **Not applicable**: We're building a design system, not using one
- ❌ Would conflict with our own components
- ❌ Adds bundle overhead

**Verdict:** Not suitable for design system builder

---

### Alternative 2: React Aria (Adobe)

**Pros:**
- ✅ Excellent accessibility primitives
- ✅ ARIA hooks
- ✅ Keyboard navigation built-in

**Cons:**
- ❌ **Large bundle**: ~50 KB
- ❌ Opinionated component structure
- ❌ Learning curve

**Verdict:** Too heavy, we need custom solution

---

### Alternative 3: Minimal/No A11y Architecture

**Pros:**
- ✅ Zero bundle overhead
- ✅ Simpler code

**Cons:**
- ❌ **Legal risk**: WCAG compliance required
- ❌ **Ethical issue**: Excludes disabled users
- ❌ **Poor UX**: Keyboard users suffer
- ❌ **Not feasible**: Requirements demand accessibility

**Verdict:** Not acceptable

---

## Migration Plan

### Phase 1: Foundation (Week 1)
- [ ] Install jest-axe, eslint-plugin-jsx-a11y
- [ ] Create focus management hooks
- [ ] Implement ARIA utilities
- [ ] Set up contrast checker

### Phase 2: Components (Week 2-3)
- [ ] Audit all components for WCAG compliance
- [ ] Add ARIA attributes
- [ ] Implement keyboard navigation
- [ ] Add screen reader labels

### Phase 3: Testing (Week 3-4)
- [ ] Write automated a11y tests
- [ ] Manual screen reader testing
- [ ] Keyboard navigation testing
- [ ] Lighthouse audit

### Phase 4: Documentation (Week 4)
- [ ] Developer guidelines
- [ ] Component a11y docs
- [ ] Testing procedures

---

## Consequences

### Positive

1. ✅ **Legal Compliance**: Meets WCAG 2.1 AA requirements
2. ✅ **Inclusive**: Accessible to all users
3. ✅ **Better UX**: Keyboard navigation benefits all users
4. ✅ **Testable**: Automated testing catches regressions
5. ✅ **Reputation**: Shows commitment to accessibility
6. ✅ **SEO**: Semantic HTML improves search rankings
7. ✅ **Minimal Overhead**: Only ~3 KB bundle impact

### Negative

1. ❌ **Development Time**: More time per component
2. ❌ **Testing Overhead**: Manual screen reader testing required
3. ❌ **Complexity**: More code for proper focus management
4. ❌ **Maintenance**: Need to maintain a11y over time

### Mitigation

- Provide clear guidelines and examples
- Create reusable accessibility hooks
- Automate as much testing as possible
- Make accessibility part of definition of done

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [a11y Project](https://www.a11yproject.com/)
- [jest-axe](https://github.com/nickcolley/jest-axe)

---

**Decision Owner:** @architect
**Implementation Owner:** @dev, @qa
**Review Date:** End of Phase 4 (2026-02-28)
**Status:** ✅ Accepted and Active

---

## Appendix: WCAG 2.1 AA Checklist

### Perceivable

- [ ] 1.1.1 Non-text Content (A)
- [ ] 1.2.1 Audio-only and Video-only (A)
- [ ] 1.2.2 Captions (A)
- [ ] 1.2.3 Audio Description or Media Alternative (A)
- [ ] 1.2.4 Captions (Live) (AA)
- [ ] 1.2.5 Audio Description (AA)
- [ ] 1.3.1 Info and Relationships (A)
- [ ] 1.3.2 Meaningful Sequence (A)
- [ ] 1.3.3 Sensory Characteristics (A)
- [ ] 1.3.4 Orientation (AA)
- [ ] 1.3.5 Identify Input Purpose (AA)
- [ ] 1.4.1 Use of Color (A)
- [ ] 1.4.2 Audio Control (A)
- [ ] 1.4.3 Contrast (Minimum) (AA)
- [ ] 1.4.4 Resize Text (AA)
- [ ] 1.4.5 Images of Text (AA)
- [ ] 1.4.10 Reflow (AA)
- [ ] 1.4.11 Non-text Contrast (AA)
- [ ] 1.4.12 Text Spacing (AA)
- [ ] 1.4.13 Content on Hover or Focus (AA)

### Operable

- [ ] 2.1.1 Keyboard (A)
- [ ] 2.1.2 No Keyboard Trap (A)
- [ ] 2.1.4 Character Key Shortcuts (A)
- [ ] 2.2.1 Timing Adjustable (A)
- [ ] 2.2.2 Pause, Stop, Hide (A)
- [ ] 2.3.1 Three Flashes or Below Threshold (A)
- [ ] 2.4.1 Bypass Blocks (A)
- [ ] 2.4.2 Page Titled (A)
- [ ] 2.4.3 Focus Order (A)
- [ ] 2.4.4 Link Purpose (In Context) (A)
- [ ] 2.4.5 Multiple Ways (AA)
- [ ] 2.4.6 Headings and Labels (AA)
- [ ] 2.4.7 Focus Visible (AA)
- [ ] 2.5.1 Pointer Gestures (A)
- [ ] 2.5.2 Pointer Cancellation (A)
- [ ] 2.5.3 Label in Name (A)
- [ ] 2.5.4 Motion Actuation (A)

### Understandable

- [ ] 3.1.1 Language of Page (A)
- [ ] 3.1.2 Language of Parts (AA)
- [ ] 3.2.1 On Focus (A)
- [ ] 3.2.2 On Input (A)
- [ ] 3.2.3 Consistent Navigation (AA)
- [ ] 3.2.4 Consistent Identification (AA)
- [ ] 3.3.1 Error Identification (A)
- [ ] 3.3.2 Labels or Instructions (A)
- [ ] 3.3.3 Error Suggestion (AA)
- [ ] 3.3.4 Error Prevention (Legal, Financial, Data) (AA)

### Robust

- [ ] 4.1.1 Parsing (A)
- [ ] 4.1.2 Name, Role, Value (A)
- [ ] 4.1.3 Status Messages (AA)

**Total:** 50 criteria for WCAG 2.1 AA
