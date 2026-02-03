# Phase 3: Feedback Components - Design Specifications
**Neoloop Design System Builder**
**Date:** 2026-01-31
**Author:** @ux-design-expert
**Status:** Complete

---

## Table of Contents

1. [Toast Component](#1-toast-component)
2. [Alert Component](#2-alert-component)
3. [ConfirmDialog Component](#3-confirmdialog-component)
4. [Hover State System](#4-hover-state-system)
5. [Focus State System](#5-focus-state-system)
6. [Disabled State System](#6-disabled-state-system)
7. [Loading State System](#7-loading-state-system)
8. [Success State System](#8-success-state-system)
9. [Error State System](#9-error-state-system)
10. [Warning State System](#10-warning-state-system)

---

## 1. Toast Component

### 1.1 Component Purpose

Toast notifications provide brief, non-intrusive feedback about an operation. They appear temporarily, don't interrupt user flow, and auto-dismiss after a set duration.

### 1.2 Component Anatomy

```
                  ┌────────────────────────────────────┐
                  │ Toast Container (top-right)        │
                  │                                    │
                  │ ┌────────────────────────────────┐ │
                  │ │ ✓ Success Toast                │ │
                  │ │ Your changes have been saved   │ │
                  │ │                            [×] │ │
                  │ └────────────────────────────────┘ │
                  │                                    │
                  │ ┌────────────────────────────────┐ │
                  │ │ ⚠️ Warning Toast                │ │
                  │ │ Connection is unstable         │ │
                  │ │                            [×] │ │
                  │ └────────────────────────────────┘ │
                  │                                    │
                  └────────────────────────────────────┘
```

### 1.3 Visual Specifications

#### Toast Container (Viewport Region)
- **Position:** Fixed
- **Z-Index:** 9999
- **Pointer Events:** None (allow clicks through empty space)

**Position Variants:**
- `top-left`: top: 16px; left: 16px
- `top-center`: top: 16px; left: 50%; transform: translateX(-50%)
- `top-right`: top: 16px; right: 16px (default)
- `bottom-left`: bottom: 16px; left: 16px
- `bottom-center`: bottom: 16px; left: 50%; transform: translateX(-50%)
- `bottom-right`: bottom: 16px; right: 16px

#### Individual Toast
- **Width:** 360px (fixed on desktop)
- **Min Width:** 280px
- **Max Width:** calc(100vw - 32px) (mobile)
- **Margin Bottom:** 12px (between toasts)
- **Pointer Events:** Auto (allow interaction)

#### Toast Card
- **Background:** `bg-surface` (white)
- **Border:** 1px solid `border-default` (`colors.neutral.200`)
- **Border Left:** 4px solid (variant color)
  - Success: `colors.success.500`
  - Error: `colors.error.500`
  - Warning: `colors.warning.500`
  - Info: `colors.info.500`
- **Border Radius:** 8px
- **Padding:** 16px
- **Shadow:** `shadow-lg` (0 8px 16px rgba(0,0,0,0.15))
- **Layout:** Flexbox row
- **Gap:** 12px
- **Align Items:** Flex-start

#### Icon Section
- **Flex:** 0 0 24px
- **Size:** 24px
- **Color:** Variant color (success, error, warning, info)

**Icons by Type:**
- Success: Checkmark circle (✓)
- Error: X circle (×)
- Warning: Alert triangle (⚠️)
- Info: Info circle (ℹ️)

#### Content Section
- **Flex:** 1
- **Layout:** Flexbox column
- **Gap:** 4px

**Title:**
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-semibold` (600)
  - Color: `text-primary` (`colors.neutral.900`)
  - Line Height: 1.4
- **Max Lines:** 2
- **Overflow:** Ellipsis

**Description (optional):**
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Line Height: 1.5
- **Max Lines:** 3
- **Overflow:** Ellipsis

**Action (optional):**
- **Type:** Link button
- **Size:** Small
- **Margin Top:** 8px
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-medium` (500)
  - Color: Variant color

#### Close Button
- **Flex:** 0 0 24px
- **Size:** 24px (touch target)
- **Icon Size:** 16px
- **Color:** `text-secondary` (`colors.neutral.500`)
- **Hover Color:** `text-primary` (`colors.neutral.900`)
- **Background:** Transparent
- **Hover Background:** `colors.neutral.100`
- **Border Radius:** 4px
- **Cursor:** Pointer

### 1.4 Toast Variants

#### Success Toast
- **Border Left:** `colors.success.500`
- **Icon Color:** `colors.success.600`
- **Icon:** Checkmark circle
- **Use Case:** Completed actions, saved data, successful operations

#### Error Toast
- **Border Left:** `colors.error.500`
- **Icon Color:** `colors.error.600`
- **Icon:** X circle
- **Use Case:** Failed operations, validation errors, critical issues

#### Warning Toast
- **Border Left:** `colors.warning.500`
- **Icon Color:** `colors.warning.600`
- **Icon:** Alert triangle
- **Use Case:** Important notices, potential issues, cautionary messages

#### Info Toast
- **Border Left:** `colors.info.500`
- **Icon Color:** `colors.info.600`
- **Icon:** Info circle
- **Use Case:** General information, tips, neutral updates

### 1.5 Stacking Behavior

**Vertical Stack:**
- Newest toasts appear at top
- Older toasts push down
- Maximum 5 toasts visible at once
- Older toasts auto-dismiss when limit reached

**Animation:**
- New toast slides in from right (20px)
- Existing toasts slide down smoothly
- Removed toast fades out and collapses

### 1.6 Auto-Dismiss Timing

**Default Durations:**
- Success: 4000ms (4 seconds)
- Info: 5000ms (5 seconds)
- Warning: 6000ms (6 seconds)
- Error: 0ms (manual dismiss only, or 8000ms if configured)

**Pause on Hover:**
- Timer pauses when user hovers toast
- Timer resumes 500ms after mouse leaves
- Visual indicator: Subtle progress bar at bottom

#### Progress Bar
- **Height:** 2px
- **Position:** Absolute bottom
- **Background:** Variant color (0.3 opacity)
- **Fill:** Variant color (1.0 opacity)
- **Animation:** Width from 100% to 0% over duration
- **Easing:** Linear

### 1.7 Animation Specifications

**Enter Animation (slide in from right):**
```css
@keyframes toastEnter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1) (ease-out)

**Exit Animation (fade out):**
```css
@keyframes toastExit {
  from {
    opacity: 1;
    max-height: 200px;
    margin-bottom: 12px;
  }
  to {
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
  }
}
```
- Duration: 200ms
- Easing: ease-in

**Stack Shift (when toast is removed):**
- Remaining toasts slide up smoothly
- Duration: 200ms
- Easing: ease-out

### 1.8 Interactive Behaviors

**Hover:**
- Pause auto-dismiss timer
- Show subtle shadow increase
- Highlight close button

**Click Close:**
- Immediately dismiss toast
- Run exit animation
- Remove from stack

**Click Action:**
- Execute action handler
- Optionally auto-dismiss after action
- Show loading state if async

**Swipe to Dismiss (mobile/touch):**
- Swipe right to dismiss
- Threshold: 50% of width
- Animation follows finger
- Snap back if threshold not met
- Fast swipe (velocity) can dismiss earlier

### 1.9 Responsive Behavior

**Desktop (>768px):**
- Width: 360px (fixed)
- Position: Top-right (default)
- Show up to 5 toasts

**Mobile (<768px):**
- Width: calc(100vw - 32px)
- Position: Top-center (recommended)
- Show up to 3 toasts
- Swipe to dismiss enabled

### 1.10 Dark Mode

**Toast Card:**
- Background: `colors.neutral.800`
- Border: `colors.neutral.700`
- Shadow: 0 8px 16px rgba(0,0,0,0.5)

**Text:**
- Title: `colors.neutral.50`
- Description: `colors.neutral.300`

**Icons:**
- Success: `colors.success.400`
- Error: `colors.error.400`
- Warning: `colors.warning.400`
- Info: `colors.info.400`

**Border Left:**
- Colors remain same (sufficient contrast in dark mode)

### 1.11 Accessibility

**ARIA Attributes:**
- `role="status"` for info/success toasts
- `role="alert"` for warning/error toasts
- `aria-live="polite"` for info/success
- `aria-live="assertive"` for warning/error
- `aria-atomic="true"` (read entire message)

**Screen Reader:**
- Announce toast message when appears
- Include variant type ("Success:", "Error:")
- Announce dismiss action available
- Don't announce exit

**Keyboard:**
- Focus on toast when contains action
- Tab to action button
- Enter/Space to activate action
- Escape to dismiss focused toast

**Focus Management:**
- Don't steal focus from current element
- Only focus if toast contains interactive action
- Return focus to trigger after dismiss

---

## 2. Alert Component

### 2.1 Component Purpose

Alert banners provide persistent, prominent feedback or information. Unlike toasts, they don't auto-dismiss and remain visible until user dismisses or condition changes.

### 2.2 Component Anatomy

```
┌────────────────────────────────────────────────────────┐
│ Alert Container (inline in layout)                    │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ⚠️  Warning: Your subscription expires in 3 days  │ │
│ │     Renew now to avoid service interruption       │ │
│ │     [Renew Subscription]                      [×] │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 2.3 Visual Specifications

#### Alert Container
- **Width:** 100%
- **Margin:** 16px 0
- **Position:** Static (inline in layout)

#### Alert Card
- **Background:** Variant background (light)
- **Border:** 1px solid variant border
- **Border Left:** 4px solid variant color (accent)
- **Border Radius:** 8px
- **Padding:** 16px 20px
- **Layout:** Flexbox row
- **Gap:** 16px
- **Align Items:** Flex-start

**Color Mapping:**

| Variant | Background | Border | Accent | Text |
|---------|------------|--------|--------|------|
| Success | `success.50` | `success.200` | `success.500` | `success.900` |
| Error | `error.50` | `error.200` | `error.500` | `error.900` |
| Warning | `warning.50` | `warning.200` | `warning.500` | `warning.900` |
| Info | `info.50` | `info.200` | `info.500` | `info.900` |

#### Icon Section
- **Flex:** 0 0 24px
- **Size:** 24px
- **Color:** Variant accent color

#### Content Section
- **Flex:** 1
- **Layout:** Flexbox column
- **Gap:** 8px

**Title:**
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-semibold` (600)
  - Color: Variant text color
  - Line Height: 1.4

**Description:**
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-normal` (400)
  - Color: Variant text color (0.8 opacity)
  - Line Height: 1.5

**Actions (optional):**
- **Layout:** Flexbox row
- **Gap:** 12px
- **Margin Top:** 12px
- **Buttons:** Small size, variant colored

#### Close Button
- **Flex:** 0 0 auto
- **Size:** 32x32px (touch target)
- **Icon Size:** 20px
- **Color:** Variant text color (0.6 opacity)
- **Hover Color:** Variant text color (1.0 opacity)
- **Background:** Transparent
- **Hover Background:** Variant color (0.1 opacity)
- **Border Radius:** 6px

### 2.4 Alert Variants

#### Success Alert
- **Background:** `colors.success.50`
- **Border:** `colors.success.200`
- **Accent:** `colors.success.500`
- **Text:** `colors.success.900`
- **Icon:** Checkmark circle
- **Use Case:** Successful completion, positive confirmation

#### Error Alert
- **Background:** `colors.error.50`
- **Border:** `colors.error.200`
- **Accent:** `colors.error.500`
- **Text:** `colors.error.900`
- **Icon:** X circle or alert octagon
- **Use Case:** Critical errors, failed validation, blocking issues

#### Warning Alert
- **Background:** `colors.warning.50`
- **Border:** `colors.warning.200`
- **Accent:** `colors.warning.500`
- **Text:** `colors.warning.900`
- **Icon:** Alert triangle
- **Use Case:** Important warnings, potential issues, caution needed

#### Info Alert
- **Background:** `colors.info.50`
- **Border:** `colors.info.200`
- **Accent:** `colors.info.500`
- **Text:** `colors.info.900`
- **Icon:** Info circle
- **Use Case:** General information, helpful tips, neutral notices

### 2.5 Alert Placement

#### Page-Level Alert
- **Position:** Top of page (below header)
- **Width:** 100%
- **Border Radius:** 0 (full width)
- **Margin:** 0
- **Padding:** 16px 24px
- **Background:** Full width color
- **Use Case:** System-wide messages, critical announcements

#### Section Alert
- **Position:** Top of section/card
- **Width:** 100% (within container)
- **Border Radius:** 8px (top) or 0 (if flush with container)
- **Margin:** 0 0 16px 0
- **Use Case:** Section-specific notices

#### Inline Alert
- **Position:** Inline with content
- **Width:** 100% (or adaptive)
- **Border Radius:** 8px
- **Margin:** 16px 0
- **Use Case:** Contextual feedback, form validation

### 2.6 Dismissible Behavior

**Dismissible (closeable):**
- Show close button (X)
- Click to dismiss
- Fade out animation (300ms)
- Collapse height smoothly
- Optional callback on dismiss

**Non-Dismissible:**
- No close button
- Remains until condition changes
- Use for critical, persistent alerts

### 2.7 Animation

**Enter (when alert appears):**
```css
@keyframes alertEnter {
  from {
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
    margin-bottom: 16px;
  }
}
```
- Duration: 300ms
- Easing: ease-out

**Exit (when dismissed):**
```css
@keyframes alertExit {
  from {
    opacity: 1;
    max-height: 500px;
    margin-bottom: 16px;
  }
  to {
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
  }
}
```
- Duration: 300ms
- Easing: ease-in

### 2.8 Dark Mode

**Alert Card:**
- Background: Variant color (0.15 opacity on `neutral.900`)
- Border: Variant color (0.3 opacity)
- Accent: Variant color (unchanged)

**Text:**
- Title: `colors.neutral.50`
- Description: `colors.neutral.300`

**Icons:**
- Color: Variant color (lighter shade)
  - Success: `success.400`
  - Error: `error.400`
  - Warning: `warning.400`
  - Info: `info.400`

### 2.9 Accessibility

**ARIA Attributes:**
- `role="alert"` (for critical alerts)
- `role="status"` (for informational alerts)
- `aria-live="polite"` (info)
- `aria-live="assertive"` (error/warning)
- `aria-labelledby="alert-title"` (if has title)
- `aria-describedby="alert-description"` (if has description)

**Screen Reader:**
- Announce alert when appears
- Include variant type
- Read title and description
- Announce dismiss button if present

**Keyboard:**
- Tab to action buttons
- Tab to close button
- Enter/Space to activate
- Escape to dismiss (if dismissible)

---

## 3. ConfirmDialog Component

### 3.1 Component Purpose

Confirm dialogs interrupt user flow to request confirmation before a critical or destructive action (delete, discard changes, etc.).

### 3.2 Component Anatomy

```
┌──────────────────────────────────────────────────────┐
│ Modal Backdrop (0.5 opacity black)                   │
│                                                      │
│         ┌────────────────────────────────┐           │
│         │ Confirm Dialog                 │           │
│         │ ┌────────────────────────────┐ │           │
│         │ │ ⚠️  Delete Project?        │ │           │
│         │ └────────────────────────────┘ │           │
│         │                                │           │
│         │ This action cannot be undone. │           │
│         │ All project data will be      │           │
│         │ permanently deleted.          │           │
│         │                                │           │
│         │ ┌────────────────────────────┐ │           │
│         │ │ [Cancel]  [Delete Project] │ │           │
│         │ └────────────────────────────┘ │           │
│         └────────────────────────────────┘           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 3.3 Visual Specifications

#### Backdrop
- **Position:** Fixed (full screen)
- **Top/Left:** 0
- **Width/Height:** 100vw / 100vh
- **Background:** `rgba(0, 0, 0, 0.5)`
- **Z-Index:** 9998
- **Backdrop Filter:** `blur(4px)` (optional)

#### Dialog Container
- **Position:** Fixed
- **Top:** 50%
- **Left:** 50%
- **Transform:** translate(-50%, -50%)
- **Z-Index:** 9999

#### Dialog Card
- **Width:** 480px (desktop)
- **Max Width:** calc(100vw - 32px) (mobile)
- **Background:** `bg-surface` (white)
- **Border:** 1px solid `border-default` (`colors.neutral.200`)
- **Border Radius:** 12px
- **Shadow:** `shadow-2xl` (0 24px 48px rgba(0,0,0,0.25))
- **Padding:** 24px
- **Layout:** Flexbox column
- **Gap:** 20px

#### Header Section
- **Layout:** Flexbox row
- **Gap:** 12px
- **Align Items:** Center
- **Padding Bottom:** 12px
- **Border Bottom:** 1px solid `border-subtle` (`colors.neutral.100`)

**Icon:**
- **Size:** 32px
- **Color:** Variant color
  - Danger: `colors.error.500`
  - Warning: `colors.warning.500`
  - Info: `colors.info.500`

**Title:**
- **Typography:**
  - Font Size: `font-size-xl` (20px)
  - Weight: `font-weight-semibold` (600)
  - Color: `text-primary` (`colors.neutral.900`)
  - Line Height: 1.3
- **Flex:** 1

#### Content Section
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Line Height: 1.6
- **Max Height:** 300px (scrollable if longer)

#### Actions Section
- **Layout:** Flexbox row
- **Gap:** 12px
- **Justify Content:** Flex-end
- **Padding Top:** 12px
- **Border Top:** 1px solid `border-subtle`

**Buttons:**
- **Size:** Medium (40px height)
- **Min Width:** 100px

**Cancel Button:**
- **Variant:** Secondary or ghost
- **Order:** First (left)

**Confirm Button:**
- **Variant:** Primary (default) or destructive (danger)
- **Order:** Last (right)
- **Color:** Based on dialog type
  - Danger: Red (`colors.error.500`)
  - Warning: Orange (`colors.warning.500`)
  - Info: Blue (`colors.brand.500`)

### 3.4 Dialog Variants

#### Destructive (Danger)
- **Icon:** Alert triangle or trash can
- **Icon Color:** `colors.error.500`
- **Confirm Button:** Red background (`colors.error.500`)
- **Confirm Text:** "Delete", "Remove", "Discard"
- **Use Case:** Irreversible actions (delete, remove, destroy)

#### Warning
- **Icon:** Alert triangle
- **Icon Color:** `colors.warning.500`
- **Confirm Button:** Orange background (`colors.warning.500`)
- **Confirm Text:** "Continue", "Proceed"
- **Use Case:** Potentially risky actions

#### Informational
- **Icon:** Info circle or question mark
- **Icon Color:** `colors.info.500`
- **Confirm Button:** Blue background (`colors.brand.500`)
- **Confirm Text:** "OK", "Confirm", "Yes"
- **Use Case:** Neutral confirmations

### 3.5 Interactive Behaviors

**Open:**
- Fade in backdrop (200ms)
- Scale dialog from 0.9 to 1.0 (300ms)
- Focus on primary action button

**Close:**
- Fade out backdrop (200ms)
- Scale dialog from 1.0 to 0.9 (200ms)
- Return focus to trigger element

**Confirm:**
- Execute confirm callback
- Show loading state on confirm button if async
- Close dialog on completion

**Cancel:**
- Execute cancel callback (optional)
- Close dialog immediately

**Click Backdrop:**
- Close dialog (non-destructive only)
- Don't close for destructive dialogs (force explicit choice)

### 3.6 Animation

**Enter:**
```css
@keyframes dialogEnter {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
```
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Exit:**
```css
@keyframes dialogExit {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
}
```
- Duration: 200ms
- Easing: ease-in

**Backdrop:**
- Fade in/out: 200ms

### 3.7 Keyboard Navigation

**On Open:**
- Focus first button (usually Cancel)
- Trap focus within dialog

**Within Dialog:**
- Tab: Navigate between buttons
- Shift+Tab: Reverse navigation
- Enter: Activate focused button
- Escape: Cancel and close (unless destructive)
- Arrow Left/Right: Navigate buttons (optional)

### 3.8 Responsive Behavior

**Desktop (>768px):**
- Width: 480px
- Centered modal
- Buttons horizontal (side by side)

**Mobile (<768px):**
- Width: calc(100vw - 32px)
- Centered modal
- Buttons can stack vertically if long text
- Larger touch targets (min 48px height)

### 3.9 Dark Mode

**Backdrop:**
- Background: `rgba(0, 0, 0, 0.7)` (darker)

**Dialog Card:**
- Background: `colors.neutral.800`
- Border: `colors.neutral.700`
- Shadow: 0 24px 48px rgba(0,0,0,0.5)

**Text:**
- Title: `colors.neutral.50`
- Description: `colors.neutral.300`

**Borders:**
- Header/Footer: `colors.neutral.700`

**Icons:**
- Danger: `colors.error.400`
- Warning: `colors.warning.400`
- Info: `colors.info.400`

### 3.10 Accessibility

**ARIA Attributes:**
- `role="alertdialog"` on dialog
- `aria-modal="true"` (blocks background)
- `aria-labelledby="dialog-title"` (link to title)
- `aria-describedby="dialog-description"` (link to content)

**Screen Reader:**
- Announce "Alert dialog, [title]"
- Read description
- Announce available actions
- Announce when dialog opens/closes

**Focus Management:**
- Focus first button on open
- Trap focus within dialog
- Return focus to trigger on close
- Prevent interaction with background

**Keyboard:**
- Full keyboard navigation
- Escape to cancel (if allowed)
- Enter to confirm

---

## 4. Hover State System

### 4.1 Purpose

Hover states provide visual feedback when user points at interactive elements with a mouse or trackpad.

### 4.2 Universal Hover Principles

**Color Shift:**
- **Background:** 5% darker (darken by 5% in HSL)
- **Border:** 5-10% darker
- **Text:** Optional (usually unchanged)

**Elevation Change:**
- **Shadow:** Increase by one level
  - `shadow-sm` → `shadow-md`
  - `shadow-md` → `shadow-lg`
  - `shadow-lg` → `shadow-xl`

**Timing:**
- **Transition:** 150ms ease
- **Properties:** `background-color, border-color, box-shadow, transform`

### 4.3 Hover by Component Type

#### Buttons
**Primary Button:**
- Background: `brand.500` → `brand.600` (5% darker)
- Shadow: `shadow-sm` → `shadow-md`
- Transform: `translateY(-1px)` (subtle lift)

**Secondary Button:**
- Background: Transparent → `neutral.100`
- Border: `neutral.300` → `neutral.400`
- Shadow: None → `shadow-sm`

**Ghost Button:**
- Background: Transparent → `neutral.50`
- Text: `neutral.700` → `neutral.900`

#### Cards
- Background: White → `neutral.50`
- Shadow: `shadow-sm` → `shadow-md`
- Border: `neutral.200` → `neutral.300`
- Transform: `translateY(-2px)` (lift)

#### Links
- Text Color: `brand.500` → `brand.600`
- Text Decoration: None → Underline
- OR: Underline thickness: 1px → 2px

#### Inputs
- Border: `neutral.300` → `neutral.400`
- Shadow: None → `shadow-sm`

#### Icons (standalone)
- Color: `neutral.600` → `neutral.900`
- Background: None → `neutral.100` (circular)
- Transform: `scale(1.1)` (subtle enlarge)

### 4.4 Hover Exclusions

**Never apply hover to:**
- Disabled elements
- Elements with `pointer-events: none`
- Elements with `cursor: not-allowed`
- Non-interactive elements (static text, images)

### 4.5 Implementation

**CSS:**
```css
.interactive-element {
  transition: all 150ms ease;
}

.interactive-element:hover {
  background-color: hsl(var(--color-h), var(--color-s), calc(var(--color-l) - 5%));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.interactive-element:disabled,
.interactive-element[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}

.interactive-element:disabled:hover {
  /* No hover styles */
}
```

### 4.6 Touch Devices

**Problem:** Touch devices don't have hover
**Solution:** Skip hover, go straight to active state on tap

```css
@media (hover: none) {
  .interactive-element:hover {
    /* Remove hover styles */
    background-color: initial;
    box-shadow: initial;
    transform: initial;
  }

  .interactive-element:active {
    /* Apply pressed state instead */
  }
}
```

---

## 5. Focus State System

### 5.1 Purpose

Focus states indicate which element is currently active for keyboard interaction. Critical for accessibility.

### 5.2 Universal Focus Principles

**Focus Ring:**
- **Width:** 2px (standard), 3px (high visibility)
- **Color:** `colors.brand.500` (primary brand)
- **Offset:** 2px (outside element)
- **Style:** Solid (default), Dashed (alternate)

**High Contrast:**
- **Contrast Ratio:** ≥ 3:1 against background (WCAG 2.5.5)
- **Fallback:** Use white outline with shadow if brand color insufficient

**Timing:**
- **Transition:** Instant (0ms) - focus must be immediately visible
- **No Animation:** Focus should not animate in/out

### 5.3 Focus by Component Type

#### Buttons
```css
.button:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(var(--color-brand-500-rgb), 0.1);
}
```
- **Outline:** 2px solid brand
- **Offset:** 2px outside
- **Box Shadow:** 4px blur with 0.1 opacity (glow)

#### Inputs
```css
.input:focus {
  border-color: var(--color-brand-500);
  border-width: 2px;
  box-shadow: 0 0 0 4px rgba(var(--color-brand-500-rgb), 0.1);
  outline: none; /* Custom outline via border */
}
```
- **Border:** 2px solid brand (replace 1px default)
- **Box Shadow:** Focus glow
- **Outline:** None (using border instead)

#### Links
```css
.link:focus-visible {
  outline: 2px dashed var(--color-brand-500);
  outline-offset: 4px;
  border-radius: 2px;
}
```
- **Outline:** 2px dashed (differentiates from buttons)
- **Offset:** 4px (more space for inline links)

#### Cards (interactive)
```css
.card:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(var(--color-brand-500-rgb), 0.1),
              var(--shadow-md);
}
```
- **Outline:** 2px solid
- **Offset:** 2px
- **Shadow:** Focus glow + elevation shadow

#### Custom Components
- Always use `:focus-visible` (not `:focus`)
- Ensures focus only shows for keyboard, not mouse clicks
- Override browser default outline with custom styles

### 5.4 Focus Order (Tab Order)

**Logical Flow:**
1. Header navigation
2. Main content (top to bottom, left to right)
3. Sidebar (if present)
4. Footer

**Skip Links:**
- Provide "Skip to main content" link (first focusable element)
- Visible only on focus
- Allows keyboard users to bypass navigation

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-brand-500);
  color: white;
  padding: 8px 16px;
  z-index: 10000;
}

.skip-link:focus {
  top: 0;
}
```

### 5.5 Focus Trapping

**When to Trap:**
- Modals/dialogs
- Dropdown menus (while open)
- Popovers (while open)

**How to Trap:**
1. Find first and last focusable elements in container
2. On Tab from last, focus first
3. On Shift+Tab from first, focus last
4. Prevent focus from leaving container

```javascript
function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
```

### 5.6 Focus Management Patterns

**Modal Opens:**
- Focus first interactive element in modal
- Trap focus within modal
- Return focus to trigger when closed

**Dropdown Opens:**
- Focus first menu item
- Trap focus within menu
- Return focus to trigger when closed

**Form Validation Error:**
- Focus first invalid field
- Announce error via `aria-live`

**Page Load:**
- Focus skip link (or main heading)
- Don't auto-focus form fields (annoying)

### 5.7 High Contrast Mode

**Windows High Contrast:**
- Ensure focus ring uses `Highlight` color
- Test in Windows High Contrast Mode
- Use system colors where appropriate

```css
@media (prefers-contrast: high) {
  .button:focus-visible {
    outline-color: Highlight; /* System highlight color */
    outline-width: 3px; /* Thicker in high contrast */
  }
}
```

### 5.8 Accessibility

**WCAG Criteria:**
- **2.4.7 Focus Visible (AA):** Focus indicator must be visible
- **2.4.11 Focus Appearance (AAA):** Minimum contrast 3:1, minimum area 2px

**Best Practices:**
- Always show focus for keyboard users
- Never remove focus outline without replacement
- Use `:focus-visible` to hide focus for mouse users
- Test with keyboard-only navigation

---

## 6. Disabled State System

### 6.1 Purpose

Disabled states indicate elements that are present but not currently interactive.

### 6.2 Universal Disabled Principles

**Opacity:**
- **Value:** 0.5 (50% opacity)
- **Applies to:** Entire element (text, icons, borders)

**Cursor:**
- **Value:** `not-allowed`
- **Indicates:** Element cannot be interacted with

**Pointer Events:**
- **Value:** `none` (prevents any interaction)
- **Prevents:** Click, hover, focus

**Color (Alternative to Opacity):**
- **Background:** Lighten by 20% (or use `neutral.100`)
- **Text:** `neutral.400` (muted)
- **Border:** `neutral.200` (subtle)

### 6.3 Implementation by Component

#### Buttons
```css
.button:disabled,
.button[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* OR color-based (no opacity) */
.button:disabled {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-400);
  border-color: var(--color-neutral-200);
  cursor: not-allowed;
  pointer-events: none;
}
```

**Best Practice:** Use opacity for simplicity, color-based for custom brand

#### Inputs
```css
.input:disabled {
  background-color: var(--color-neutral-50);
  color: var(--color-neutral-400);
  border-color: var(--color-neutral-200);
  cursor: not-allowed;
  -webkit-text-fill-color: var(--color-neutral-400); /* Safari fix */
}
```

**Note:** Don't use `pointer-events: none` on inputs (breaks browser behavior)

#### Links
```css
.link[aria-disabled="true"] {
  color: var(--color-neutral-400);
  text-decoration: none;
  cursor: not-allowed;
  pointer-events: none;
}
```

**Note:** Links use `aria-disabled`, not `disabled` attribute

#### Checkboxes / Radios
```css
.checkbox:disabled,
.radio:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox:disabled + label,
.radio:disabled + label {
  color: var(--color-neutral-400);
  cursor: not-allowed;
}
```

#### Cards (interactive)
```css
.card[aria-disabled="true"] {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(0.3); /* Optional: subtle desaturation */
}
```

### 6.4 Disabled vs Read-Only

**Disabled:**
- Not interactive
- Grayed out
- Excluded from form submission
- Not focusable

**Read-Only:**
- Not editable
- Normal appearance
- Included in form submission
- Focusable and copyable

```html
<!-- Disabled -->
<input type="text" disabled value="Cannot interact" />

<!-- Read-Only -->
<input type="text" readonly value="Can copy, cannot edit" />
```

```css
.input:read-only {
  background-color: var(--color-neutral-50);
  cursor: default;
}
```

### 6.5 Accessibility

**ARIA Attributes:**
- Use `disabled` attribute for native elements (button, input)
- Use `aria-disabled="true"` for custom elements (div, span)
- Announce state to screen readers

**Screen Reader:**
- Announce "disabled" or "unavailable"
- Include in accessibility tree (don't hide with `display: none`)

**Keyboard:**
- Skip disabled elements in tab order
- Don't allow focus (unless read-only)

**Tooltip (Why Disabled):**
- Consider showing tooltip explaining why element is disabled
- Helpful for user understanding

```html
<button disabled aria-label="Save changes (all required fields must be completed)">
  Save
</button>
```

---

## 7. Loading State System

### 7.1 Purpose

Loading states provide feedback during asynchronous operations, reassuring users that the system is working.

### 7.2 Loading Indicators

#### Spinner
**Visual:**
- **Size:** 20px (small), 32px (medium), 48px (large)
- **Stroke Width:** 2px (small), 3px (medium/large)
- **Color:** `colors.brand.500` (primary), `colors.neutral.400` (neutral)
- **Animation:** Rotate 360deg in 800ms (linear, infinite)

**SVG Implementation:**
```svg
<svg class="spinner" viewBox="0 0 32 32">
  <circle
    cx="16"
    cy="16"
    r="14"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-dasharray="80 80"
    stroke-linecap="round"
  />
</svg>
```

```css
.spinner {
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Progress Bar
**Visual:**
- **Height:** 4px (thin), 8px (standard), 12px (thick)
- **Border Radius:** Half of height (fully rounded)
- **Background:** `colors.neutral.200` (track)
- **Fill:** `colors.brand.500` (progress)
- **Animation:** Width 0% to 100%, or indeterminate shimmer

**Indeterminate (unknown duration):**
```css
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-bar-indeterminate::before {
  content: '';
  position: absolute;
  width: 40%;
  height: 100%;
  background: var(--color-brand-500);
  animation: indeterminate 1.5s ease-in-out infinite;
}
```

**Determinate (known progress):**
```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 65%"></div>
</div>
```

#### Skeleton Loader
**Visual:**
- **Background:** `colors.neutral.200`
- **Shape:** Rectangle with rounded corners (matches content)
- **Animation:** Shimmer effect (left to right)

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 0%,
    var(--color-neutral-100) 50%,
    var(--color-neutral-200) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

**Usage:**
```html
<!-- Loading a card -->
<div class="card">
  <div class="skeleton" style="width: 100%; height: 200px; margin-bottom: 12px;"></div>
  <div class="skeleton" style="width: 80%; height: 20px; margin-bottom: 8px;"></div>
  <div class="skeleton" style="width: 60%; height: 20px;"></div>
</div>
```

#### Dots Loader
**Visual:**
- **Size:** 8px per dot
- **Color:** `colors.brand.500`
- **Gap:** 8px
- **Animation:** Bounce sequentially

```css
.dots-loader {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand-500);
  animation: bounce 1.4s ease-in-out infinite;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-12px); }
}
```

### 7.3 Loading States by Component

#### Button Loading
```html
<button class="button button-loading" disabled>
  <span class="spinner"></span>
  <span>Loading...</span>
</button>
```

**Visual:**
- Spinner on left (20px)
- Text: "Loading..." (or keep original text, dimmed)
- Disabled state (prevent clicks)
- Cursor: `wait`

```css
.button-loading {
  cursor: wait;
  pointer-events: none;
  opacity: 0.8;
}

.button-loading .spinner {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
```

#### Input Loading
```html
<div class="input-wrapper">
  <input type="text" readonly />
  <span class="input-spinner"></span>
</div>
```

**Visual:**
- Spinner on right inside input (absolute position)
- Input is read-only (prevent editing during load)
- Spinner size: 20px

#### Card Loading (Skeleton)
```html
<div class="card card-loading">
  <div class="skeleton skeleton-image"></div>
  <div class="skeleton skeleton-title"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text"></div>
</div>
```

**Dimensions:**
- Image: 100% width, 200px height
- Title: 80% width, 24px height
- Text: 100% width, 16px height (first), 60% width (last)

#### Full Page Loading (Overlay)
```html
<div class="loading-overlay">
  <div class="loading-content">
    <div class="spinner spinner-large"></div>
    <p>Loading your data...</p>
  </div>
</div>
```

**Visual:**
- **Overlay:** Full screen, `rgba(255,255,255,0.9)`
- **Content:** Centered (flexbox)
- **Spinner:** 48px
- **Text:** `font-size-base`, `text-secondary`
- **Z-Index:** 9999

```css
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
```

### 7.4 Loading Text Guidelines

**Short Operations (<3s):**
- No text needed, just spinner
- Example: Button with spinner only

**Medium Operations (3-10s):**
- Brief text: "Loading...", "Saving...", "Processing..."
- Example: Button with spinner + text

**Long Operations (>10s):**
- Descriptive text: "Loading your data...", "Uploading files..."
- Optional: Progress percentage or steps
- Example: Full page overlay with message

### 7.5 Loading Animation Timing

**Spinner:**
- **Duration:** 800ms (fast enough to feel responsive)
- **Easing:** Linear (constant speed)
- **Infinite:** Yes

**Progress Bar (Indeterminate):**
- **Duration:** 1.5s (slower, more relaxed)
- **Easing:** Ease-in-out
- **Infinite:** Yes

**Skeleton Shimmer:**
- **Duration:** 1.5s
- **Easing:** Ease-in-out
- **Infinite:** Yes

**Dots Bounce:**
- **Duration:** 1.4s total (0.2s delay per dot)
- **Easing:** Ease-in-out
- **Infinite:** Yes

### 7.6 Accessibility

**ARIA Attributes:**
- `role="status"` or `role="progressbar"` on loading container
- `aria-live="polite"` (announce loading state)
- `aria-busy="true"` on element being loaded
- `aria-label="Loading"` on spinner (if no visible text)
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for progress bars

**Screen Reader:**
- Announce "Loading" when state begins
- Announce progress updates (for determinate progress)
- Announce completion

**Keyboard:**
- Disable tab navigation to loading elements
- Prevent interaction during load

---

## 8. Success State System

### 8.1 Purpose

Success states provide positive feedback when an action completes successfully.

### 8.2 Success Visual Language

**Color:**
- **Primary:** `colors.success.500` (green)
- **Background:** `colors.success.50` (light green)
- **Border:** `colors.success.200`
- **Text:** `colors.success.900` (dark green)

**Icon:**
- **Type:** Checkmark circle (✓)
- **Size:** 20px (small), 24px (medium), 32px (large)
- **Color:** `colors.success.500`

**Animation:**
- **Type:** Checkmark draw (stroke animation)
- **Duration:** 400ms
- **Easing:** Ease-out

### 8.3 Success Patterns

#### Inline Success (Form Input)
```html
<div class="input-wrapper input-success">
  <input type="text" value="john@example.com" />
  <span class="success-icon">✓</span>
  <span class="success-message">Email verified</span>
</div>
```

**Visual:**
- **Border:** `colors.success.500` (2px)
- **Icon:** Right side of input (20px)
- **Message:** Below input, `colors.success.700`, `font-size-sm`

#### Toast Success
```html
<div class="toast toast-success">
  <span class="toast-icon">✓</span>
  <div class="toast-content">
    <strong>Success!</strong>
    <p>Your changes have been saved.</p>
  </div>
  <button class="toast-close">×</button>
</div>
```

**Visual:** (See Toast Component section)

#### Alert Success
```html
<div class="alert alert-success">
  <span class="alert-icon">✓</span>
  <div class="alert-content">
    <strong>Project Created!</strong>
    <p>Your project "Website Redesign" has been created successfully.</p>
    <a href="/projects/123">View Project</a>
  </div>
</div>
```

**Visual:** (See Alert Component section)

#### Button Success State
```html
<button class="button button-success" disabled>
  <span class="success-icon">✓</span>
  <span>Saved!</span>
</button>
```

**Visual:**
- **Background:** `colors.success.500`
- **Text:** White
- **Icon:** Checkmark (20px), animated draw
- **Duration:** 2 seconds (then revert to normal)

**Animation:**
```javascript
// After save completes
button.classList.add('button-success');
button.textContent = 'Saved!';

setTimeout(() => {
  button.classList.remove('button-success');
  button.textContent = 'Save Changes';
  button.disabled = false;
}, 2000);
```

#### Modal Success
```html
<div class="modal modal-success">
  <div class="modal-icon-wrapper">
    <span class="success-icon-large">✓</span>
  </div>
  <h2>Payment Successful!</h2>
  <p>Your payment of $49.99 has been processed.</p>
  <button class="button button-primary">Continue</button>
</div>
```

**Visual:**
- **Icon:** 64px checkmark (animated)
- **Icon Background:** `colors.success.100` (circular, 96px)
- **Title:** `font-size-xl`, `text-primary`
- **Description:** `font-size-base`, `text-secondary`

### 8.4 Checkmark Animation

**SVG Checkmark:**
```svg
<svg class="checkmark" viewBox="0 0 52 52">
  <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
  <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
```

**CSS Animation:**
```css
.checkmark {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  stroke-width: 3;
  stroke: var(--color-success-500);
  stroke-miterlimit: 10;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
```

**Result:** Circle draws, then checkmark draws (sequential)

### 8.5 Success State Duration

**Transient (auto-clear):**
- **Toast:** 4000ms
- **Button state:** 2000ms
- **Inline message:** Until user action

**Persistent (manual dismiss):**
- **Alert banner:** Until user closes
- **Modal:** Until user clicks Continue/OK

### 8.6 Accessibility

**ARIA Attributes:**
- `role="status"` on success container
- `aria-live="polite"` (announce success)
- `aria-label="Success: [message]"` on icon

**Screen Reader:**
- Announce "Success, [message]"
- Read full success message
- Announce any actions available

---

## 9. Error State System

### 9.1 Purpose

Error states provide clear feedback when something goes wrong, helping users understand and fix issues.

### 9.2 Error Visual Language

**Color:**
- **Primary:** `colors.error.500` (red)
- **Background:** `colors.error.50` (light red)
- **Border:** `colors.error.200`
- **Text:** `colors.error.900` (dark red)

**Icon:**
- **Type:** X circle or alert octagon
- **Size:** 20px (small), 24px (medium), 32px (large)
- **Color:** `colors.error.500`

**Animation:**
- **Type:** Shake (horizontal)
- **Duration:** 400ms
- **Easing:** Ease-in-out

### 9.3 Error Patterns

#### Inline Error (Form Input)
```html
<div class="input-wrapper input-error">
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    value="invalid-email"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <span class="error-icon">×</span>
  <span class="error-message" id="email-error">
    Please enter a valid email address
  </span>
</div>
```

**Visual:**
- **Border:** `colors.error.500` (2px)
- **Icon:** Right side of input (20px)
- **Message:** Below input, `colors.error.700`, `font-size-sm`
- **Background:** `colors.error.50` (optional, subtle)

#### Toast Error
```html
<div class="toast toast-error">
  <span class="toast-icon">×</span>
  <div class="toast-content">
    <strong>Error</strong>
    <p>Failed to save changes. Please try again.</p>
  </div>
  <button class="toast-close">×</button>
</div>
```

**Visual:** (See Toast Component section)

#### Alert Error
```html
<div class="alert alert-error">
  <span class="alert-icon">×</span>
  <div class="alert-content">
    <strong>Upload Failed</strong>
    <p>File size exceeds 5MB limit. Please choose a smaller file.</p>
    <button class="button button-secondary">Choose Another File</button>
  </div>
  <button class="alert-close">×</button>
</div>
```

**Visual:** (See Alert Component section)

#### Form Error Summary
```html
<div class="form-errors alert-error">
  <span class="alert-icon">×</span>
  <div class="alert-content">
    <strong>Please fix the following errors:</strong>
    <ul>
      <li><a href="#email">Email is required</a></li>
      <li><a href="#password">Password must be at least 8 characters</a></li>
    </ul>
  </div>
</div>
```

**Visual:**
- Appears at top of form
- Each error links to field (with focus on click)
- List style: Bullet points, `colors.error.700`

#### Modal Error
```html
<div class="modal modal-error">
  <div class="modal-icon-wrapper">
    <span class="error-icon-large">×</span>
  </div>
  <h2>Payment Failed</h2>
  <p>Your card was declined. Please check your payment information and try again.</p>
  <button class="button button-primary">Try Again</button>
  <button class="button button-ghost">Cancel</button>
</div>
```

**Visual:**
- **Icon:** 64px X (animated)
- **Icon Background:** `colors.error.100` (circular, 96px)
- **Animation:** Shake on appear

### 9.4 Shake Animation

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
  20%, 40%, 60%, 80% { transform: translateX(8px); }
}

.error-shake {
  animation: shake 400ms ease-in-out;
}
```

**Usage:** Apply to input field or error container on validation fail

### 9.5 Error Message Guidelines

**Be Specific:**
- ❌ "Invalid input"
- ✅ "Email must include @ symbol"

**Be Helpful:**
- ❌ "Error 422"
- ✅ "Please enter a valid email address"

**Provide Next Steps:**
- ❌ "Failed to upload"
- ✅ "Upload failed. File size exceeds 5MB. Please choose a smaller file."

**Use Plain Language:**
- ❌ "Username validation constraint violation"
- ✅ "Username must be 3-20 characters"

### 9.6 Error State Duration

**Transient:**
- **Toast:** Manual dismiss (or 8000ms for non-critical)
- **Shake animation:** 400ms (once)

**Persistent:**
- **Inline errors:** Until field is corrected
- **Alert banner:** Until user dismisses
- **Form summary:** Until all errors fixed

### 9.7 Accessibility

**ARIA Attributes:**
- `role="alert"` on error container
- `aria-live="assertive"` (immediate announcement)
- `aria-invalid="true"` on invalid input
- `aria-describedby="error-message-id"` (link input to error)

**Screen Reader:**
- Announce "Error, [message]" immediately
- Read error message when field is focused
- Announce when error is fixed ("Valid")

**Focus Management:**
- Focus first invalid field on form submit
- Don't focus error message itself (focus field)

---

## 10. Warning State System

### 10.1 Purpose

Warning states alert users to potentially problematic situations that require attention but aren't blocking errors.

### 10.2 Warning Visual Language

**Color:**
- **Primary:** `colors.warning.500` (orange)
- **Background:** `colors.warning.50` (light orange)
- **Border:** `colors.warning.200`
- **Text:** `colors.warning.900` (dark orange)

**Icon:**
- **Type:** Alert triangle (⚠️)
- **Size:** 20px (small), 24px (medium), 32px (large)
- **Color:** `colors.warning.500`

**Animation:**
- **Type:** Pulse (scale + opacity)
- **Duration:** 1000ms
- **Easing:** Ease-in-out
- **Repeat:** 2-3 times (then stop)

### 10.3 Warning Patterns

#### Inline Warning (Form Input)
```html
<div class="input-wrapper input-warning">
  <label for="password">Password</label>
  <input type="password" id="password" value="weak" aria-describedby="password-warning" />
  <span class="warning-icon">⚠️</span>
  <span class="warning-message" id="password-warning">
    Weak password. Consider adding numbers and symbols.
  </span>
</div>
```

**Visual:**
- **Border:** `colors.warning.500` (2px)
- **Icon:** Right side of input (20px)
- **Message:** Below input, `colors.warning.700`, `font-size-sm`

**Note:** Input still allows submission (unlike error)

#### Toast Warning
```html
<div class="toast toast-warning">
  <span class="toast-icon">⚠️</span>
  <div class="toast-content">
    <strong>Warning</strong>
    <p>Connection is unstable. Your changes may not be saved.</p>
  </div>
  <button class="toast-close">×</button>
</div>
```

**Visual:** (See Toast Component section)
**Duration:** 6000ms (longer than success)

#### Alert Warning
```html
<div class="alert alert-warning">
  <span class="alert-icon">⚠️</span>
  <div class="alert-content">
    <strong>Subscription Expiring Soon</strong>
    <p>Your subscription expires in 3 days. Renew now to avoid service interruption.</p>
    <button class="button button-warning">Renew Now</button>
  </div>
  <button class="alert-close">×</button>
</div>
```

**Visual:** (See Alert Component section)

#### Warning Badge
```html
<button class="button">
  Notifications
  <span class="badge badge-warning">!</span>
</button>
```

**Visual:**
- **Background:** `colors.warning.500`
- **Text:** White
- **Size:** 20px (small circle)
- **Position:** Top right of button
- **Content:** "!" or number

#### Modal Warning (Confirmation)
```html
<div class="modal modal-warning">
  <div class="modal-icon-wrapper">
    <span class="warning-icon-large">⚠️</span>
  </div>
  <h2>Unsaved Changes</h2>
  <p>You have unsaved changes. Do you want to save before leaving?</p>
  <div class="modal-actions">
    <button class="button button-ghost">Don't Save</button>
    <button class="button button-warning">Save Changes</button>
  </div>
</div>
```

**Visual:**
- **Icon:** 64px triangle (animated pulse)
- **Icon Background:** `colors.warning.100` (circular, 96px)
- **Button:** Orange background (`colors.warning.500`)

### 10.4 Pulse Animation

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.warning-pulse {
  animation: pulse 1000ms ease-in-out 3; /* Repeat 3 times */
}
```

**Usage:** Apply to warning icon to draw attention

### 10.5 Warning vs Error Distinction

**Warning:**
- **Non-blocking:** User can proceed
- **Advisory:** Suggests caution
- **Orange color**
- **Examples:**
  - Weak password (still allows sign up)
  - Unsaved changes (can still navigate)
  - Low storage (can still upload)

**Error:**
- **Blocking:** User cannot proceed
- **Critical:** Requires fix
- **Red color**
- **Examples:**
  - Invalid email (cannot submit)
  - Required field empty (cannot save)
  - File too large (cannot upload)

### 10.6 Warning Message Guidelines

**Be Clear About Impact:**
- ✅ "Your subscription expires in 3 days. Renew to avoid interruption."
- ✅ "Password is weak. Add numbers and symbols for better security."

**Suggest Actions:**
- ✅ "Low storage (85% full). Delete old files or upgrade plan."
- ✅ "Connection is slow. Some features may be limited."

**Don't Overuse:**
- Use warnings sparingly (avoid warning fatigue)
- Reserve for truly important situations
- Don't warn about every minor issue

### 10.7 Accessibility

**ARIA Attributes:**
- `role="alert"` or `role="status"` (based on urgency)
- `aria-live="polite"` (less urgent than errors)
- `aria-label="Warning: [message]"` on icon

**Screen Reader:**
- Announce "Warning, [message]"
- Read full warning message
- Announce suggested actions

**Visual:**
- Ensure icon + color + text (don't rely on color alone)
- Maintain contrast ratio ≥ 3:1 (orange on white)

---

## Summary

This document provides complete specifications for 10 feedback components and state systems:

**Components:**
1. **Toast** - Temporary notifications with auto-dismiss
2. **Alert** - Persistent banners with contextual feedback
3. **ConfirmDialog** - Modal confirmations for critical actions

**State Systems:**
4. **Hover** - 5% color shift, elevation change
5. **Focus** - 2px ring, high contrast, keyboard-friendly
6. **Disabled** - 50% opacity, not-allowed cursor
7. **Loading** - Spinner, progress bar, skeleton, dots
8. **Success** - Green checkmark, positive feedback
9. **Error** - Red X, shake animation, helpful messages
10. **Warning** - Orange triangle, pulse animation, advisory

**Key Principles:**
- **Accessibility First:** WCAG AA compliance, ARIA attributes, screen reader support
- **Consistent Patterns:** Reusable across all components
- **Clear Communication:** Visual + text + interaction
- **Performance:** Smooth animations (60fps), optimized timing
- **Responsive:** Works on all devices and screen sizes

**Total Word Count:** 9,500+ words
**Files Created:** 3 comprehensive specification documents

**Absolute File Paths:**
1. `/Users/fabiobrunning/Library/Mobile Documents/iCloud~md~obsidian/Documents/Fabio BB/10-Negócios/10.02-Produto/Desing/docs/02-DESIGN/phase-3-data-components-specs.md`
2. `/Users/fabiobrunning/Library/Mobile Documents/iCloud~md~obsidian/Documents/Fabio BB/10-Negócios/10.02-Produto/Desing/docs/02-DESIGN/phase-3-input-components-specs.md`
3. `/Users/fabiobrunning/Library/Mobile Documents/iCloud~md~obsidian/Documents/Fabio BB/10-Negócios/10.02-Produto/Desing/docs/02-DESIGN/phase-3-feedback-components-specs.md`

All specifications are production-ready for developer implementation.
