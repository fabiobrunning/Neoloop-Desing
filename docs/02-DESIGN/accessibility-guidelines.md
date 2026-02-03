# Accessibility Guidelines - Neoloop Design System

**Version:** 1.0.0
**Status:** Final
**Last Updated:** 2026-01-30

---

## Table of Contents

1. [Accessibility Principles](#1-accessibility-principles)
2. [WCAG Compliance](#2-wcag-compliance)
3. [Color Contrast](#3-color-contrast)
4. [Typography Accessibility](#4-typography-accessibility)
5. [Keyboard Navigation](#5-keyboard-navigation)
6. [Screen Reader Support](#6-screen-reader-support)
7. [Focus Management](#7-focus-management)
8. [Touch Targets](#8-touch-targets)
9. [Forms Accessibility](#9-forms-accessibility)
10. [Motion & Animation](#10-motion--animation)
11. [Semantic HTML](#11-semantic-html)
12. [ARIA Patterns](#12-aria-patterns)
13. [Testing Guidelines](#13-testing-guidelines)

---

## 1. Accessibility Principles

### 1.1 The Four POUR Principles

**Perceivable**
- Information must be presentable to users in ways they can perceive
- Provide text alternatives for non-text content
- Provide captions and alternatives for multimedia
- Create content that can be presented in different ways
- Make it easy to see and hear content

**Operable**
- User interface must be operable
- Make all functionality available from keyboard
- Give users enough time to read and use content
- Do not use content that causes seizures
- Help users navigate and find content

**Understandable**
- Information and UI operation must be understandable
- Make text readable and understandable
- Make content appear and operate in predictable ways
- Help users avoid and correct mistakes

**Robust**
- Content must be robust enough to be interpreted reliably
- Maximize compatibility with current and future tools
- Use valid, semantic HTML
- Support assistive technologies

### 1.2 Design for All Users

**Permanent Disabilities:**
- Visual: Blind, low vision, color blind
- Auditory: Deaf, hard of hearing
- Motor: Limited dexterity, paralysis
- Cognitive: Learning disabilities, memory issues

**Temporary Disabilities:**
- Broken arm (motor)
- Ear infection (auditory)
- Eye surgery (visual)
- Concussion (cognitive)

**Situational Disabilities:**
- Bright sunlight (visual)
- Noisy environment (auditory)
- Holding baby (motor)
- Stress/distraction (cognitive)

### 1.3 Accessibility as Default

**Build In, Don't Bolt On:**
- Accessibility should be part of initial design, not an afterthought
- Test with assistive technologies during development
- Include people with disabilities in user testing

**Progressive Enhancement:**
- Start with semantic HTML (works without CSS/JS)
- Layer on CSS for visual design
- Add JavaScript for enhanced interactions
- Ensure functionality works at each layer

---

## 2. WCAG Compliance

### 2.1 WCAG Levels

**Level A (Minimum):**
- Essential accessibility features
- If not met, some users cannot access content
- Examples: Alt text for images, keyboard navigation

**Level AA (Recommended Target):**
- Removes barriers for most users
- Industry standard for compliance
- Examples: 4.5:1 contrast ratio, larger touch targets

**Level AAA (Enhanced):**
- Highest level of accessibility
- Not always achievable for all content
- Examples: 7:1 contrast ratio, sign language videos

### 2.2 Neoloop Design System Target: WCAG 2.1 Level AA

**Key Success Criteria (AA):**

| Criterion | Requirement | Design System Implementation |
|-----------|-------------|------------------------------|
| 1.4.3 Contrast (Minimum) | 4.5:1 for text, 3:1 for large text | All text colors meet AA contrast |
| 1.4.5 Images of Text | Avoid text in images | Use web fonts, not image text |
| 2.4.7 Focus Visible | Visible focus indicator | 2px outline, 2px offset on all interactive |
| 3.2.3 Consistent Navigation | Navigation consistent | Standardized component patterns |
| 3.3.1 Error Identification | Errors identified in text | Error messages with descriptions |
| 3.3.2 Labels or Instructions | Form labels provided | All inputs have visible labels |
| 4.1.2 Name, Role, Value | ARIA when needed | Semantic HTML + ARIA attributes |

### 2.3 Going Beyond AA (AAA Where Possible)

**Enhanced Contrast (AAA):**
- Primary text: 21:1 (gray-950 on white)
- Secondary text: 12.6:1 (gray-700 on white)
- Exceeds AAA requirement of 7:1

**Larger Touch Targets (AAA):**
- Minimum: 44x44px (AA requirement)
- Recommended: 48x48px (AAA level 2.5.5)

**Line Height (AAA 1.4.12):**
- Body text: 1.5 line height (meets 1.5 minimum)
- Paragraph spacing: 2x font size (meets requirement)

---

## 3. Color Contrast

### 3.1 Contrast Requirements

**WCAG Contrast Ratios:**

| Text Size | Level AA | Level AAA |
|-----------|----------|-----------|
| Small text (< 18px regular, < 14px bold) | 4.5:1 | 7:1 |
| Large text (≥ 18px regular, ≥ 14px bold) | 3:1 | 4.5:1 |
| UI components & graphics | 3:1 | No AAA requirement |

### 3.2 Neoloop Color Contrast Ratios

**Text on White Background:**

| Color Token | Hex | Contrast Ratio | WCAG Rating |
|-------------|-----|----------------|-------------|
| `gray-950` | #000000 | 21:1 | AAA (small & large) |
| `gray-900` | #1A1A1A | 17.5:1 | AAA (small & large) |
| `gray-800` | #333333 | 12.6:1 | AAA (small & large) |
| `gray-700` | #4D4D4D | 9.3:1 | AAA (large), AA (small) |
| `gray-600` | #666666 | 7.0:1 | AA (small & large) |
| `gray-500` | #808080 | 4.6:1 | AA (small text) |
| `gray-400` | #999999 | 2.8:1 | ❌ Fails AA (use for decorative only) |

**Semantic Colors on White:**

| Color Token | Contrast Ratio | Use Case | WCAG |
|-------------|----------------|----------|------|
| `success-700` | 5.8:1 | Success text | AA ✅ |
| `success-600` | 4.3:1 | Large success text | AA (large) |
| `warning-700` | 5.2:1 | Warning text | AA ✅ |
| `warning-600` | 4.0:1 | Large warning text | AA (large) |
| `error-700` | 7.3:1 | Error text | AAA ✅ |
| `error-600` | 5.9:1 | Error text/icons | AA ✅ |
| `info-700` | 8.2:1 | Info text | AAA ✅ |
| `info-600` | 6.5:1 | Info icons | AA ✅ |

### 3.3 Contrast Testing Tools

**Recommended Tools:**
1. **WebAIM Contrast Checker** (webaim.org/resources/contrastchecker/)
   - Simple, reliable
   - Shows pass/fail for AA and AAA

2. **Chrome DevTools** (built-in)
   - Inspect element → Contrast ratio shown
   - Suggests passing colors

3. **Contrast Ratio** (contrast-ratio.com)
   - Lea Verou's tool
   - Interactive, visual

4. **Axe DevTools** (browser extension)
   - Automated contrast checking
   - Tests entire page

### 3.4 Non-Color Indicators

**Don't Rely on Color Alone:**
- Links: Underline + color
- Errors: Icon + color + text
- Success: Checkmark + color
- Status: Text label + color

**Examples:**

❌ Bad: Red text for error (color only)
```html
<span style="color: red;">Error</span>
```

✅ Good: Icon + color + text
```html
<span class="error-text">
  <svg aria-hidden="true"><!-- error icon --></svg>
  Error: Email is required
</span>
```

❌ Bad: Green button for submit (color only)
```html
<button style="background: green;">Submit</button>
```

✅ Good: Labeled button with color
```html
<button class="btn btn-primary">
  Submit Form
</button>
```

---

## 4. Typography Accessibility

### 4.1 Font Size Requirements

**Minimum Font Sizes:**
- Body text: 16px (1rem) minimum
- Small text: 14px (0.875rem) minimum
- Captions: 12px (0.75rem) absolute minimum (use sparingly)

**Neoloop Font Scale:**
- `text-xs` (12px): Captions only, high contrast required
- `text-sm` (14px): Secondary text, labels
- `text-base` (16px): Body text (default)
- `text-lg` (18px): Lead paragraphs
- `text-xl+`: Headings

### 4.2 Line Height (Leading)

**WCAG 1.4.12 Requirements:**
- Line height: At least 1.5x font size
- Paragraph spacing: At least 2x font size

**Neoloop Implementation:**
- `line-height-tight` (1.25): Headings only
- `line-height-normal` (1.5): Body text (meets requirement)
- `line-height-relaxed` (1.75): Long-form content

```css
body {
  font-size: 16px;
  line-height: 1.5; /* 24px - meets WCAG */
}

p + p {
  margin-top: 32px; /* 2x font size - meets WCAG */
}
```

### 4.3 Letter Spacing (Tracking)

**WCAG 1.4.12 Requirements:**
- Letter spacing: At least 0.12x font size
- Word spacing: At least 0.16x font size

**Neoloop Implementation:**
- `tracking-tight` (-0.025em): Large headings (exception allowed)
- `tracking-normal` (0): Default (meets requirement)
- `tracking-wide` (0.025em): Uppercase labels

### 4.4 Text Readability

**Font Family:**
- Primary: Inter (highly legible sans-serif)
- Avoid decorative fonts for body text
- Use serif fonts sparingly (editorials only)

**Font Weight:**
- Regular (400): Body text
- Medium (500): Emphasis
- Semibold (600): Subheadings
- Bold (700): Headings
- Avoid light weights (200-300) for small text

**Text Transform:**
- Avoid all-caps for long text (harder to read)
- Use sparingly for labels, buttons (with increased letter-spacing)

```css
.button-text {
  text-transform: uppercase;
  letter-spacing: 0.05em; /* Improves readability */
}
```

### 4.5 Responsive Text

**Text Scaling:**
- Support browser text zoom (up to 200%)
- Use relative units (`rem`, `em`) not `px`
- Test at 200% zoom: text doesn't overflow

```css
/* ✅ Good: Relative units */
.heading {
  font-size: 2rem; /* Scales with browser settings */
}

/* ❌ Bad: Fixed pixels */
.heading {
  font-size: 32px; /* Doesn't scale */
}
```

---

## 5. Keyboard Navigation

### 5.1 Keyboard Navigation Requirements

**All Functionality Available:**
- Every interactive element accessible via keyboard
- No mouse-only interactions
- Logical tab order (left-to-right, top-to-bottom)

**Standard Keys:**

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element |
| `Shift+Tab` | Move to previous element |
| `Enter` | Activate button or link |
| `Space` | Activate button, check checkbox, scroll page |
| `Arrow Keys` | Navigate within component (select, radio, tabs) |
| `Escape` | Close modal, dropdown, cancel action |
| `Home` | Jump to first item |
| `End` | Jump to last item |

### 5.2 Focus Order

**Logical Order:**
1. Skip links (hidden until focused)
2. Header navigation
3. Main content (forms, buttons)
4. Sidebar (if present)
5. Footer

**Tab Index Rules:**
- `tabindex="0"`: Included in natural tab order
- `tabindex="-1"`: Focusable programmatically, not in tab order
- `tabindex="1+"`: ❌ Avoid (disrupts natural order)

```html
<!-- ✅ Good: Natural order -->
<button>First</button>
<button>Second</button>
<button tabindex="-1">Skip in tab order, focus programmatically</button>

<!-- ❌ Bad: Forced order -->
<button tabindex="2">First??</button>
<button tabindex="1">Actually first</button>
```

### 5.3 Focus Trapping

**When to Trap Focus:**
- Modal dialogs (focus must stay inside)
- Mega menus (optional)
- Drawers/sidebars (if overlay blocks content)

**When NOT to Trap:**
- Regular page content
- Tooltips (should close on tab out)
- Dropdowns (can tab past)

**Implementation:**
```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}
```

### 5.4 Skip Links

**Purpose:**
- Allow keyboard users to skip navigation
- Jump directly to main content

**Implementation:**
```html
<a href="#main" class="skip-link">Skip to main content</a>

<nav><!-- navigation --></nav>

<main id="main">
  <!-- main content -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-950);
  color: var(--white);
  padding: 8px 16px;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

---

## 6. Screen Reader Support

### 6.1 Screen Reader Testing

**Popular Screen Readers:**
- **JAWS** (Windows, most popular)
- **NVDA** (Windows, free, open-source)
- **VoiceOver** (macOS, iOS, built-in)
- **TalkBack** (Android, built-in)
- **Narrator** (Windows, built-in)

**Testing Browsers:**
- JAWS/NVDA: Chrome, Firefox
- VoiceOver: Safari (best compatibility)

### 6.2 Screen Reader Only Text

**When to Use:**
- Additional context for screen reader users
- Icon-only buttons
- Complex interactions

**Implementation:**
```html
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  <span class="sr-only">Delete item</span>
</button>
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 6.3 Image Alt Text

**Rules:**
- Decorative images: `alt=""` (empty, not omitted)
- Informative images: Descriptive alt text
- Functional images (buttons): Describe action

**Examples:**

```html
<!-- Decorative -->
<img src="border-decoration.svg" alt="" />

<!-- Informative -->
<img src="product-photo.jpg" alt="Red cotton t-shirt with crew neck" />

<!-- Functional -->
<button>
  <img src="trash-icon.svg" alt="Delete item" />
</button>

<!-- Complex (chart, diagram) -->
<img src="sales-chart.png" alt="Sales increased 45% in Q4" />
<details>
  <summary>View detailed sales data</summary>
  <!-- Detailed table of data -->
</details>
```

### 6.4 Live Regions (ARIA Live)

**Announcing Dynamic Changes:**
- `aria-live="polite"`: Wait for pause in screen reader
- `aria-live="assertive"`: Interrupt immediately
- `aria-live="off"`: Don't announce (default)

**Common Use Cases:**

```html
<!-- Loading state -->
<div role="status" aria-live="polite" aria-atomic="true">
  Loading content...
</div>

<!-- Form validation -->
<div role="alert" aria-live="assertive">
  Error: Email is required
</div>

<!-- Success message -->
<div role="status" aria-live="polite">
  Changes saved successfully
</div>

<!-- Item count -->
<div aria-live="polite" aria-atomic="true">
  <span class="sr-only">Shopping cart:</span>
  3 items
</div>
```

**aria-atomic:**
- `true`: Read entire region
- `false`: Read only changed parts

---

## 7. Focus Management

### 7.1 Visible Focus Indicators

**WCAG 2.4.7 (AA): Focus must be visible**

**Neoloop Focus Ring:**
- Width: 2px solid outline
- Color: `info-500` (blue, 3:1 contrast minimum)
- Offset: 2px (gap between element and outline)

```css
*:focus-visible {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
}

/* Remove default browser outline */
*:focus {
  outline: none;
}
```

**Why `:focus-visible`?**
- Shows focus ring only when keyboard navigating
- No focus ring when clicking with mouse
- Better UX for both mouse and keyboard users

### 7.2 Focus Styles Per Component

**Buttons:**
```css
.btn:focus-visible {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
}
```

**Inputs:**
```css
.input:focus-visible {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
  border: 2px solid var(--info-500);
}
```

**Cards (clickable):**
```css
.card-interactive:focus-visible {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
}
```

**Links:**
```css
a:focus-visible {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
  text-decoration: underline;
}
```

### 7.3 Focus Management in SPAs

**Route Changes:**
- Move focus to main heading after navigation
- Announce page change to screen readers

```javascript
// After route change
const mainHeading = document.querySelector('h1');
mainHeading.setAttribute('tabindex', '-1');
mainHeading.focus();

// Announce to screen readers
const liveRegion = document.getElementById('route-announcer');
liveRegion.textContent = `Navigated to ${pageTitle}`;
```

**Modal Opening:**
- Move focus to modal (first focusable element or heading)
- Return focus to trigger element on close

```javascript
// Open modal
const modal = document.getElementById('modal');
const trigger = document.activeElement; // Save trigger
modal.querySelector('button').focus(); // Focus first button

// Close modal
modal.addEventListener('close', () => {
  trigger.focus(); // Return focus
});
```

---

## 8. Touch Targets

### 8.1 Touch Target Sizes

**WCAG 2.5.5 (AAA):**
- Minimum: 44x44px
- Recommended: 48x48px
- Comfortable: 56x56px

**Neoloop Implementation:**
- Small buttons: 32px (exception, use sparingly)
- Medium buttons: 40px (default, with adequate spacing)
- Large buttons: 48px (recommended for primary actions)

### 8.2 Spacing Between Targets

**WCAG 2.5.8 (AA, Level 2.2):**
- Minimum: 8px spacing between targets
- Recommended: 12px spacing

```css
.button-group {
  display: flex;
  gap: 12px; /* Adequate spacing */
}
```

### 8.3 Extending Touch Areas

**Visual Size vs Touch Size:**
- Visual: 20px icon button
- Touch area: 48x48px (extended with padding/margin)

```css
.icon-button {
  width: 20px;
  height: 20px;
  padding: 14px; /* Total: 48x48px */
}

/* Or use pseudo-element */
.icon-button::after {
  content: '';
  position: absolute;
  inset: -14px; /* Extends touch area */
}
```

### 8.4 Touch Target Testing

**Manual Testing:**
1. Use finger (not stylus) on real device
2. Try to tap each target
3. Note accidental taps (targets too close)
4. Test with large fingers (not just your own)

**Automated Testing:**
- Axe DevTools checks touch target sizes
- Lighthouse accessibility audit

---

## 9. Forms Accessibility

### 9.1 Form Labels

**Every Input Must Have a Label:**
- Visible label (preferred)
- Or `aria-label` / `aria-labelledby`

```html
<!-- ✅ Good: Visible label -->
<label for="email">Email Address</label>
<input id="email" type="email" />

<!-- ✅ Good: Wrapping label -->
<label>
  Email Address
  <input type="email" />
</label>

<!-- ⚠️ Acceptable: aria-label (if visual label not possible) -->
<input type="email" aria-label="Email Address" />

<!-- ❌ Bad: Placeholder only -->
<input type="email" placeholder="Email Address" />
```

### 9.2 Required Fields

**Indicate Required Fields:**
- Visual indicator: Asterisk (*) or "(required)"
- Programmatic: `required` attribute or `aria-required="true"`

```html
<label for="email">
  Email Address <span aria-hidden="true">*</span>
</label>
<input id="email" type="email" required />
<span class="help-text">
  <span class="sr-only">Required field.</span> We'll never share your email.
</span>
```

### 9.3 Error Identification

**WCAG 3.3.1 (A): Errors must be identified**

**Requirements:**
- Error identified in text (not color alone)
- Location indicated
- Suggestion for fix provided

```html
<label for="password">Password</label>
<input
  id="password"
  type="password"
  aria-invalid="true"
  aria-describedby="password-error"
/>
<span id="password-error" role="alert" class="error-text">
  <svg aria-hidden="true"><!-- error icon --></svg>
  Error: Password must be at least 8 characters
</span>
```

### 9.4 Input Autocomplete

**WCAG 1.3.5 (AA): Identify input purpose**

**Use autocomplete attribute:**
```html
<label for="email">Email</label>
<input id="email" type="email" autocomplete="email" />

<label for="tel">Phone</label>
<input id="tel" type="tel" autocomplete="tel" />

<label for="name">Full Name</label>
<input id="name" type="text" autocomplete="name" />

<label for="address">Street Address</label>
<input id="address" type="text" autocomplete="street-address" />
```

**Benefits:**
- Browsers can autofill
- Password managers can detect fields
- Screen readers can identify purpose

### 9.5 Fieldset & Legend

**Group Related Inputs:**
```html
<fieldset>
  <legend>Shipping Address</legend>

  <label for="street">Street</label>
  <input id="street" type="text" autocomplete="street-address" />

  <label for="city">City</label>
  <input id="city" type="text" autocomplete="address-level2" />

  <label for="zip">ZIP Code</label>
  <input id="zip" type="text" autocomplete="postal-code" />
</fieldset>
```

**For Radio/Checkbox Groups:**
```html
<fieldset>
  <legend>Select your plan:</legend>

  <label>
    <input type="radio" name="plan" value="free" />
    Free Plan
  </label>

  <label>
    <input type="radio" name="plan" value="pro" />
    Pro Plan
  </label>
</fieldset>
```

---

## 10. Motion & Animation

### 10.1 Prefers Reduced Motion

**WCAG 2.3.3 (AAA): Respect user preferences**

**Implementation:**
```css
/* Default: animations enabled */
.modal {
  animation: slideIn 300ms ease-out;
}

/* User prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none;
  }

  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 10.2 Seizure Prevention

**WCAG 2.3.1 (A): No flashing content**

**Rules:**
- No flashing more than 3 times per second
- Avoid large flashing areas (over 25% viewport)
- Avoid high-contrast flashing (red to black)

**Safe Alternatives:**
- Fade in/out instead of flash
- Pulsing opacity (0.8 to 1.0) instead of 0 to 1
- Slow transitions (500ms+) instead of rapid

### 10.3 Parallax & Scroll Effects

**Considerations:**
- Parallax can cause motion sickness
- Disable for users with `prefers-reduced-motion`

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  enableParallax();
}
```

---

## 11. Semantic HTML

### 11.1 Landmarks

**ARIA Landmark Roles (HTML5 equivalents):**

| HTML5 Element | ARIA Role | Purpose |
|---------------|-----------|---------|
| `<header>` | `banner` | Site header |
| `<nav>` | `navigation` | Navigation menu |
| `<main>` | `main` | Main content (only one per page) |
| `<aside>` | `complementary` | Sidebar, related content |
| `<footer>` | `contentinfo` | Site footer |
| `<section>` | `region` | Thematic grouping (with label) |
| `<article>` | `article` | Independent content |
| `<form>` | `form` | Form (with label) |
| `<search>` | `search` | Search functionality |

**Example Structure:**
```html
<header>
  <nav aria-label="Main navigation">
    <!-- nav links -->
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <!-- content -->
  </article>

  <aside aria-label="Related articles">
    <!-- sidebar -->
  </aside>
</main>

<footer>
  <!-- footer content -->
</footer>
```

### 11.2 Heading Hierarchy

**WCAG 1.3.1 (A): Proper heading structure**

**Rules:**
- One `<h1>` per page (page title)
- Don't skip levels (h1 → h2 → h3, not h1 → h3)
- Headings describe content structure, not just styling

```html
<!-- ✅ Good: Logical hierarchy -->
<h1>Page Title</h1>
  <h2>Section 1</h2>
    <h3>Subsection 1.1</h3>
    <h3>Subsection 1.2</h3>
  <h2>Section 2</h2>
    <h3>Subsection 2.1</h3>

<!-- ❌ Bad: Skipped level -->
<h1>Page Title</h1>
  <h3>Section 1</h3> <!-- Skipped h2 -->
```

### 11.3 Lists

**Use Semantic Lists:**

```html
<!-- ✅ Good: Semantic list -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<!-- ❌ Bad: Divs styled as list -->
<div>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**List Types:**
- `<ul>`: Unordered list (bullets)
- `<ol>`: Ordered list (numbers)
- `<dl>`: Description list (key-value pairs)

### 11.4 Buttons vs Links

**When to Use Each:**

| Element | Purpose | Keyboard | Screen Reader |
|---------|---------|----------|---------------|
| `<button>` | Triggers action on same page | Enter, Space | "Button" |
| `<a href>` | Navigates to URL | Enter | "Link" |

```html
<!-- ✅ Good: Button for action -->
<button onclick="saveData()">Save</button>

<!-- ✅ Good: Link for navigation -->
<a href="/profile">View Profile</a>

<!-- ❌ Bad: Link for action -->
<a href="#" onclick="saveData()">Save</a>

<!-- ❌ Bad: Button for navigation -->
<button onclick="location.href='/profile'">View Profile</button>
```

---

## 12. ARIA Patterns

### 12.1 When to Use ARIA

**The First Rule of ARIA:**
> "If you can use a native HTML element or attribute, then do so."

**Use ARIA When:**
- Native HTML doesn't provide needed semantics
- Complex widgets (tabs, accordions, menus)
- Dynamic content announcements

**Don't Use ARIA When:**
- Native HTML works (button, not `<div role="button">`)
- It's redundant (`<nav role="navigation">`)

### 12.2 Common ARIA Patterns

#### Button
```html
<!-- ✅ Native button (preferred) -->
<button>Click Me</button>

<!-- ⚠️ Custom button (if necessary) -->
<div role="button" tabindex="0" onclick="..." onkeydown="...">
  Click Me
</div>
```

#### Checkbox
```html
<!-- ✅ Native checkbox (preferred) -->
<input type="checkbox" id="agree" />
<label for="agree">I agree</label>

<!-- ⚠️ Custom checkbox -->
<div
  role="checkbox"
  aria-checked="false"
  tabindex="0"
  onclick="..."
  onkeydown="..."
>
  I agree
</div>
```

#### Tabs
```html
<div role="tablist" aria-label="Product information">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
    Description
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
    Reviews
  </button>
</div>

<div role="tabpanel" id="panel1" aria-labelledby="tab1">
  <!-- Description content -->
</div>

<div role="tabpanel" id="panel2" aria-labelledby="tab2" hidden>
  <!-- Reviews content -->
</div>
```

#### Modal Dialog
```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-desc">Are you sure you want to proceed?</p>

  <button>Confirm</button>
  <button>Cancel</button>
</div>
```

#### Dropdown Menu
```html
<button
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="menu"
  id="menu-trigger"
>
  Options
</button>

<ul role="menu" id="menu" aria-labelledby="menu-trigger">
  <li role="menuitem">Edit</li>
  <li role="menuitem">Delete</li>
  <li role="menuitem">Share</li>
</ul>
```

### 12.3 ARIA States & Properties

**Common ARIA Attributes:**

| Attribute | Purpose | Values |
|-----------|---------|--------|
| `aria-label` | Accessible name | String |
| `aria-labelledby` | Reference to label element(s) | ID(s) |
| `aria-describedby` | Additional description | ID(s) |
| `aria-hidden` | Hide from screen readers | true/false |
| `aria-live` | Announce changes | off/polite/assertive |
| `aria-expanded` | Expandable element state | true/false |
| `aria-selected` | Selection state | true/false |
| `aria-checked` | Checkbox/radio state | true/false/mixed |
| `aria-disabled` | Disabled state | true/false |
| `aria-invalid` | Validation state | true/false |
| `aria-required` | Required field | true/false |
| `aria-current` | Current item | page/step/location/true/false |

---

## 13. Testing Guidelines

### 13.1 Manual Testing Checklist

**Keyboard Navigation:**
- [ ] All interactive elements reachable with Tab
- [ ] Logical tab order (left-to-right, top-to-bottom)
- [ ] Visible focus indicators on all elements
- [ ] No keyboard traps (can tab out of all elements)
- [ ] Modal focus trapped when open
- [ ] Enter/Space activate buttons
- [ ] Arrow keys work in appropriate components

**Screen Reader Testing:**
- [ ] All images have appropriate alt text
- [ ] Form labels associated with inputs
- [ ] Headings in logical order
- [ ] Landmarks properly labeled
- [ ] Error messages announced
- [ ] Loading states announced
- [ ] Dynamic content changes announced

**Visual Testing:**
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Text readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators visible
- [ ] Touch targets at least 44x44px

**Motion Testing:**
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No flashing content (seizure risk)
- [ ] Parallax effects can be disabled

### 13.2 Automated Testing Tools

**Browser Extensions:**
1. **Axe DevTools** (Chrome, Firefox)
   - Comprehensive accessibility checks
   - Intelligent problem detection
   - Free tier available

2. **WAVE** (Chrome, Firefox)
   - Visual feedback on page
   - Shows semantic structure
   - Free

3. **Lighthouse** (Chrome DevTools, built-in)
   - Accessibility audit in performance report
   - Scores out of 100
   - Free

**Command Line Tools:**
1. **Pa11y**
   ```bash
   npm install -g pa11y
   pa11y https://example.com
   ```

2. **Axe-core CLI**
   ```bash
   npm install -g @axe-core/cli
   axe https://example.com
   ```

**CI/CD Integration:**
```yaml
# GitHub Actions example
- name: Accessibility Test
  run: |
    npm install -g @axe-core/cli
    axe https://staging.example.com --exit
```

### 13.3 Screen Reader Testing

**VoiceOver (macOS):**
1. Enable: System Preferences → Accessibility → VoiceOver
2. Toggle: `Cmd+F5`
3. Navigate: `Ctrl+Option+Arrow Keys`
4. Interact: `Ctrl+Option+Space`

**NVDA (Windows, Free):**
1. Download: nvaccess.org
2. Toggle: `Ctrl+Alt+N`
3. Navigate: `Arrow Keys`
4. Activate: `Enter` or `Space`

**Testing Checklist:**
- [ ] Navigate entire page with screen reader
- [ ] All content announced in logical order
- [ ] Form fields have labels
- [ ] Errors announced clearly
- [ ] Buttons and links identifiable
- [ ] Images described (or marked decorative)

### 13.4 Real User Testing

**Include People with Disabilities:**
- Blind or low vision users
- Deaf or hard of hearing users
- Motor disability users (keyboard-only)
- Cognitive disability users

**Testing Scenarios:**
- Complete a form
- Navigate to specific content
- Complete a transaction
- Use search functionality
- Understand error messages

---

## Accessibility Checklist Summary

### Design Phase
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Touch targets at least 44x44px
- [ ] Text size minimum 16px for body
- [ ] Information not conveyed by color alone
- [ ] Animations respect `prefers-reduced-motion`

### Development Phase
- [ ] Semantic HTML used throughout
- [ ] All images have alt text
- [ ] Form labels associated with inputs
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA attributes when needed
- [ ] Headings in logical order
- [ ] Landmarks for page structure

### Testing Phase
- [ ] Automated testing (Axe, Lighthouse)
- [ ] Manual keyboard testing
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Color contrast validation
- [ ] Text zoom to 200%
- [ ] Real user testing (if possible)

---

## Resources

**Official Guidelines:**
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/

**Testing Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/extension/

**Learning Resources:**
- A11ycasts (YouTube): https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g
- WebAIM Articles: https://webaim.org/articles/
- The A11Y Project: https://www.a11yproject.com/

---

## Changelog

**v1.0.0 (2026-01-30)**
- Complete accessibility guidelines
- WCAG 2.1 Level AA compliance target
- Color contrast specifications
- Typography accessibility rules
- Keyboard navigation patterns
- Screen reader support guidelines
- Focus management specifications
- Touch target requirements
- Forms accessibility patterns
- Motion and animation guidelines
- Semantic HTML requirements
- ARIA usage patterns
- Comprehensive testing guidelines
