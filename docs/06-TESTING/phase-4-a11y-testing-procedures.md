# Phase 4 Accessibility Testing Procedures

**Document ID:** TEST-PROC-A11Y
**Target:** WCAG 2.1 AAA Compliance
**Total Tests:** 200+
**Manual Testing Required:** 40%

---

## Executive Summary

This document outlines comprehensive accessibility testing procedures for Phase 4, targeting **WCAG 2.1 Level AAA compliance** (exceeding industry standard AA).

**Key Testing Areas:**
- Automated accessibility testing (axe-core, jest-axe)
- Screen reader testing (NVDA, VoiceOver, JAWS)
- Keyboard-only navigation testing
- High contrast mode testing
- Focus management testing
- Motion sensitivity testing

---

## 1. Automated Accessibility Testing

### 1.1 Setup

```bash
npm install --save-dev \
  axe-core \
  jest-axe \
  @axe-core/playwright \
  @testing-library/jest-dom
```

### 1.2 Configuration

```typescript
// test-setup.ts
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
```

### 1.3 Test Template

```typescript
// component.a11y.test.tsx
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';

describe('Component A11y', () => {
  it('should have no accessibility violations (WCAG AAA)', async () => {
    const { container } = render(<Component />);

    const results = await axe(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag21aaa']
      },
      rules: {
        // AAA-specific rules
        'color-contrast-enhanced': { enabled: true }, // 7:1 for text
        'target-size': { enabled: true }, // 44x44px minimum
      }
    });

    expect(results).toHaveNoViolations();
  });
});
```

### 1.4 CI Integration

```yaml
# .github/workflows/a11y-testing.yml
name: A11y Testing

on: [push, pull_request]

jobs:
  a11y-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:a11y
      - run: npm run axe:ci
      - uses: actions/upload-artifact@v3
        with:
          name: a11y-report
          path: ./reports/a11y-report.html
```

---

## 2. Screen Reader Testing

### 2.1 NVDA Testing (Windows)

**Setup:**
1. Download NVDA from https://www.nvaccess.org/
2. Install NVDA
3. Configure speech rate (NVDA > Preferences > Speech)

**Testing Procedure:**

```
Component: Tabs
--------------
1. Open Storybook story for Tabs
2. Start NVDA (Insert + N)
3. Navigate to Tabs component (Tab key)

Expected Announcements:
✓ "Tabs navigation, 3 tabs"
✓ "Tab 1, selected, 1 of 3"
✓ (Arrow Right) "Tab 2, 2 of 3"
✓ (Enter) "Tab 2 panel, region"
✓ "This is the content of Tab 2"

4. Test keyboard navigation:
   - Arrow keys: Move between tabs
   - Enter/Space: Activate tab
   - Tab: Move to tab panel

5. Verify announcements for:
   - Tab role and state
   - Selected state
   - Position (1 of 3)
   - Panel content
```

**Test Matrix:**

| Component | NVDA Announcement | Keyboard Nav | Status |
|-----------|-------------------|--------------|--------|
| Tabs | "Tabs navigation, Tab N, selected, N of M" | ✓ Arrow, Enter | [ ] |
| Menu | "Menu, N items" | ✓ Arrow, Enter, Esc | [ ] |
| Breadcrumb | "Navigation breadcrumb, current page: X" | ✓ Tab | [ ] |
| Steps | "Step N of M, status" | ✓ Tab | [ ] |
| Pagination | "Page N of M" | ✓ Arrow, Tab | [ ] |
| CommandPalette | "Search commands, type to filter" | ✓ Arrow, Enter | [ ] |

### 2.2 VoiceOver Testing (macOS/iOS)

**Setup (macOS):**
1. Enable VoiceOver: Cmd + F5
2. Open VoiceOver Utility for settings
3. Configure verbosity: Verbosity > Speech

**Testing Procedure:**

```
Component: Menu
---------------
1. Enable VoiceOver (Cmd + F5)
2. Navigate to Menu (VO + Arrow)

Expected Announcements:
✓ "Menu button, collapsed"
✓ (VO + Space) "Menu button, expanded"
✓ "Menu, 5 items"
✓ (VO + Right Arrow) "Menu item 1, File"
✓ (VO + Down Arrow) "Menu item 2, Edit, has submenu"
✓ (VO + Right Arrow) "Submenu, 3 items"

Rotor Navigation:
3. Open Rotor (VO + U)
4. Select "Form Controls"
5. Verify all menu items listed

6. Test landmarks:
   - Rotor > Landmarks
   - Verify "navigation" landmark present
```

**VoiceOver Commands:**

| Command | Action |
|---------|--------|
| Cmd + F5 | Toggle VoiceOver |
| VO + Arrow | Navigate elements |
| VO + Space | Activate element |
| VO + U | Open Rotor |
| VO + A | Read all |
| VO + H | Next heading |
| Ctrl | Stop reading |

### 2.3 JAWS Testing (Windows)

**Setup:**
1. Download JAWS trial from https://www.freedomscientific.com/
2. Install and activate
3. Configure settings: JAWS > Settings Center

**Testing Procedure:**

```
Component: CommandPalette
-------------------------
1. Start JAWS
2. Navigate to CommandPalette trigger (Tab)

Expected Announcements:
✓ "Open command palette, button, Cmd K"
✓ (Press Cmd+K) "Command palette, dialog"
✓ "Search commands, edit, type in text"
✓ (Type "new") "5 results found"
✓ (Arrow Down) "New file, command"
✓ "Description: Create a new file"
✓ "Shortcut: Ctrl N"
✓ (Enter) "Command executed, New file"

2. Test forms mode:
   - Insert + Space (toggle forms mode)
   - Verify input works in forms mode

3. Test virtual cursor:
   - Arrow keys navigate content
   - Verify all content announced
```

**JAWS Shortcuts:**

| Command | Action |
|---------|--------|
| Insert + F | List form fields |
| Insert + F5 | List form fields |
| Insert + F6 | List headings |
| Insert + F7 | List links |
| Insert + Ctrl + ; | List buttons |
| Insert + Space | Toggle forms mode |

---

## 3. Keyboard-Only Navigation Testing

### 3.1 Full App Keyboard Audit

**Procedure:**

```
Full Keyboard Navigation Test
------------------------------
1. DISCONNECT MOUSE (physically unplug or disable)
2. Open application
3. Navigate ENTIRE app using keyboard only

Required Keys:
- Tab: Move forward
- Shift + Tab: Move backward
- Enter: Activate buttons/links
- Space: Activate buttons, toggle checkboxes
- Arrow keys: Navigate menus, tabs, etc.
- Esc: Close overlays
- Cmd/Ctrl + K: Open command palette

Success Criteria:
✓ Can reach ALL interactive elements
✓ Logical tab order
✓ Focus indicators ALWAYS visible
✓ No keyboard traps
✓ All functionality accessible
```

### 3.2 Component-Specific Keyboard Tests

**Tabs:**
```
Keyboard Pattern: ARIA Tabs Pattern
------------------------------------
- Tab: Focus tab list (first tab or selected tab)
- Arrow Left/Right: Navigate tabs (horizontal)
- Arrow Up/Down: Navigate tabs (vertical)
- Home: First tab
- End: Last tab
- Delete: Close tab (if closable)
- Tab: Move to tab panel

Test Cases:
[ ] T-KB-001: Arrow keys navigate between tabs
[ ] T-KB-002: Home jumps to first tab
[ ] T-KB-003: End jumps to last tab
[ ] T-KB-004: Tab moves to tab panel
[ ] T-KB-005: Shift+Tab returns to tab list
[ ] T-KB-006: Wrapping behavior (last → first)
```

**Menu:**
```
Keyboard Pattern: ARIA Menu Pattern
------------------------------------
- Space/Enter: Open menu
- Arrow Down: Next item
- Arrow Up: Previous item
- Arrow Right: Open submenu
- Arrow Left: Close submenu
- Home: First item
- End: Last item
- Esc: Close menu
- Type-ahead: Jump to item starting with letter

Test Cases:
[ ] T-KB-007: Arrow Down moves to next item
[ ] T-KB-008: Arrow Up moves to previous item
[ ] T-KB-009: Arrow Right opens submenu
[ ] T-KB-010: Arrow Left closes submenu
[ ] T-KB-011: Esc closes menu and returns focus
[ ] T-KB-012: Type-ahead jumps to matching item
[ ] T-KB-013: Home/End navigate to first/last
[ ] T-KB-014: Enter selects item and closes menu
```

**CommandPalette:**
```
Keyboard Pattern: Combobox Pattern
-----------------------------------
- Cmd/Ctrl + K: Open palette
- Type: Filter commands
- Arrow Down: Next command
- Arrow Up: Previous command
- Enter: Execute command
- Esc: Close palette
- Tab: Navigate command groups

Test Cases:
[ ] T-KB-015: Cmd+K opens palette
[ ] T-KB-016: Focus immediately on input
[ ] T-KB-017: Typing filters commands
[ ] T-KB-018: Arrow keys navigate results
[ ] T-KB-019: Enter executes command
[ ] T-KB-020: Esc closes and returns focus
```

### 3.3 Focus Indicator Audit

**Visual Inspection:**

```
Focus Indicator Checklist
--------------------------
For EACH interactive element:

1. Focus the element (Tab key)
2. Verify focus indicator is VISIBLE:
   ✓ Outline or border present
   ✓ Color contrast >= 3:1 against background
   ✓ Indicator width >= 2px
   ✓ Indicator does not obscure content

3. Test in different modes:
   ✓ Light mode
   ✓ Dark mode
   ✓ High contrast mode

4. Test states:
   ✓ Default state
   ✓ Hover state (if applicable)
   ✓ Active state
   ✓ Disabled state

Components to Audit:
[ ] Buttons (all variants)
[ ] Links
[ ] Inputs
[ ] Textareas
[ ] Selects
[ ] Checkboxes
[ ] Radio buttons
[ ] Tabs
[ ] Menu items
[ ] Command palette items
[ ] Breadcrumb links
[ ] Pagination buttons
```

### 3.4 Keyboard Trap Detection

**Test Procedure:**

```
Keyboard Trap Test
-------------------
For EACH modal/dialog/overlay:

1. Open the overlay (via keyboard)
2. Try to Tab through all elements
3. Try to Tab PAST the last element

Expected Behavior:
✓ Focus WRAPS to first element (no escape)
✓ Esc key CLOSES overlay
✓ Focus RETURNS to trigger element

Test Cases:
[ ] Modal: Focus trapped, Esc escapes
[ ] Drawer: Focus trapped, Esc escapes
[ ] Menu: Focus trapped, Esc escapes
[ ] CommandPalette: Focus trapped, Esc escapes
[ ] Toast: Focus NOT trapped (background accessible)
```

---

## 4. High Contrast Mode Testing

### 4.1 Windows High Contrast Mode

**Setup:**
1. Open Settings > Ease of Access > High Contrast
2. Enable High Contrast (Black or White theme)

**Testing Procedure:**

```
High Contrast Mode Test
------------------------
1. Enable Windows High Contrast (Black theme)
2. Open application
3. Navigate all components

Checklist for EACH component:
✓ All text VISIBLE
✓ All borders VISIBLE
✓ All icons VISIBLE
✓ Focus indicators VISIBLE
✓ Disabled state distinguishable
✓ Interactive elements distinguishable

Known Issues:
- Background images may disappear
- SVG icons may need stroke
- Custom colors may be overridden

Test Components:
[ ] Buttons (all states)
[ ] Inputs (focus, disabled)
[ ] Tabs (selected, unselected)
[ ] Menu (hover, focus)
[ ] Breadcrumb
[ ] Steps (current, complete, incomplete)
[ ] Pagination
[ ] Icons (ensure stroke, not fill)
```

### 4.2 Forced Colors Mode (CSS)

**Test with CSS:**

```css
/* Simulate forced colors mode */
@media (forced-colors: active) {
  * {
    color: CanvasText !important;
    background-color: Canvas !important;
    border-color: CanvasText !important;
  }

  button:focus {
    outline: 2px solid Highlight !important;
  }
}
```

**Test Procedure:**

```
1. Apply forced-colors media query
2. Verify all content visible
3. Check system color keywords used:
   - Canvas (background)
   - CanvasText (text)
   - LinkText (links)
   - Highlight (selection/focus)
   - ButtonFace (buttons)
   - ButtonText (button text)
```

---

## 5. Focus Management Testing

### 5.1 Focus Trap Testing

**Test Template:**

```typescript
describe('Focus Trap', () => {
  test('should trap focus in modal', async () => {
    const { getByRole } = render(<Modal isOpen>Content</Modal>);

    const modal = getByRole('dialog');
    const firstButton = within(modal).getAllByRole('button')[0];
    const lastButton = within(modal).getAllByRole('button').slice(-1)[0];

    // Focus first element
    firstButton.focus();
    expect(firstButton).toHaveFocus();

    // Tab to last element
    await userEvent.tab();
    // ... tab to last element

    // Tab past last element should wrap to first
    await userEvent.tab();
    expect(firstButton).toHaveFocus();
  });

  test('should return focus on close', async () => {
    const { getByRole } = render(
      <>
        <button id="trigger">Open</button>
        <Modal isOpen={false}>Content</Modal>
      </>
    );

    const trigger = document.getElementById('trigger');
    trigger.focus();

    // Open modal
    await userEvent.click(trigger);

    // Close modal
    await userEvent.keyboard('{Escape}');

    // Focus should return to trigger
    expect(trigger).toHaveFocus();
  });
});
```

### 5.2 Initial Focus Testing

**Test Cases:**

```
Initial Focus Rules
-------------------
Modal: Focus first focusable element (or specified element)
Drawer: Focus close button or first input
Menu: Focus first menu item
CommandPalette: Focus search input
Toast: NO focus (non-modal)

Test Matrix:
[ ] Modal: Focus on dialog title or close button
[ ] Drawer: Focus on close button
[ ] Menu: Focus on first item
[ ] CommandPalette: Focus on input
[ ] Toast: No focus change
```

---

## 6. Color Contrast Testing

### 6.1 Automated Contrast Checking

```typescript
import { getContrastRatio } from '@/utils/contrast';

describe('Color Contrast (WCAG AAA)', () => {
  test('should meet 7:1 ratio for normal text', () => {
    const textColor = '#000000';
    const bgColor = '#FFFFFF';

    const ratio = getContrastRatio(textColor, bgColor);
    expect(ratio).toBeGreaterThanOrEqual(7); // AAA
  });

  test('should meet 4.5:1 ratio for large text (18pt+)', () => {
    const textColor = '#666666';
    const bgColor = '#FFFFFF';

    const ratio = getContrastRatio(textColor, bgColor);
    expect(ratio).toBeGreaterThanOrEqual(4.5); // AAA for large text
  });

  test('should meet 3:1 ratio for UI components', () => {
    const borderColor = '#999999';
    const bgColor = '#FFFFFF';

    const ratio = getContrastRatio(borderColor, bgColor);
    expect(ratio).toBeGreaterThanOrEqual(3); // WCAG 2.1
  });
});
```

### 6.2 Manual Contrast Verification

**Tools:**
- Chrome DevTools: Inspect > Accessibility > Contrast
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Colour Contrast Analyser: https://www.tpgi.com/color-contrast-checker/

**Procedure:**

```
1. Open Chrome DevTools
2. Inspect element
3. Go to Accessibility pane
4. Check "Contrast" section

For EACH text element:
✓ Normal text: >= 7:1 (AAA)
✓ Large text (18pt/14pt bold): >= 4.5:1 (AAA)
✓ UI components: >= 3:1

Elements to Check:
[ ] Body text
[ ] Headings
[ ] Button text
[ ] Link text
[ ] Input labels
[ ] Placeholder text
[ ] Disabled text
[ ] Focus indicators
[ ] Icon buttons
```

---

## 7. Motion Sensitivity Testing

### 7.1 Prefers-Reduced-Motion Testing

**Test Procedure:**

```
1. Enable Reduced Motion:
   - macOS: System Preferences > Accessibility > Display > Reduce motion
   - Windows: Settings > Ease of Access > Display > Show animations
   - Chrome DevTools: Rendering > Emulate CSS media prefers-reduced-motion

2. Reload application

3. Verify:
   ✓ All animations DISABLED
   ✓ Transitions are INSTANT
   ✓ Visual changes still occur (without animation)
   ✓ Focus management still works
   ✓ Functionality NOT broken

Components to Test:
[ ] Modal open/close (instant)
[ ] Toast appear/disappear (instant)
[ ] Drawer slide (instant)
[ ] Tabs switch (instant)
[ ] Menu open (instant)
[ ] Page transitions (instant)
```

### 7.2 Vestibular Disorder Testing

**Guidelines:**
- No parallax scrolling
- No infinite scrolling (provide pagination)
- No auto-playing videos with motion
- Provide pause/stop controls for animations
- No rapid flashing (< 3 flashes/second)

**Checklist:**
```
[ ] No parallax scrolling effects
[ ] No auto-playing carousels (or provide pause)
[ ] No infinite scroll (pagination available)
[ ] No background videos (or muted + pausable)
[ ] No flashing content
[ ] Animations respect prefers-reduced-motion
```

---

## 8. WCAG 2.1 AAA Compliance Matrix

### 8.1 Level AAA Criteria Checklist

| Criterion | Requirement | Test Method | Status |
|-----------|-------------|-------------|--------|
| **1.2.6** Sign Language | Provide sign language for media | N/A (no video) | N/A |
| **1.2.7** Extended Audio Description | Extended audio for video | N/A (no video) | N/A |
| **1.2.8** Media Alternative | Full text alternative | N/A (no video) | N/A |
| **1.2.9** Audio-only (Live) | Alternative for live audio | N/A (no audio) | N/A |
| **1.4.6** Contrast (Enhanced) | 7:1 text, 4.5:1 large text | Automated + Manual | [ ] |
| **1.4.7** Low/No Background Audio | Background audio control | N/A (no audio) | N/A |
| **1.4.8** Visual Presentation | Line spacing, width, alignment | Manual inspection | [ ] |
| **1.4.9** Images of Text (No Exception) | No images of text | Manual inspection | [ ] |
| **2.1.3** Keyboard (No Exception) | All functionality keyboard | Manual testing | [ ] |
| **2.2.3** No Timing | No time limits | Manual testing | [ ] |
| **2.2.4** Interruptions | Postpone interruptions | Manual testing | [ ] |
| **2.2.5** Re-authenticating | Data preserved on re-auth | N/A (no auth) | N/A |
| **2.2.6** Timeouts | Warn of session timeout | N/A (no timeout) | N/A |
| **2.3.2** Three Flashes | No > 3 flashes/second | Automated | [ ] |
| **2.3.3** Animation from Interactions | Disable motion | Manual testing | [ ] |
| **2.4.8** Location | Breadcrumb navigation | Manual testing | [ ] |
| **2.4.9** Link Purpose (Link Only) | Link purpose from text alone | Manual testing | [ ] |
| **2.4.10** Section Headings | Use headings | Manual testing | [ ] |
| **2.5.5** Target Size (Enhanced) | 44x44px minimum | Automated + Manual | [ ] |
| **2.5.6** Concurrent Input | Support multiple input | Manual testing | [ ] |
| **3.1.3** Unusual Words | Definitions for jargon | N/A (design system) | N/A |
| **3.1.4** Abbreviations | Expand abbreviations | Manual testing | [ ] |
| **3.1.5** Reading Level | Lower secondary education | N/A (design system) | N/A |
| **3.1.6** Pronunciation | Pronunciation for ambiguous | N/A (design system) | N/A |
| **3.2.5** Change on Request | No auto changes | Manual testing | [ ] |
| **3.3.5** Help | Context-sensitive help | Manual testing | [ ] |
| **3.3.6** Error Prevention (All) | Confirmation for all | Manual testing | [ ] |

---

## 9. Testing Schedule

### Week 7 (Days 43-49)

| Day | Testing Focus | Components | Duration |
|-----|---------------|------------|----------|
| 43 | Setup automated tests | All | 2h |
| 44 | Animation a11y tests | Transition, Animation hooks | 4h |
| 45 | Tabs a11y testing | Tabs | 3h |
| 46 | Breadcrumb, Pagination | Breadcrumb, Pagination | 3h |
| 47 | Steps a11y testing | Steps | 3h |
| 48 | Menu a11y testing | Menu | 4h |
| 49 | Menu keyboard audit | Menu | 3h |

### Week 8 (Days 50-56)

| Day | Testing Focus | Components | Duration |
|-----|---------------|------------|----------|
| 50 | CommandPalette a11y | CommandPalette | 4h |
| 51 | Focus management testing | All components | 4h |
| 52 | Screen reader testing | NVDA, VoiceOver, JAWS | 6h |
| 53 | Keyboard-only audit | Full app | 6h |
| 54 | WCAG AAA audit | Full app | 6h |
| 55 | High contrast testing | All components | 4h |
| 56 | Final compliance report | Documentation | 4h |

---

## 10. Success Criteria

### Quantitative

- [ ] 0 critical axe violations
- [ ] 0 serious axe violations
- [ ] 100% keyboard accessibility
- [ ] 100% screen reader support
- [ ] 7:1 contrast for all normal text
- [ ] 4.5:1 contrast for all large text
- [ ] 3:1 contrast for all UI components
- [ ] 44x44px minimum touch targets

### Qualitative

- [ ] Excellent screen reader experience
- [ ] Intuitive keyboard navigation
- [ ] Clear focus indicators everywhere
- [ ] Smooth reduced motion experience
- [ ] Usable in high contrast mode
- [ ] No vestibular triggers

---

## 11. Deliverables

- [ ] Automated a11y test suite (200+ tests)
- [ ] WCAG AAA compliance matrix (complete)
- [ ] Screen reader testing report
- [ ] Keyboard navigation audit report
- [ ] Contrast audit report
- [ ] High contrast mode compatibility report
- [ ] Motion sensitivity compliance report
- [ ] CI/CD integration (automated checks)

---

**Document Version:** 1.0
**Created:** 2026-01-31
**Status:** READY FOR EXECUTION
