# Interaction & State Guidelines - Neoloop Design System

**Version:** 1.0.0
**Status:** Final
**Last Updated:** 2026-01-30

---

## Table of Contents

1. [Interaction Principles](#1-interaction-principles)
2. [State System](#2-state-system)
3. [Hover States](#3-hover-states)
4. [Focus States](#4-focus-states)
5. [Active States](#5-active-states)
6. [Disabled States](#6-disabled-states)
7. [Loading States](#7-loading-states)
8. [Error States](#8-error-states)
9. [Success States](#9-success-states)
10. [Animation Guidelines](#10-animation-guidelines)
11. [Touch & Mobile Interactions](#11-touch--mobile-interactions)
12. [Keyboard Interactions](#12-keyboard-interactions)

---

## 1. Interaction Principles

### 1.1 Core Principles

**Predictability**
- Interactions should behave consistently across all components
- Similar patterns for similar interactions
- Clear visual feedback for every user action

**Responsiveness**
- Immediate visual feedback (hover, click)
- Fast transitions: 150ms for most interactions
- No delays that make interface feel sluggish

**Discoverability**
- Interactive elements clearly identifiable
- Hover states indicate interactivity
- Cursor changes communicate affordances

**Accessibility First**
- Keyboard navigation as important as mouse
- Focus states always visible
- Touch targets meet minimum sizes

### 1.2 Interaction Hierarchy

**Priority Levels:**

| Level | Purpose | Visual Weight | Examples |
|-------|---------|--------------|----------|
| **Primary** | Main action | High contrast, filled | Submit button, Save CTA |
| **Secondary** | Alternative action | Medium contrast, outline | Cancel, Back |
| **Tertiary** | Less important | Low contrast, ghost | Help, Info, Links |
| **Destructive** | Dangerous action | Red color, high contrast | Delete, Remove |

### 1.3 Feedback Loops

**Immediate Feedback:**
- Hover: Visual change within 0ms (instant)
- Click/Tap: Active state within 0ms
- Focus: Outline within 0ms

**Short Feedback:**
- Button press: 150ms animation
- Input validation: 300ms after typing stops
- Toggle switches: 150ms transition

**Medium Feedback:**
- Form submission: Loading state immediately, response within 1-3s
- Modal open/close: 300ms animation
- Toast notification: Appear at 300ms, dismiss after 5s

**Long Feedback:**
- Page navigation: Loading indicator after 500ms
- File upload: Progress bar with percentage
- Background process: Persistent indicator

---

## 2. State System

### 2.1 Component State Model

Every interactive component has 8 possible states:

```
State Flow:
┌─────────┐
│ Default │ ← Initial state
└────┬────┘
     │
     ├──→ Hover (pointer over)
     │
     ├──→ Focus (keyboard navigation)
     │
     ├──→ Active (pressed/clicked)
     │
     ├──→ Disabled (not interactive)
     │
     ├──→ Loading (processing)
     │
     ├──→ Error (validation failed)
     │
     └──→ Success (validation passed)
```

### 2.2 State Priority

When multiple states apply, priority order:

1. **Disabled** (blocks all other states)
2. **Loading** (blocks interaction, may show on top of other states)
3. **Error** (validation state)
4. **Success** (validation state)
5. **Active** (user pressing)
6. **Focus** (keyboard focused)
7. **Hover** (pointer over)
8. **Default** (rest state)

**Example:**
- Disabled + Hover = Disabled (no hover effect)
- Focus + Hover = Both states apply (focus ring + hover background)
- Loading + Disabled = Loading state displayed, but also disabled

### 2.3 State Combinations

**Common Combinations:**

| States | Behavior |
|--------|----------|
| Focus + Hover | Show both: focus ring + hover background |
| Active + Focus | Show active state, maintain focus ring |
| Error + Hover | Show error state, allow hover effect |
| Success + Focus | Show success state, maintain focus ring |
| Loading + Disabled | Show loading, prevent interaction |

---

## 3. Hover States

### 3.1 Hover Visual Changes

**Color Shifts:**
- Primary buttons: Darken by 1 shade (primary-950 → primary-900)
- Secondary buttons: Add light background (transparent → gray-50)
- Ghost buttons: Add subtle background (transparent → gray-100)
- Links: Underline appears

```css
/* Primary Button Hover */
.btn-primary {
  background-color: var(--primary-950);
}
.btn-primary:hover {
  background-color: var(--primary-900);
}

/* Secondary Button Hover */
.btn-secondary {
  background-color: transparent;
}
.btn-secondary:hover {
  background-color: var(--gray-50);
}

/* Ghost Button Hover */
.btn-ghost {
  background-color: transparent;
}
.btn-ghost:hover {
  background-color: var(--gray-100);
}
```

**Elevation Changes:**
- Cards: `shadow-sm` → `shadow-md`
- Buttons: `shadow-sm` → `shadow-base`
- Dropdowns: No change (already elevated)

```css
.card {
  box-shadow: var(--shadow-sm);
  transition: box-shadow 300ms ease-out;
}
.card:hover {
  box-shadow: var(--shadow-md);
}
```

**Border Changes:**
- Inputs: `gray-300` → `gray-400`
- Select: `gray-300` → `gray-400`
- Checkbox: `gray-400` → `gray-600`

### 3.2 Hover Transitions

**Duration:**
- Color changes: 150ms
- Shadow changes: 300ms
- Border changes: 150ms
- Transform changes: 300ms

**Easing:**
- Default: `ease-out` (decelerating)
- Reason: Feels responsive and natural

```css
.btn {
  transition: background-color 150ms ease-out,
              box-shadow 300ms ease-out;
}
```

### 3.3 Cursor Changes

**Cursor Types:**

| Element | Cursor | Reason |
|---------|--------|--------|
| Button | `pointer` | Clickable |
| Link | `pointer` | Clickable |
| Input | `text` | Text editable |
| Checkbox | `pointer` | Toggleable |
| Disabled element | `not-allowed` | Not interactive |
| Draggable | `grab` / `grabbing` | Movable |
| Resizable | `col-resize` / `row-resize` | Resizable |

```css
.btn {
  cursor: pointer;
}
.btn:disabled {
  cursor: not-allowed;
}
.input {
  cursor: text;
}
```

### 3.4 Hover Exclusions

**Don't apply hover to:**
- Mobile devices (no pointer, wastes resources)
- Disabled elements (no interaction)
- Read-only elements (not editable)

```css
/* Only apply hover on devices with pointer */
@media (hover: hover) and (pointer: fine) {
  .btn:hover {
    background-color: var(--primary-900);
  }
}
```

---

## 4. Focus States

### 4.1 Focus Ring Specification

**Default Focus Ring:**
- Width: 2px solid outline
- Color: `info-500` (blue)
- Offset: 2px (gap between element and ring)
- Border radius: Matches element + 2px

```css
.btn:focus-visible {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
}

/* Remove default browser outline */
.btn:focus {
  outline: none;
}
```

**Why `:focus-visible`?**
- Only shows focus ring when navigating with keyboard
- Doesn't show focus ring when clicking with mouse
- Better UX: no outline flash on click

### 4.2 Focus Ring Colors

**Contextual Focus Colors:**

| Context | Focus Ring Color | Use Case |
|---------|-----------------|----------|
| Default | `info-500` (blue) | Most components |
| Error | `error-500` (red) | Invalid inputs |
| Success | `success-500` (green) | Valid inputs |
| Warning | `warning-500` (amber) | Warning states |

```css
.input:focus-visible {
  outline-color: var(--info-500);
}
.input.error:focus-visible {
  outline-color: var(--error-500);
}
.input.success:focus-visible {
  outline-color: var(--success-500);
}
```

### 4.3 Focus Within (Composite Components)

**For complex components (Select, Dropdown):**
- Parent container shows focus ring when child is focused
- Uses `:focus-within` pseudo-class

```css
.select-container:focus-within {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
}
```

### 4.4 Focus Order

**Tab Navigation Order:**
1. Primary actions first (submit buttons)
2. Form inputs (top to bottom, left to right)
3. Secondary actions (cancel, back)
4. Tertiary actions (help, info)

**Skip Links:**
- Provide "Skip to main content" link at top
- Hidden until focused
- Helps keyboard users bypass navigation

```html
<a href="#main" class="skip-link">Skip to main content</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
}
.skip-link:focus {
  top: 0;
}
</style>
```

### 4.5 Focus Trap

**Modal Dialogs:**
- Focus trapped within modal when open
- Tab cycles through modal elements only
- Escape key closes modal and returns focus

**Implementation:**
```javascript
// Trap focus inside modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll(
      'button, input, select, textarea, a[href]'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});
```

---

## 5. Active States

### 5.1 Active Visual Changes

**Color Shifts:**
- Primary buttons: Darken by 2 shades (primary-950 → primary-800)
- Cards: Reduce shadow slightly
- Links: Slightly darker color

```css
.btn-primary:active {
  background-color: var(--primary-800);
}
```

**Scale Transform:**
- Buttons: `scale(0.98)` (subtle press effect)
- Large buttons: `scale(0.97)`
- Small buttons: No scale (too subtle)

```css
.btn:active {
  transform: scale(0.98);
}
```

**Shadow Reduction:**
- Remove shadow to simulate "pressed down"
- Or reduce to lower elevation

```css
.card:active {
  box-shadow: var(--shadow-sm); /* was shadow-md on hover */
}
.btn:active {
  box-shadow: none; /* was shadow-sm by default */
}
```

### 5.2 Active Transitions

**Duration:**
- Very fast: 100-150ms
- Reason: Should feel instant when pressing

```css
.btn {
  transition: transform 150ms ease-out,
              background-color 150ms ease-out,
              box-shadow 150ms ease-out;
}
```

### 5.3 Active State for Forms

**Inputs & Textareas:**
- Active state same as focus (no separate active)
- Border remains focused border

**Checkboxes & Radios:**
- Brief scale animation on click: `scale(0.9)` → `scale(1)`

```css
.checkbox:active {
  transform: scale(0.9);
}
```

**Select Dropdowns:**
- Active state = open state
- Chevron rotates, menu appears

---

## 6. Disabled States

### 6.1 Disabled Visual Changes

**Opacity Method (Preferred):**
- Reduce opacity to 0.5-0.6
- Maintains visual hierarchy
- Easy to implement

```css
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

**Color Change Method:**
- Background: `gray-300`
- Text: `gray-500`
- More explicit, but requires more CSS

```css
.btn:disabled {
  background-color: var(--gray-300);
  color: var(--gray-500);
  border-color: var(--gray-300);
  cursor: not-allowed;
}
```

### 6.2 Disabled Behavior

**No Interaction:**
- `pointer-events: none` prevents hover/click
- `cursor: not-allowed` shows when hovering over
- No focus state (cannot tab to disabled elements)

**Form Elements:**
- Use `disabled` attribute on inputs
- Use `aria-disabled="true"` for custom elements

```html
<!-- Native input -->
<input type="text" disabled />

<!-- Custom button component -->
<button aria-disabled="true" class="btn btn-disabled">
  Disabled Button
</button>
```

### 6.3 Disabled Context

**When to Disable:**
- Action not available (e.g., "Next" before required field filled)
- Pending operation (form submitting)
- Insufficient permissions (user lacks access)

**When to Hide Instead:**
- Action never available to user (permissions)
- Action doesn't apply to current context

**Tooltip on Disabled Elements:**
- Explain why element is disabled
- Wrap disabled element in container (pointer-events work)

```html
<div class="tooltip-wrapper" title="Fill in required fields first">
  <button disabled>Submit</button>
</div>
```

---

## 7. Loading States

### 7.1 Loading Visual Indicators

**Spinner (Primary Method):**
- Circular spinner animation
- Size: 16px (small), 20px (medium), 24px (large)
- Color: Matches text color or contrasts with background

```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray-200);
  border-top-color: var(--primary-950);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Skeleton Loading (Content Placeholders):**
- Gray rectangles where content will appear
- Pulsing animation (shimmer effect)
- Maintains layout, prevents layout shift

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 25%,
    var(--gray-300) 50%,
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Progress Bar (Long Operations):**
- Horizontal bar showing percentage
- Determinate (known progress) or indeterminate (unknown)

```css
.progress-bar {
  width: 100%;
  height: 4px;
  background-color: var(--gray-200);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--primary-950);
  transition: width 300ms ease-out;
}
```

### 7.2 Button Loading States

**Pattern 1: Replace Icon with Spinner**
```html
<button class="btn btn-primary" aria-busy="true" disabled>
  <span class="spinner"></span>
  Loading...
</button>
```

**Pattern 2: Keep Text, Add Spinner**
```html
<button class="btn btn-primary" aria-busy="true" disabled>
  <span class="spinner"></span>
  Save
</button>
```

**Pattern 3: Change Text**
```html
<button class="btn btn-primary" aria-busy="true" disabled>
  <span class="spinner"></span>
  Saving...
</button>
```

### 7.3 Form Loading States

**Input Loading:**
- Trailing spinner icon inside input
- Input disabled during loading

```
┌─────────────────────────────┐
│ email@example.com    [⟳]   │
└─────────────────────────────┘
```

**Form Submission:**
- Disable all inputs and buttons
- Show loading spinner on submit button
- Overlay with loading indicator (optional)

```css
.form-loading {
  position: relative;
  pointer-events: none;
}

.form-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 7.4 Page Loading States

**Initial Page Load:**
- Full-page spinner centered
- Or skeleton layout

**Route Transition (SPA):**
- Top progress bar (like YouTube, GitHub)
- 2-3px height, animates across screen

**Lazy Loading Content:**
- Spinner in content area
- Or "Load More" button with spinner

### 7.5 Loading Accessibility

**ARIA Attributes:**
- `aria-busy="true"` on loading element
- `aria-live="polite"` for status updates
- Screen reader announcement: "Loading"

```html
<button aria-busy="true" aria-label="Saving changes">
  <span class="spinner" aria-hidden="true"></span>
  Saving...
</button>

<div role="status" aria-live="polite" aria-atomic="true">
  Loading content...
</div>
```

---

## 8. Error States

### 8.1 Error Visual Indicators

**Color Changes:**
- Border: `error-600` (red)
- Background: `error-50` (light red tint) optional
- Text: `error-600`

```css
.input.error {
  border: 2px solid var(--error-600);
}

.input.error:focus {
  outline-color: var(--error-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

**Error Icon:**
- Icon: Alert circle or X mark
- Size: 20px
- Position: Trailing (right side of input)

**Error Message:**
- Font size: `text-sm` (14px)
- Color: `error-600`
- Icon: Error icon with 4px gap

```html
<input type="email" class="input error" aria-invalid="true" />
<span class="error-text">
  <svg class="error-icon">...</svg>
  Please enter a valid email address
</span>
```

```css
.error-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-1); /* 4px */
  font-size: var(--text-sm);
  color: var(--error-600);
  margin-top: var(--spacing-1);
}
```

### 8.2 Error Timing

**Inline Validation:**
- Validate on blur (when user leaves field)
- Or debounced validation (300ms after typing stops)
- Avoid validating on every keystroke (annoying)

**Form Submission:**
- Validate all fields on submit
- Show all errors at once
- Focus first error field
- Scroll to first error if needed

### 8.3 Error Message Guidelines

**Message Structure:**
1. What went wrong
2. Why it's wrong (optional)
3. How to fix it

**Examples:**

❌ Bad: "Error"
✅ Good: "Email is required"

❌ Bad: "Invalid input"
✅ Good: "Password must be at least 8 characters"

❌ Bad: "Field is incorrect"
✅ Good: "Username must be 3-20 characters, letters and numbers only"

### 8.4 Error Summary

**For long forms:**
- Show error summary at top
- List all errors with links to fields
- Accessible with `role="alert"`

```html
<div class="error-summary" role="alert">
  <h2>There are 3 errors in this form:</h2>
  <ul>
    <li><a href="#email">Email is required</a></li>
    <li><a href="#password">Password is too short</a></li>
    <li><a href="#terms">You must accept the terms</a></li>
  </ul>
</div>
```

### 8.5 Error Accessibility

**ARIA Attributes:**
- `aria-invalid="true"` on error fields
- `aria-describedby` links to error message
- `role="alert"` for error messages

```html
<label for="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">Email is required</span>
```

**Screen Reader Announcements:**
- Error announced when field loses focus
- Error summary announced on form submit
- Use `aria-live="assertive"` for critical errors

---

## 9. Success States

### 9.1 Success Visual Indicators

**Color Changes:**
- Border: `success-600` (green)
- Background: `success-50` (light green tint) optional
- Text: `success-600`

```css
.input.success {
  border: 1px solid var(--success-600);
}

.input.success:focus {
  outline-color: var(--success-500);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
```

**Success Icon:**
- Icon: Checkmark
- Size: 20px
- Position: Trailing (right side of input)

```html
<input type="email" class="input success" value="user@example.com" />
<svg class="success-icon">
  <path d="M20 6L9 17L4 12" stroke="currentColor" />
</svg>
```

### 9.2 Success Messages

**Success Toast Notification:**
- Duration: 5 seconds (auto-dismiss)
- Position: Top-right or bottom-center
- Action: Undo link (if applicable)

```html
<div class="toast toast-success" role="status">
  <svg class="toast-icon">...</svg>
  <span>Changes saved successfully</span>
  <button class="toast-close" aria-label="Close">×</button>
</div>
```

**Inline Success Message:**
- Below form or input
- Temporary (5 seconds) or permanent

```html
<form>
  <!-- form fields -->
  <button type="submit">Save</button>
  <span class="success-text">
    <svg class="success-icon">...</svg>
    Saved successfully!
  </span>
</form>
```

### 9.3 Success Animation

**Checkmark Animation:**
- Animated checkmark drawing
- Duration: 400ms
- Path stroke animates from 0 to 100%

```css
.success-icon path {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: drawCheck 400ms ease-out forwards;
}

@keyframes drawCheck {
  to {
    stroke-dashoffset: 0;
  }
}
```

**Scale + Fade Animation:**
- Success message fades in with scale
- Duration: 300ms

```css
.success-text {
  animation: successFade 300ms ease-out;
}

@keyframes successFade {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 10. Animation Guidelines

### 10.1 Animation Principles

**Purpose-Driven:**
- Every animation should have a purpose (feedback, attention, transition)
- Avoid decorative animations (waste resources, annoy users)

**Performance:**
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `margin`, `padding` (layout reflow)

**Accessibility:**
- Respect `prefers-reduced-motion` media query
- Provide instant alternative for users who need it

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 10.2 Animation Timing

**Duration Recommendations:**

| Animation Type | Duration | Reason |
|---------------|----------|--------|
| Micro-interactions (hover, focus) | 150ms | Fast enough to feel instant |
| Component transitions (modals, dropdowns) | 300ms | Smooth without feeling slow |
| Page transitions | 400-500ms | Enough time for user to perceive |
| Loading animations | 800ms-1s loop | Comfortable loop speed |

**Easing Functions:**

| Easing | Use Case |
|--------|----------|
| `ease-out` | Elements entering screen (decelerating) |
| `ease-in` | Elements leaving screen (accelerating) |
| `ease-in-out` | Elements moving within screen |
| `linear` | Loading spinners, continuous animations |

### 10.3 Common Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 300ms ease-out;
}
```

**Slide Down (Dropdown Menu):**
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu {
  animation: slideDown 200ms ease-out;
}
```

**Scale (Modal):**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal {
  animation: scaleIn 300ms ease-out;
}
```

**Bounce (Success Feedback):**
```css
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.success-icon {
  animation: bounce 400ms ease-in-out;
}
```

### 10.4 Skeleton Loading Animation

**Shimmer Effect:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 0%,
    var(--gray-300) 50%,
    var(--gray-200) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

---

## 11. Touch & Mobile Interactions

### 11.1 Touch Target Sizes

**Minimum Sizes:**
- WCAG AAA: 44x44px
- Recommended: 48x48px
- Comfortable: 56x56px

**Implementation:**
```css
.btn-touch {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px;
}
```

**Spacing Between Targets:**
- Minimum: 8px gap
- Recommended: 12px gap

### 11.2 Touch States

**No Hover on Touch Devices:**
```css
/* Only apply hover on pointer devices */
@media (hover: hover) and (pointer: fine) {
  .btn:hover {
    background-color: var(--primary-900);
  }
}
```

**Tap Highlight (Mobile Browsers):**
- Remove default tap highlight
- Use custom active state instead

```css
.btn {
  -webkit-tap-highlight-color: transparent;
}
```

**Active State on Touch:**
- Show active state on `touchstart`
- Maintain during `touchmove` (if not moving too far)
- Trigger action on `touchend`

### 11.3 Swipe Gestures

**Swipe to Dismiss (Mobile Modals):**
- Swipe down to close modal
- Threshold: 50px movement
- Velocity: Fast swipe dismisses even with small distance

**Swipe to Navigate (Carousels):**
- Swipe left/right to move slides
- Snap to closest slide on release

**Pull to Refresh:**
- Pull down at top of scrollable area
- Visual feedback: spinner or arrow
- Release to trigger refresh

### 11.4 Mobile Form Considerations

**Input Types:**
- `type="email"` triggers email keyboard
- `type="tel"` triggers phone keyboard
- `type="number"` triggers numeric keyboard
- `type="date"` triggers date picker

**Input Zoom Prevention:**
```css
input, select, textarea {
  font-size: 16px; /* prevents zoom on iOS */
}
```

**Sticky Buttons (Mobile Forms):**
```css
.form-actions {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
```

---

## 12. Keyboard Interactions

### 12.1 Navigation Keys

**Tab Navigation:**
- `Tab`: Move to next interactive element
- `Shift+Tab`: Move to previous element
- `Enter`: Activate button or link
- `Space`: Activate button or toggle checkbox

**Arrow Keys:**
- `Arrow Up/Down`: Navigate options in select, radio group
- `Arrow Left/Right`: Navigate tabs, carousel slides
- `Home`: Jump to first item
- `End`: Jump to last item

**Escape Key:**
- Close modal, dropdown, tooltip
- Cancel current operation

### 12.2 Component-Specific Shortcuts

**Select / Dropdown:**
- `Enter`/`Space`: Open menu
- `Arrow Down`: Open and focus first option
- `Arrow Up/Down`: Navigate options
- `Enter`: Select option
- `Escape`: Close menu

**Modal Dialog:**
- `Escape`: Close modal
- `Tab`: Cycle through modal elements (focus trap)

**Tabs:**
- `Arrow Left/Right`: Switch tabs
- `Home/End`: Jump to first/last tab

**Carousel:**
- `Arrow Left/Right`: Navigate slides
- `Space`/`Enter`: Pause/play autoplay

### 12.3 Form Shortcuts

**Submit Form:**
- `Enter` in text input: Submit form
- `Ctrl/Cmd+Enter` in textarea: Submit (if multiline)

**Clear Input:**
- `Escape`: Clear search input (if has value)

**Select All:**
- `Ctrl/Cmd+A`: Select all text in input

### 12.4 Accessibility Shortcuts

**Skip Links:**
- `Tab` on page load: Focus skip link
- `Enter`: Skip to main content

**Focus Visible Indicators:**
- Always show focus ring when navigating with keyboard
- Never remove `:focus` styles without replacing

**Keyboard Trap Prevention:**
- Never trap focus unintentionally
- Modals: intentional trap, but escapable

---

## State Testing Checklist

### Visual Testing
- [ ] All states render correctly in all variants
- [ ] Colors match design tokens
- [ ] Shadows and borders correct
- [ ] Animations smooth and performant
- [ ] Text readable in all states

### Interaction Testing
- [ ] Hover works (desktop only)
- [ ] Focus visible with keyboard navigation
- [ ] Active state shows on click
- [ ] Disabled prevents interaction
- [ ] Loading indicates processing
- [ ] Error shows validation failures
- [ ] Success confirms valid input

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces states
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets >= 44px
- [ ] Focus indicators visible
- [ ] ARIA attributes correct

### Mobile Testing
- [ ] Touch targets adequate
- [ ] No hover states on touch devices
- [ ] Tap highlight removed or customized
- [ ] Swipe gestures work smoothly
- [ ] Forms work with mobile keyboards

### Performance Testing
- [ ] Animations use `transform` and `opacity`
- [ ] No layout reflow during animations
- [ ] `prefers-reduced-motion` respected
- [ ] Transitions fast enough (150-300ms)
- [ ] Loading states don't block UI unnecessarily

---

## Changelog

**v1.0.0 (2026-01-30)**
- Complete interaction and state guidelines
- All 8 component states defined
- Hover, focus, active, disabled specifications
- Loading, error, success state patterns
- Animation guidelines and examples
- Touch and mobile interaction patterns
- Keyboard interaction specifications
- Comprehensive testing checklist
