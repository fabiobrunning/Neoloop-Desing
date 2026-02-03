# Component Specifications - Phase 1

**Version:** 1.0.0
**Status:** Final
**Last Updated:** 2026-01-30

---

## Table of Contents

1. [Button Component](#1-button-component)
2. [Input Component](#2-input-component)
3. [Select Component](#3-select-component)
4. [Card Component](#4-card-component)
5. [Checkbox Component](#5-checkbox-component)

---

## 1. Button Component

### 1.1 Anatomy & Structure

```
┌─────────────────────────────────────────┐
│  [Icon] Label Text [Icon]               │  ← Button container
└─────────────────────────────────────────┘
    ↑           ↑           ↑
  Leading    Content    Trailing
   Icon       Text        Icon
```

**Elements:**
- Container: Button wrapper with padding
- Leading Icon: Optional icon before text
- Label: Button text content
- Trailing Icon: Optional icon after text

### 1.2 Variants

#### Primary (Default)
- **Purpose:** Main call-to-action
- **Visual:** Filled background, high contrast
- **Usage:** Submit forms, primary actions

```css
.btn-primary {
  background-color: var(--primary-950);
  color: var(--white);
  border: 1px solid var(--primary-950);
}
.btn-primary:hover {
  background-color: var(--primary-900);
  border-color: var(--primary-900);
}
.btn-primary:active {
  background-color: var(--primary-800);
}
```

#### Secondary (Outline)
- **Purpose:** Secondary actions
- **Visual:** Outline only, transparent background
- **Usage:** Cancel, secondary CTAs

```css
.btn-secondary {
  background-color: transparent;
  color: var(--gray-950);
  border: 1px solid var(--gray-300);
}
.btn-secondary:hover {
  background-color: var(--gray-50);
  border-color: var(--gray-400);
}
```

#### Ghost
- **Purpose:** Tertiary actions
- **Visual:** No border, transparent background
- **Usage:** Less prominent actions, navigation

```css
.btn-ghost {
  background-color: transparent;
  color: var(--gray-700);
  border: 1px solid transparent;
}
.btn-ghost:hover {
  background-color: var(--gray-100);
}
```

#### Danger
- **Purpose:** Destructive actions
- **Visual:** Red background (error colors)
- **Usage:** Delete, remove, cancel subscriptions

```css
.btn-danger {
  background-color: var(--error-600);
  color: var(--white);
  border: 1px solid var(--error-600);
}
.btn-danger:hover {
  background-color: var(--error-700);
}
```

### 1.3 Sizes

#### Small (sm)
- **Height:** 32px (2rem)
- **Horizontal Padding:** 12px (0.75rem)
- **Vertical Padding:** 6px (0.375rem)
- **Font Size:** 14px (0.875rem / text-sm)
- **Icon Size:** 16px
- **Gap:** 8px (spacing-2)

```css
.btn-sm {
  height: 32px;
  padding: 6px 12px;
  font-size: var(--text-sm);
  gap: var(--spacing-2);
}
```

#### Medium (md) - Default
- **Height:** 40px (2.5rem)
- **Horizontal Padding:** 16px (1rem)
- **Vertical Padding:** 10px (0.625rem)
- **Font Size:** 14px (0.875rem / text-sm)
- **Icon Size:** 20px
- **Gap:** 8px (spacing-2)

```css
.btn-md {
  height: 40px;
  padding: 10px 16px;
  font-size: var(--text-sm);
  gap: var(--spacing-2);
}
```

#### Large (lg)
- **Height:** 48px (3rem)
- **Horizontal Padding:** 24px (1.5rem)
- **Vertical Padding:** 12px (0.75rem)
- **Font Size:** 16px (1rem / text-base)
- **Icon Size:** 24px
- **Gap:** 12px (spacing-3)

```css
.btn-lg {
  height: 48px;
  padding: 12px 24px;
  font-size: var(--text-base);
  gap: var(--spacing-3);
}
```

### 1.4 States

#### Default (Rest)
- Normal appearance with `shadow-sm`
- Cursor: pointer

#### Hover
- Background color darkens
- Shadow elevates to `shadow-base`
- Transition: 150ms ease-out
- Cursor: pointer

#### Focus (Keyboard)
- Visible focus ring: 3px offset, 2px width
- Ring color: `info-500` with 50% opacity
- Maintains hover styles if focused + hovered

```css
.btn:focus-visible {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
}
```

#### Active (Pressed)
- Background color darkest
- Shadow reduces to `shadow-none`
- Slight scale: `transform: scale(0.98)`

#### Disabled
- Opacity: 0.5
- Cursor: not-allowed
- Background: `gray-300`
- Color: `gray-500`
- No hover/active states

```css
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

#### Loading
- Spinner icon replaces leading icon or content
- Text changes to "Loading..." or remains
- Disabled state active
- Cursor: wait

### 1.5 Icon Positioning

#### Leading Icon Only
```
┌──────────────────┐
│ [🔍] Search      │
└──────────────────┘
```

#### Trailing Icon Only
```
┌──────────────────┐
│ Next [→]         │
└──────────────────┘
```

#### Both Icons
```
┌──────────────────┐
│ [🔍] Search [↓]  │
└──────────────────┘
```

#### Icon Only
- Square button: width = height
- Icon centered
- Padding: equal on all sides

```
┌────┐
│ 🗑️  │
└────┘
```

**Icon-only sizes:**
- Small: 32x32px
- Medium: 40x40px
- Large: 48x48px

### 1.6 Accessibility Specifications

**Touch Targets:**
- Minimum: 44x44px (WCAG AAA)
- Recommended: 48x48px
- Small buttons (32px): ensure adequate spacing

**Keyboard Navigation:**
- Tab: Focus next button
- Shift+Tab: Focus previous button
- Enter/Space: Activate button
- Escape: Cancel if in modal

**Screen Readers:**
- `aria-label` for icon-only buttons
- `aria-disabled="true"` for disabled state
- `aria-busy="true"` for loading state

```html
<!-- Icon-only button -->
<button aria-label="Delete item">
  <IconTrash />
</button>

<!-- Loading button -->
<button aria-busy="true" disabled>
  <Spinner /> Saving...
</button>
```

**Color Contrast:**
- Primary: 21:1 (AAA) - black on white
- Danger: 5.9:1 (AA) - red-600 on white
- Focus ring: 3:1 minimum against background

### 1.7 Pixel-Perfect Measurements

**Primary Medium Button (Most Common):**
```
Total Height: 40px
├── Border Top: 1px
├── Padding Top: 10px
├── Content Height: 17px (line-height of 14px text)
├── Padding Bottom: 10px
└── Border Bottom: 1px

Total Width: Auto (content + padding)
├── Border Left: 1px
├── Padding Left: 16px
├── Icon Width: 20px (if present)
├── Gap: 8px (if icon present)
├── Text Width: Variable
├── Gap: 8px (if trailing icon)
├── Trailing Icon: 20px (if present)
├── Padding Right: 16px
└── Border Right: 1px
```

**Example Calculations:**
- Icon + Text: `1 + 16 + 20 + 8 + [text] + 16 + 1 = 62px + text width`
- Text only: `1 + 16 + [text] + 16 + 1 = 34px + text width`
- Icon only (square): `40x40px` (no padding, icon centered)

---

## 2. Input Component

### 2.1 Anatomy & Structure

```
┌─────────────────────────────────────────┐
│ Label *                                 │  ← Label (optional)
│ ┌─────────────────────────────────────┐ │
│ │ [🔍] Placeholder text          [×]  │ │  ← Input field
│ └─────────────────────────────────────┘ │
│ Helper text or error message            │  ← Helper text
└─────────────────────────────────────────┘
```

**Elements:**
- Label: Field description (optional)
- Leading Addon: Icon or text prefix
- Input Field: Text input area
- Trailing Addon: Icon or action (clear button)
- Helper Text: Description or error message

### 2.2 Input Types

- `text`: General text input
- `email`: Email validation
- `password`: Masked text with show/hide toggle
- `number`: Numeric input with steppers
- `tel`: Telephone number
- `url`: URL validation
- `search`: Search input with clear button
- `date`: Date picker trigger
- `textarea`: Multi-line text

### 2.3 Sizes

#### Small (sm)
- **Height:** 32px (2rem)
- **Horizontal Padding:** 12px (0.75rem)
- **Vertical Padding:** 6px (0.375rem)
- **Font Size:** 14px (text-sm)
- **Label Font Size:** 14px (text-sm)

```css
.input-sm {
  height: 32px;
  padding: 6px 12px;
  font-size: var(--text-sm);
}
```

#### Medium (md) - Default
- **Height:** 40px (2.5rem)
- **Horizontal Padding:** 16px (1rem)
- **Vertical Padding:** 10px (0.625rem)
- **Font Size:** 16px (text-base)
- **Label Font Size:** 14px (text-sm)

```css
.input-md {
  height: 40px;
  padding: 10px 16px;
  font-size: var(--text-base);
}
```

#### Large (lg)
- **Height:** 48px (3rem)
- **Horizontal Padding:** 20px (1.25rem)
- **Vertical Padding:** 12px (0.75rem)
- **Font Size:** 16px (text-base)
- **Label Font Size:** 16px (text-base)

```css
.input-lg {
  height: 48px;
  padding: 12px 20px;
  font-size: var(--text-base);
}
```

### 2.4 States

#### Default (Empty)
- Border: 1px solid `gray-300`
- Background: `white`
- Placeholder: `gray-500`

```css
.input {
  border: 1px solid var(--gray-300);
  background-color: var(--white);
  color: var(--gray-950);
}
.input::placeholder {
  color: var(--gray-500);
}
```

#### Hover
- Border: `gray-400`
- Transition: 150ms ease-out

```css
.input:hover {
  border-color: var(--gray-400);
}
```

#### Focus
- Border: 2px solid `info-500`
- Focus ring: 3px offset, `info-500` with opacity
- Padding adjusted to compensate for 2px border

```css
.input:focus {
  outline: none;
  border: 2px solid var(--info-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  /* Reduce padding by 1px to compensate */
  padding: 9px 15px;
}
```

#### Filled (Has Value)
- Same as default, but with user-entered text
- Text color: `gray-950`

#### Disabled
- Background: `gray-100`
- Border: `gray-200`
- Text color: `gray-500`
- Cursor: not-allowed

```css
.input:disabled {
  background-color: var(--gray-100);
  border-color: var(--gray-200);
  color: var(--gray-500);
  cursor: not-allowed;
}
```

#### Error (Invalid)
- Border: 2px solid `error-600`
- Focus ring: `error-500`
- Helper text: red color

```css
.input.error {
  border: 2px solid var(--error-600);
}
.input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

#### Success (Valid)
- Border: 1px solid `success-600`
- Optional checkmark icon trailing

```css
.input.success {
  border-color: var(--success-600);
}
```

### 2.5 Input Addons

#### Leading Icon
- Icon positioned 12px from left edge (medium size)
- Input text starts after icon with 8px gap
- Total left padding: `12px (edge) + 20px (icon) + 8px (gap) = 40px`

```
┌─────────────────────────────┐
│ [🔍]  Search...             │
│  ↑    ↑
│ 12px  8px gap
└─────────────────────────────┘
```

#### Trailing Icon/Action
- Icon positioned 12px from right edge
- Clickable for actions (clear, password toggle)
- Input text ends 8px before icon

```
┌─────────────────────────────┐
│ Password text...      [👁️]  │
│                   ↑    ↑
│                  8px  12px
└─────────────────────────────┘
```

#### Prefix/Suffix Text
- Used for units, currency, domain suffixes
- Gray background: `gray-100`
- Border on inner side

```
┌───┬─────────────────────────┐
│ $ │ 100.00                  │  ← Prefix
└───┴─────────────────────────┘

┌─────────────────────────┬──────┐
│ username                │ .com │  ← Suffix
└─────────────────────────┴──────┘
```

### 2.6 Helper & Error Text

**Helper Text:**
- Font size: `text-sm` (14px)
- Color: `gray-600`
- Margin top: 4px (spacing-1)

```css
.input-helper {
  font-size: var(--text-sm);
  color: var(--gray-600);
  margin-top: var(--spacing-1);
}
```

**Error Text:**
- Font size: `text-sm` (14px)
- Color: `error-600`
- Icon: Error icon with 4px spacing

```css
.input-error-text {
  font-size: var(--text-sm);
  color: var(--error-600);
  margin-top: var(--spacing-1);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}
```

### 2.7 Label Specifications

**Label Text:**
- Font size: `text-sm` (14px)
- Font weight: `font-weight-medium` (500)
- Color: `gray-950`
- Margin bottom: 4px (spacing-1)

**Required Indicator (Asterisk):**
- Color: `error-600`
- Positioned after label text with 2px spacing

```html
<label class="input-label">
  Email Address <span class="required">*</span>
</label>
```

### 2.8 Accessibility Specifications

**Keyboard Navigation:**
- Tab: Focus input
- Shift+Tab: Focus previous
- Arrow keys: Move cursor within text
- Escape: Clear focus (some browsers)

**Screen Readers:**
- `<label>` element wraps or uses `for` attribute
- `aria-required="true"` for required fields
- `aria-invalid="true"` for error state
- `aria-describedby` links to helper/error text

```html
<label for="email">Email Address *</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="email-helper"
/>
<span id="email-helper">We'll never share your email.</span>
```

**Touch Targets:**
- Minimum height: 44px
- Label clickable area extends to input

**Color Contrast:**
- Label text: 21:1 (AAA) - black on white
- Placeholder: 4.6:1 (AA) - gray-500 on white
- Error text: 5.9:1 (AA)

### 2.9 Special Input Types

#### Password Input
- Type: `password`
- Trailing icon: Eye icon (show/hide toggle)
- Toggle switches type between `password` and `text`

```
┌─────────────────────────────┐
│ ••••••••              [👁️]  │  ← Click to reveal
└─────────────────────────────┘
```

#### Search Input
- Type: `search`
- Leading icon: Magnifying glass
- Trailing icon: Clear button (X) when has value
- Border radius: slightly larger for modern look

```
┌─────────────────────────────┐
│ [🔍] Search...         [×]  │
└─────────────────────────────┘
```

#### Textarea
- Min height: 80px (5 rows)
- Resizable: vertical only
- Padding: 12px all sides

```css
.textarea {
  min-height: 80px;
  padding: 12px;
  resize: vertical;
}
```

### 2.10 Pixel-Perfect Measurements

**Medium Input (Default):**
```
Total Height: 40px
├── Border Top: 1px
├── Padding Top: 10px
├── Content Height: 18px (line-height of 16px text)
├── Padding Bottom: 10px
└── Border Bottom: 1px

Total Width: 100% (flexible) or fixed
├── Border Left: 1px
├── Padding Left: 16px (or 40px with leading icon)
├── Text Content: Variable
├── Padding Right: 16px (or 40px with trailing icon)
└── Border Right: 1px
```

**With Leading Icon:**
```
├── Border Left: 1px
├── Icon Left Padding: 12px
├── Icon Width: 20px
├── Gap: 8px
├── Text starts here
```

---

## 3. Select Component

### 3.1 Anatomy & Structure

**Closed State:**
```
┌─────────────────────────────┐
│ Selected option        [▼] │  ← Trigger button
└─────────────────────────────┘
```

**Open State:**
```
┌─────────────────────────────┐
│ Selected option        [▲] │  ← Trigger (active)
└─────────────────────────────┘
┌─────────────────────────────┐
│ ○ Option 1                  │  ← Dropdown menu
│ ● Option 2 (selected)       │
│ ○ Option 3                  │
│ ○ Option 4                  │
└─────────────────────────────┘
```

**Elements:**
- Trigger Button: Shows selected value
- Chevron Icon: Indicates expandable (rotates when open)
- Dropdown Menu: List of options
- Option Items: Selectable items with radio indicator

### 3.2 Sizes

Matches Input component sizes for consistency.

#### Small (sm)
- **Height:** 32px
- **Padding:** 6px 32px 6px 12px (right padding for chevron)
- **Font Size:** 14px (text-sm)
- **Option Height:** 32px
- **Chevron Size:** 16px

#### Medium (md) - Default
- **Height:** 40px
- **Padding:** 10px 40px 10px 16px
- **Font Size:** 16px (text-base)
- **Option Height:** 40px
- **Chevron Size:** 20px

#### Large (lg)
- **Height:** 48px
- **Padding:** 12px 48px 12px 20px
- **Font Size:** 16px (text-base)
- **Option Height:** 48px
- **Chevron Size:** 24px

### 3.3 Trigger (Closed) States

#### Default
- Border: 1px solid `gray-300`
- Background: `white`
- Chevron: `gray-700`
- Cursor: pointer

```css
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--gray-300);
  background-color: var(--white);
  cursor: pointer;
}
```

#### Hover
- Border: `gray-400`
- Background: `gray-50`

#### Focus (Keyboard)
- Border: 2px solid `info-500`
- Focus ring: 3px offset
- Chevron rotates 180deg if open

```css
.select-trigger:focus {
  outline: none;
  border: 2px solid var(--info-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

#### Active (Open)
- Border: 2px solid `info-500`
- Chevron rotates 180deg (points up)
- Shadow: `shadow-md` on dropdown

#### Disabled
- Background: `gray-100`
- Border: `gray-200`
- Text: `gray-500`
- Cursor: not-allowed

#### Error
- Border: 2px solid `error-600`
- Focus ring: error color

### 3.4 Dropdown Menu Specifications

**Menu Container:**
- Background: `white`
- Border: 1px solid `gray-200`
- Border radius: `radius-md` (6px)
- Shadow: `shadow-lg` (e4)
- Max height: 256px (overflow scroll)
- Z-index: `z-dropdown` (1000)

```css
.select-menu {
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 256px;
  overflow-y: auto;
  z-index: var(--z-dropdown);
}
```

**Menu Positioning:**
- Default: Below trigger with 4px gap
- If no space below: Above trigger
- Align: Left edge matches trigger left edge
- Width: Matches trigger width (min) or auto (max content)

**Animation:**
- Enter: Fade in + scale from 95% to 100%
- Duration: 150ms
- Easing: ease-out

```css
.select-menu[data-state="open"] {
  animation: slideDown 150ms ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 3.5 Option Item Specifications

**Default Option:**
- Padding: 10px 16px (medium size)
- Font size: Matches trigger
- Cursor: pointer
- Transition: background 150ms

```css
.select-option {
  padding: 10px 16px;
  font-size: var(--text-base);
  cursor: pointer;
  transition: background-color 150ms ease-out;
}
```

**Option States:**

#### Hover
- Background: `gray-100`

```css
.select-option:hover {
  background-color: var(--gray-100);
}
```

#### Focused (Keyboard Navigation)
- Background: `gray-100`
- Outline: 2px solid `info-500` (inset)

```css
.select-option:focus {
  background-color: var(--gray-100);
  outline: 2px solid var(--info-500);
  outline-offset: -2px;
}
```

#### Selected
- Background: `primary-50` (light gray)
- Font weight: `font-weight-medium` (500)
- Check icon or radio indicator on the left

```css
.select-option[data-selected] {
  background-color: var(--gray-100);
  font-weight: var(--font-weight-medium);
}
```

#### Disabled
- Color: `gray-400`
- Cursor: not-allowed
- No hover state

```css
.select-option:disabled {
  color: var(--gray-400);
  cursor: not-allowed;
  pointer-events: none;
}
```

### 3.6 Selection Indicators

**Radio Indicator (Single Select):**
- Circle: 16px diameter
- Positioned 12px from left edge
- Selected: Filled circle (gray-950)
- Unselected: Empty circle border (gray-300)

```
┌─────────────────────────────┐
│ ○ Option 1                  │  ← Empty
│ ● Option 2                  │  ← Selected
└─────────────────────────────┘
```

**Checkmark Icon (Alternative):**
- Icon: 20px
- Positioned 12px from right edge
- Only visible when selected

```
┌─────────────────────────────┐
│ Option 1                    │
│ Option 2                 ✓ │  ← Selected
└─────────────────────────────┘
```

### 3.7 Keyboard Interactions

**Trigger Focused (Closed):**
- `Enter` / `Space`: Open menu
- `Arrow Down`: Open menu and focus first option
- `Arrow Up`: Open menu and focus last option
- `Typing`: Open menu and filter/focus matching option

**Menu Open:**
- `Arrow Down`: Focus next option (loop to first)
- `Arrow Up`: Focus previous option (loop to last)
- `Enter` / `Space`: Select focused option and close
- `Escape`: Close menu without selecting
- `Tab`: Close menu and move to next element
- `Home`: Focus first option
- `End`: Focus last option
- `Typing`: Filter options by text match

### 3.8 Multi-Select Variant

**Trigger Display:**
- Shows count: "3 selected" or comma-separated list
- If too long: "5 items selected"

```
┌─────────────────────────────┐
│ Option 1, Option 2, Opt...  │  ← Truncated list
└─────────────────────────────┘
```

**Option Items:**
- Checkbox instead of radio
- Multiple items can be checked
- "Select All" / "Clear All" options at top

```
┌─────────────────────────────┐
│ [×] Select All              │
│ ─────────────────────────── │
│ ☑ Option 1                  │
│ ☐ Option 2                  │
│ ☑ Option 3                  │
└─────────────────────────────┘
```

### 3.9 Accessibility Specifications

**ARIA Attributes:**
- Trigger: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`
- Menu: `role="listbox"`
- Options: `role="option"`, `aria-selected`

```html
<button
  role="combobox"
  aria-haspopup="listbox"
  aria-expanded="false"
  aria-labelledby="select-label"
>
  Select option
</button>

<ul role="listbox" aria-labelledby="select-label">
  <li role="option" aria-selected="false">Option 1</li>
  <li role="option" aria-selected="true">Option 2</li>
</ul>
```

**Screen Reader Announcements:**
- Trigger state: "Select, collapsed" / "Select, expanded"
- Option count: "5 options available"
- Selected option: "Option 2, selected, 2 of 5"

**Touch Targets:**
- Trigger min height: 44px
- Option min height: 44px

**Color Contrast:**
- Option text: 21:1 (AAA)
- Disabled options: 3:1 minimum

### 3.10 Pixel-Perfect Measurements

**Medium Select (Closed):**
```
Total Height: 40px
├── Border Top: 1px
├── Padding Top: 10px
├── Content Height: 18px
├── Padding Bottom: 10px
└── Border Bottom: 1px

Total Width: Variable or fixed
├── Border Left: 1px
├── Padding Left: 16px
├── Selected Text: Variable
├── Gap: 8px
├── Chevron: 20x20px
├── Padding Right: 12px
└── Border Right: 1px
```

**Dropdown Menu:**
```
├── Border Top: 1px
├── Option 1: 40px height
│   ├── Padding Top: 10px
│   ├── Content: 18px
│   └── Padding Bottom: 10px
├── Option 2: 40px height
└── Border Bottom: 1px

Max Height: 256px (scrollable)
Shadow: shadow-lg (elevation 4)
```

---

## 4. Card Component

### 4.1 Anatomy & Structure

```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │  ← Media (optional)
│ │         Image / Video               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│  Card Title                             │  ← Header
│  Subtitle or metadata                   │
│                                         │
│  Card body content goes here. This is   │  ← Body
│  the main content area with flexible    │
│  layout and typography.                 │
│                                         │
│  ┌──────────┐ ┌──────────┐             │  ← Footer (optional)
│  │  Button  │ │  Link    │             │
│  └──────────┘ └──────────┘             │
└─────────────────────────────────────────┘
```

**Elements:**
- Container: Card wrapper with padding and border
- Media: Optional image or video (top or side)
- Header: Title, subtitle, metadata
- Body: Main content area
- Footer: Actions, buttons, links

### 4.2 Card Layouts (5 Variants)

#### Layout 1: Standard Card
- Padding: 24px (spacing-6) all sides
- No media
- Header + Body + Footer

```
┌─────────────────────────────┐
│  Card Title                 │
│  Subtitle text              │
│                             │
│  Body content here with     │
│  paragraphs and other       │
│  elements.                  │
│                             │
│  [Button] [Link]            │
└─────────────────────────────┘

Dimensions:
- Padding: 24px all sides
- Gap between sections: 16px (spacing-4)
- Border: 1px solid gray-200
- Border radius: 8px (radius-lg)
```

#### Layout 2: Media Top
- Media spans full width (no padding on sides)
- Content has 24px padding
- Media height: 200px (default) or 16:9 ratio

```
┌─────────────────────────────┐
│█████████████████████████████│  ← Image (full width)
│█████████████████████████████│
│█████████████████████████████│
├─────────────────────────────┤
│  Card Title                 │
│                             │
│  Body content               │
│                             │
│  [Button]                   │
└─────────────────────────────┘

Dimensions:
- Media: 100% width, 200px height (or aspect-ratio: 16/9)
- Content padding: 24px (excluding media)
- Gap: 0 (media flush with top edge)
```

#### Layout 3: Media Left (Horizontal)
- Media on left side, fixed width 160px
- Content on right with padding
- Card height: auto (content-driven) or fixed

```
┌────────┬────────────────────┐
│████████│  Card Title        │
│████████│                    │
│████████│  Body content      │
│████████│                    │
│████████│  [Button]          │
└────────┴────────────────────┘

Dimensions:
- Media: 160px width, 100% height
- Content padding: 24px (right side only)
- Gap between media and content: 0 (media flush)
- Min height: 160px (to accommodate media)
```

#### Layout 4: Compact Card
- Reduced padding: 16px (spacing-4)
- Smaller gaps: 12px (spacing-3)
- Suitable for lists, grids with many cards

```
┌─────────────────────────────┐
│  Card Title                 │
│                             │
│  Body content               │
│                             │
│  [Button]                   │
└─────────────────────────────┘

Dimensions:
- Padding: 16px all sides
- Gap between sections: 12px (spacing-3)
- Border: 1px solid gray-200
- Border radius: 6px (radius-md)
```

#### Layout 5: Elevated Card (Feature)
- Larger padding: 32px (spacing-8)
- Prominent shadow: shadow-lg (e4)
- Suitable for featured content, hero sections

```
┌─────────────────────────────┐
│                             │
│  Featured Card Title        │
│  More prominent subtitle    │
│                             │
│  Extended body content      │
│  with more breathing room   │
│                             │
│  [Primary Button]           │
│                             │
└─────────────────────────────┘

Dimensions:
- Padding: 32px all sides
- Gap between sections: 20px (spacing-5)
- Border: none (shadow provides boundary)
- Border radius: 12px (radius-xl)
- Shadow: shadow-lg (elevation 4)
```

### 4.3 Card Sizes

**Width:**
- Small: 280px (fixed or min-width)
- Medium: 320px (default)
- Large: 400px
- Full: 100% (flexible within grid/flex container)

**Height:**
- Auto: Content-driven (most common)
- Fixed: 400px (for consistent grid layouts)
- Min-height: 200px (to prevent too-short cards)

### 4.4 Card States

#### Default (Rest)
- Background: `white`
- Border: 1px solid `gray-200`
- Shadow: `shadow-sm` (e1)

```css
.card {
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
```

#### Hover (Interactive Cards)
- Shadow: `shadow-md` (e3)
- Border: `gray-300` (subtle)
- Cursor: pointer (if clickable)
- Transition: 300ms ease-out

```css
.card-interactive:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--gray-300);
  cursor: pointer;
}
```

#### Focus (Keyboard Navigation)
- Outline: 2px solid `info-500`
- Outline offset: 2px
- Shadow: maintained or elevated

```css
.card-interactive:focus {
  outline: 2px solid var(--info-500);
  outline-offset: 2px;
}
```

#### Active (Pressed)
- Shadow: `shadow-base` (e2) - slightly reduced
- Transform: `scale(0.98)` (subtle press)
- Transition: 150ms

```css
.card-interactive:active {
  box-shadow: var(--shadow-base);
  transform: scale(0.98);
}
```

#### Disabled
- Opacity: 0.6
- Cursor: not-allowed
- No hover/active states

```css
.card-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 4.5 Card Header Specifications

**Title:**
- Font size: `text-xl` (20px)
- Font weight: `font-weight-semibold` (600)
- Color: `gray-950`
- Line height: `line-height-tight` (1.25)

```css
.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-950);
  line-height: var(--line-height-tight);
}
```

**Subtitle/Metadata:**
- Font size: `text-sm` (14px)
- Color: `gray-600`
- Margin top: 4px (spacing-1)

```css
.card-subtitle {
  font-size: var(--text-sm);
  color: var(--gray-600);
  margin-top: var(--spacing-1);
}
```

### 4.6 Card Body Specifications

**Content Area:**
- Font size: `text-base` (16px)
- Color: `gray-700`
- Line height: `line-height-normal` (1.5)
- Margin top: 16px (spacing-4) from header

```css
.card-body {
  font-size: var(--text-base);
  color: var(--gray-700);
  line-height: var(--line-height-normal);
  margin-top: var(--spacing-4);
}
```

**List Support:**
- Unordered lists with 8px left margin
- List items with 4px spacing

**Rich Content:**
- Paragraphs: 12px margin bottom
- Headings: Reduced sizes (text-lg for h3)
- Links: Underlined on hover

### 4.7 Card Footer Specifications

**Footer Layout:**
- Margin top: 16px (spacing-4) from body
- Display: flex
- Gap: 12px (spacing-3) between buttons
- Justify: flex-start (left-aligned) or space-between

```css
.card-footer {
  display: flex;
  gap: var(--spacing-3);
  margin-top: var(--spacing-4);
}
```

**Button Sizes:**
- Use small or medium buttons
- Primary + Secondary pattern common

### 4.8 Card Media Specifications

**Image:**
- Object-fit: cover (fills space, crops if needed)
- Border radius: Top corners only (if media-top layout)
- Alt text required for accessibility

```css
.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
```

**Aspect Ratios:**
- 16:9 (video, landscape): `aspect-ratio: 16/9`
- 4:3 (photo): `aspect-ratio: 4/3`
- 1:1 (square): `aspect-ratio: 1/1`
- Custom: `aspect-ratio: 3/2`

### 4.9 Card Grid Layouts

**Grid Container:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-6); /* 24px */
}
```

**Responsive Breakpoints:**
- Mobile (< 640px): 1 column
- Tablet (640px+): 2 columns
- Desktop (1024px+): 3 columns
- Large (1280px+): 4 columns

### 4.10 Accessibility Specifications

**Semantic HTML:**
- Use `<article>` for cards representing independent content
- Use `<section>` for grouping related cards
- Headings hierarchy maintained (h2 for titles if h1 is page title)

**Interactive Cards:**
- Tab navigation: Card receives focus
- Enter/Space: Activates card click
- `aria-label` or `aria-labelledby` for card purpose

```html
<article class="card" role="article">
  <h2 class="card-title">Card Title</h2>
  <p class="card-body">Content...</p>
  <footer class="card-footer">
    <button>Action</button>
  </footer>
</article>
```

**Touch Targets:**
- Interactive cards: min height 44px (usually exceeded)
- Buttons in footer: 44x44px minimum

**Color Contrast:**
- Title: 21:1 (AAA) - gray-950 on white
- Body: 12.6:1 (AAA) - gray-700 on white
- Metadata: 7:1 (AA) - gray-600 on white

### 4.11 Pixel-Perfect Measurements

**Standard Card (Layout 1, Medium Size):**
```
Total Width: 320px
Total Height: Auto (content-driven)

├── Border: 1px all sides
├── Padding Top: 24px
├── Header:
│   ├── Title: 20px font, ~25px height
│   ├── Gap: 4px
│   └── Subtitle: 14px font, ~18px height
├── Gap: 16px
├── Body:
│   └── Content: Variable height (16px font, 1.5 line-height)
├── Gap: 16px
├── Footer:
│   └── Buttons: 40px height (medium)
├── Padding Bottom: 24px
└── Border: 1px

Example Total: 1 + 24 + 47 + 16 + 80 + 16 + 40 + 24 + 1 = 249px
```

**Media-Top Card (Layout 2):**
```
├── Media: 320px width, 180px height (16:9)
├── Border: 1px (sides only, top rounded with media)
├── Padding Top: 24px (below media)
├── Content sections: Same as standard
└── Padding Bottom: 24px

Total Height: 180 + 1 + 24 + content + 24 + 1 ≈ 230px + content
```

---

## 5. Checkbox Component

### 5.1 Anatomy & Structure

```
┌────┐
│    │  Label Text
└────┘
  ↑
Checkbox
```

**Elements:**
- Checkbox Box: Square input indicator
- Checkmark: Visible when checked
- Label: Descriptive text (optional but recommended)

### 5.2 Sizes

#### Small (sm)
- **Box Size:** 16x16px
- **Border Width:** 1px
- **Checkmark Size:** 12x12px (icon)
- **Label Font Size:** 14px (text-sm)
- **Gap:** 8px (spacing-2)

```css
.checkbox-sm {
  width: 16px;
  height: 16px;
}
.checkbox-sm-label {
  font-size: var(--text-sm);
  gap: var(--spacing-2);
}
```

#### Medium (md) - Default
- **Box Size:** 20x20px
- **Border Width:** 2px
- **Checkmark Size:** 14x14px
- **Label Font Size:** 16px (text-base)
- **Gap:** 12px (spacing-3)

```css
.checkbox-md {
  width: 20px;
  height: 20px;
  border-width: 2px;
}
.checkbox-md-label {
  font-size: var(--text-base);
  gap: var(--spacing-3);
}
```

#### Large (lg)
- **Box Size:** 24x24px
- **Border Width:** 2px
- **Checkmark Size:** 16x16px
- **Label Font Size:** 18px (text-lg)
- **Gap:** 12px (spacing-3)

```css
.checkbox-lg {
  width: 24px;
  height: 24px;
  border-width: 2px;
}
.checkbox-lg-label {
  font-size: var(--text-lg);
  gap: var(--spacing-3);
}
```

### 5.3 Checkbox States

#### Unchecked (Default)
- Border: 2px solid `gray-400`
- Background: `white`
- Cursor: pointer

```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray-400);
  border-radius: var(--radius-sm);
  background-color: var(--white);
  cursor: pointer;
}
```

#### Hover (Unchecked)
- Border: `gray-600`
- Background: `gray-50`
- Transition: 150ms ease-out

```css
.checkbox:hover {
  border-color: var(--gray-600);
  background-color: var(--gray-50);
}
```

#### Focus (Keyboard)
- Border: `info-500`
- Focus ring: 3px offset, `info-500` with opacity
- Maintains hover styles if hovered

```css
.checkbox:focus {
  outline: none;
  border-color: var(--info-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
```

#### Checked
- Background: `primary-950` (black)
- Border: `primary-950`
- Checkmark: white color
- Transition: 150ms ease-out

```css
.checkbox:checked {
  background-color: var(--primary-950);
  border-color: var(--primary-950);
}
.checkbox:checked::after {
  /* Checkmark icon rendered */
  content: '';
  /* SVG or icon font checkmark */
}
```

#### Checked + Hover
- Background: `primary-900` (slightly lighter)
- Border: `primary-900`

#### Checked + Focus
- Same as checked state
- Focus ring: `info-500`

#### Indeterminate (Partial Selection)
- Background: `primary-950`
- Icon: Horizontal line (minus) instead of checkmark
- Used for "select all" when some items selected

```css
.checkbox:indeterminate {
  background-color: var(--primary-950);
  border-color: var(--primary-950);
}
.checkbox:indeterminate::after {
  /* Horizontal line icon */
  content: '';
}
```

#### Disabled (Unchecked)
- Border: `gray-300`
- Background: `gray-100`
- Cursor: not-allowed
- Opacity: 0.6

```css
.checkbox:disabled {
  border-color: var(--gray-300);
  background-color: var(--gray-100);
  cursor: not-allowed;
  opacity: 0.6;
}
```

#### Disabled (Checked)
- Border: `gray-400`
- Background: `gray-400`
- Checkmark: `gray-200`
- Cursor: not-allowed
- Opacity: 0.6

```css
.checkbox:disabled:checked {
  background-color: var(--gray-400);
  border-color: var(--gray-400);
}
```

### 5.4 Label Specifications

**Label Text:**
- Font size: Matches size variant (sm: 14px, md: 16px, lg: 18px)
- Font weight: `font-weight-regular` (400)
- Color: `gray-950`
- Line height: `line-height-normal` (1.5)
- Cursor: pointer (entire label clickable)

```css
.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
}
.checkbox-label-text {
  font-size: var(--text-base);
  color: var(--gray-950);
  line-height: var(--line-height-normal);
}
```

**Label Position:**
- Default: Right of checkbox
- Alternative: Left of checkbox (less common)
- Vertical align: center with checkbox

**Multi-line Labels:**
- Checkbox aligns to first line (top)
- Label text wraps naturally

```
┌────┐  This is a longer label that wraps
│    │  to multiple lines. The checkbox
└────┘  aligns to the top.
```

### 5.5 Checkmark Icon

**Icon Type:**
- SVG path or icon font
- Recommended: Lucide "Check" icon or similar

**Icon Specifications:**
- Size: 14px (medium checkbox)
- Stroke width: 2px
- Color: `white`
- Positioned center of checkbox box

**Checkmark Path (SVG):**
```svg
<svg viewBox="0 0 24 24" width="14" height="14">
  <path
    d="M20 6L9 17L4 12"
    stroke="white"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

**Indeterminate Icon (Minus):**
```svg
<svg viewBox="0 0 24 24" width="14" height="14">
  <path
    d="M5 12h14"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>
```

### 5.6 Checkbox Group

**Group Container:**
- Stack: Vertical layout with 12px gap
- Fieldset: Use `<fieldset>` and `<legend>` for groups

```html
<fieldset class="checkbox-group">
  <legend>Select options:</legend>

  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" />
    <span>Option 1</span>
  </label>

  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" />
    <span>Option 2</span>
  </label>
</fieldset>
```

```css
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3); /* 12px */
  border: none;
}
.checkbox-group legend {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--gray-950);
  margin-bottom: var(--spacing-2);
}
```

### 5.7 Keyboard Interactions

**Checkbox Focused:**
- `Space`: Toggle checked state
- `Tab`: Move to next checkbox
- `Shift+Tab`: Move to previous checkbox

**Checkbox Group:**
- `Arrow Down`: Focus next checkbox (optional enhancement)
- `Arrow Up`: Focus previous checkbox (optional enhancement)

### 5.8 Accessibility Specifications

**Semantic HTML:**
- Use native `<input type="checkbox">`
- Always associate with `<label>` (wrapping or `for` attribute)

```html
<!-- Method 1: Wrapping label -->
<label class="checkbox-label">
  <input type="checkbox" class="checkbox" />
  <span>Label text</span>
</label>

<!-- Method 2: Separate with 'for' -->
<input type="checkbox" id="checkbox1" class="checkbox" />
<label for="checkbox1">Label text</label>
```

**ARIA Attributes:**
- `aria-checked="true|false|mixed"` (if custom checkbox)
- `aria-required="true"` (if required in form)
- `aria-invalid="true"` (if validation fails)
- `aria-describedby` (if helper text present)

**Screen Readers:**
- Announce state: "Checkbox, checked" / "Checkbox, not checked"
- Announce label: "Accept terms and conditions, checkbox, not checked"
- Indeterminate: "Checkbox, partially checked"

**Touch Targets:**
- Minimum: 44x44px
- Checkbox (20px) + Label creates sufficient target
- Ensure label is clickable (increases hit area)

**Color Contrast:**
- Unchecked border: 3.7:1 (gray-400 vs white) - minimum AA
- Checked background: 21:1 (black vs white) - AAA
- Checkmark: 21:1 (white on black) - AAA
- Label: 21:1 (gray-950 on white) - AAA

### 5.9 Error State

**Invalid Checkbox:**
- Border: `error-600` (red)
- Background: `error-50` (light red) when unchecked
- Helper text below with error message

```css
.checkbox.error {
  border-color: var(--error-600);
  background-color: var(--error-50);
}
.checkbox.error:checked {
  background-color: var(--error-600);
  border-color: var(--error-600);
}
```

**Error Message:**
```html
<label class="checkbox-label">
  <input type="checkbox" class="checkbox error" aria-invalid="true" />
  <span>I agree to terms</span>
</label>
<span class="checkbox-error-text">You must agree to continue</span>
```

```css
.checkbox-error-text {
  font-size: var(--text-sm);
  color: var(--error-600);
  margin-left: 32px; /* Align with label text */
  margin-top: var(--spacing-1);
}
```

### 5.10 Pixel-Perfect Measurements

**Medium Checkbox (Default):**
```
Checkbox Box:
├── Width: 20px
├── Height: 20px
├── Border: 2px solid (included in 20x20)
├── Border Radius: 2px (radius-sm)
└── Checkmark: 14x14px (centered, 3px from edges)

With Label:
├── Checkbox: 20x20px
├── Gap: 12px (spacing-3)
├── Label Text: Variable width
│   ├── Font Size: 16px
│   ├── Line Height: 24px (1.5)
│   └── Color: gray-950
└── Total Height: 24px (label line-height, checkbox centers)

Touch Target:
├── Checkbox visual: 20x20px
├── Label padding: Extends to 44px minimum height
└── Clickable area: Entire label container
```

**Checkbox Group Spacing:**
```
Fieldset Container:
├── Legend: 14px font, 500 weight, 8px margin-bottom
├── Checkbox 1: 24px height
├── Gap: 12px
├── Checkbox 2: 24px height
├── Gap: 12px
├── Checkbox 3: 24px height
└── Total Height: ~96px (3 checkboxes + 2 gaps + legend)
```

---

## Component Cross-Reference

### Shared Patterns

**All Interactive Components:**
- Focus ring: 2px solid `info-500`, 2px offset
- Hover transition: 150ms ease-out
- Disabled opacity: 0.5-0.6
- Cursor states: pointer (interactive), not-allowed (disabled)

**Form Components (Input, Select):**
- Height alignment: 32px (sm), 40px (md), 48px (lg)
- Border: 1px solid `gray-300` (default)
- Focus border: 2px solid `info-500`
- Error border: 2px solid `error-600`
- Padding: 12px/16px/20px (sm/md/lg)

**Typography Consistency:**
- Labels: `text-sm`, `font-weight-medium`, `gray-950`
- Helper text: `text-sm`, `gray-600`
- Error text: `text-sm`, `error-600`
- Placeholders: `text-base/sm`, `gray-500`

### Component Combinations

**Form Field Group:**
```
Label (text-sm, medium weight, 4px margin-bottom)
↓
Input/Select (40px height, 16px padding)
↓
Helper/Error Text (text-sm, 4px margin-top)
```

**Card with Form:**
```
Card Container (24px padding, radius-lg)
├── Card Title (text-xl, semibold)
├── Card Body
│   ├── Input Field
│   ├── Select Field
│   └── Checkbox Group
└── Card Footer
    ├── Submit Button (Primary, Medium)
    └── Cancel Button (Secondary, Medium)
```

**Button Group:**
```
<div class="button-group">
  <button class="btn btn-primary btn-md">Save</button>
  <button class="btn btn-secondary btn-md">Cancel</button>
</div>

.button-group {
  display: flex;
  gap: var(--spacing-3); /* 12px */
}
```

---

## Implementation Notes

### CSS Architecture

**Recommended Structure:**
```
styles/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   ├── shadows.css
│   └── radius.css
├── components/
│   ├── button.css
│   ├── input.css
│   ├── select.css
│   ├── card.css
│   └── checkbox.css
└── index.css (imports all)
```

**Token Usage:**
```css
/* ✅ Good: Use tokens */
.button {
  padding: var(--spacing-3) var(--spacing-6);
  color: var(--color-text-inverse);
}

/* ❌ Bad: Hardcoded values */
.button {
  padding: 12px 24px;
  color: #FFFFFF;
}
```

### JavaScript/React Integration

**Example Button Component (React):**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}
```

### Testing Checklist

**Visual Testing:**
- [ ] All states render correctly (default, hover, focus, active, disabled)
- [ ] Sizes are pixel-perfect (use browser dev tools)
- [ ] Spacing matches design tokens
- [ ] Colors match design tokens
- [ ] Shadows and borders correct

**Interaction Testing:**
- [ ] Hover states work on desktop
- [ ] Focus states visible with keyboard navigation
- [ ] Active states work on click/tap
- [ ] Disabled states prevent interaction
- [ ] Loading states display correctly

**Accessibility Testing:**
- [ ] Keyboard navigation works (Tab, Enter, Space, Arrows)
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA (minimum)
- [ ] Touch targets meet 44px minimum
- [ ] Focus indicators visible

**Responsive Testing:**
- [ ] Components work on mobile (320px width)
- [ ] Components work on tablet (768px)
- [ ] Components work on desktop (1280px+)
- [ ] Text doesn't overflow
- [ ] Layouts adapt correctly

---

## Changelog

**v1.0.0 (2026-01-30)**
- Complete specifications for 5 components (Button, Input, Select, Card, Checkbox)
- All variants, sizes, and states defined
- Pixel-perfect measurements documented
- Accessibility guidelines included
- Interaction specifications detailed
- Code examples provided
- Cross-component patterns established
