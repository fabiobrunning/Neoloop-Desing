# Phase 3: Input Components - Design Specifications
**Neoloop Design System Builder**
**Date:** 2026-01-31
**Author:** @ux-design-expert
**Status:** Complete

---

## Table of Contents

1. [DatePicker Component](#1-datepicker-component)
2. [TimePicker Component](#2-timepicker-component)
3. [FileUpload Component](#3-fileupload-component)

---

## 1. DatePicker Component

### 1.1 Component Anatomy

```
┌─────────────────────────────────────┐
│ Input Field (trigger)               │
│ ┌─────────────────────────────────┐ │
│ │ 📅  Jan 31, 2026          ▼    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
         ↓ (on click)
┌─────────────────────────────────────┐
│ Calendar Popover                    │
│ ┌─────────────────────────────────┐ │
│ │  ← January 2026 →               │ │
│ ├─────────────────────────────────┤ │
│ │ Su Mo Tu We Th Fr Sa            │ │
│ ├─────────────────────────────────┤ │
│ │          1  2  3  4  5  6       │ │
│ │  7  8  9 10 11 12 13            │ │
│ │ 14 15 16 17 18 19 20            │ │
│ │ 21 22 23 24 25 26 27            │ │
│ │ 28 29 30 31 [1][2][3]           │ │
│ ├─────────────────────────────────┤ │
│ │  [Today]        [Clear]         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 1.2 Input Field Specifications

#### Container
- **Width:** 100% (fluid, min 240px)
- **Height:** 40px (medium), 48px (large)
- **Border:** 1px solid `border-default` (`colors.neutral.300`)
- **Border Radius:** `border-radius-md` (8px)
- **Background:** `bg-surface` (white)
- **Padding:** 0 12px
- **Layout:** Flexbox (align-items: center)
- **Gap:** 8px

#### Icon (Calendar)
- **Size:** 20px
- **Color:** `text-secondary` (`colors.neutral.600`)
- **Position:** Left (before text)
- **Flex:** 0 0 20px

#### Display Text
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-primary` (`colors.neutral.900`)
- **Flex:** 1 (grow to fill)
- **Placeholder Color:** `text-tertiary` (`colors.neutral.500`)
- **Format:** MMM DD, YYYY (Jan 31, 2026)

#### Dropdown Icon
- **Size:** 16px
- **Color:** `text-secondary`
- **Position:** Right
- **Flex:** 0 0 16px
- **Rotation:** 0deg (closed), 180deg (open)
- **Transition:** `transform 200ms ease`

#### Input States

**Default:**
- Border: `border-default` (`colors.neutral.300`)
- Background: `bg-surface` (white)
- Text: `text-primary`

**Hover:**
- Border: `border-strong` (`colors.neutral.400`)
- Cursor: `pointer`
- Transition: `border-color 150ms ease`

**Focus:**
- Border: 2px solid `colors.brand.500`
- Outline: None
- Box Shadow: `0 0 0 4px rgba(brand.500, 0.1)`

**Disabled:**
- Opacity: 0.5
- Cursor: `not-allowed`
- Background: `bg-subtle` (`colors.neutral.50`)

**Error:**
- Border: 2px solid `colors.error.500`
- Box Shadow: `0 0 0 4px rgba(error.500, 0.1)`
- Helper text below (red)

### 1.3 Calendar Popover Specifications

#### Container
- **Width:** 320px (fixed)
- **Background:** `bg-surface` (white)
- **Border:** 1px solid `border-default` (`colors.neutral.200`)
- **Border Radius:** 12px
- **Shadow:** `shadow-lg` (0 8px 24px rgba(0,0,0,0.15))
- **Padding:** 16px
- **Position:** Absolute (below input, align left)
- **Z-Index:** 1000

#### Header (Month Navigation)
- **Height:** 40px
- **Margin Bottom:** 12px
- **Layout:** Flexbox (space-between, align-items: center)

**Previous/Next Buttons:**
- **Size:** 32x32px
- **Border Radius:** 6px
- **Background:** Transparent (hover: `bg-hover`)
- **Icon:** Chevron left/right (16px)
- **Icon Color:** `text-secondary`
- **Hover:** Background `colors.neutral.100`

**Month/Year Label:**
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-semibold` (600)
  - Color: `text-primary`
- **Flex:** 1
- **Text Align:** Center
- **Click:** Open month/year selector

#### Weekday Labels
- **Height:** 32px
- **Layout:** Grid (7 columns)
- **Gap:** 4px
- **Typography:**
  - Font Size: `font-size-xs` (12px)
  - Weight: `font-weight-medium` (500)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Transform: Uppercase
- **Text Align:** Center

#### Calendar Grid
- **Layout:** Grid (7 columns × 6 rows)
- **Gap:** 4px
- **Margin Bottom:** 12px

#### Day Cell
- **Size:** 40x40px
- **Border Radius:** 6px
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-primary`
- **Text Align:** Center
- **Line Height:** 40px (vertical center)

#### Day Cell States

**Default (current month):**
- Background: Transparent
- Color: `text-primary` (`colors.neutral.900`)
- Cursor: `pointer`

**Other Month:**
- Background: Transparent
- Color: `text-tertiary` (`colors.neutral.400`)
- Cursor: `pointer`

**Hover:**
- Background: `bg-hover` (`colors.neutral.100`)
- Color: `text-primary`
- Transition: `background 150ms ease`

**Selected:**
- Background: `colors.brand.500`
- Color: White
- Weight: `font-weight-semibold` (600)
- Border: None

**Today (not selected):**
- Background: Transparent
- Border: 2px solid `colors.brand.500`
- Color: `text-primary`

**Selected + Today:**
- Background: `colors.brand.500`
- Color: White
- Border: 2px solid `colors.brand.700` (darker border)

**Disabled:**
- Background: Transparent
- Color: `text-tertiary` (`colors.neutral.300`)
- Cursor: `not-allowed`
- Text Decoration: Line-through

**Range Start:**
- Background: `colors.brand.500`
- Color: White
- Border Radius: 6px 0 0 6px (left rounded)

**Range Middle:**
- Background: `colors.brand.100`
- Color: `text-primary`
- Border Radius: 0

**Range End:**
- Background: `colors.brand.500`
- Color: White
- Border Radius: 0 6px 6px 0 (right rounded)

#### Footer Actions
- **Height:** 40px
- **Border Top:** 1px solid `border-subtle` (`colors.neutral.100`)
- **Padding Top:** 12px
- **Layout:** Flexbox (space-between)

**Today Button:**
- **Type:** Button (tertiary variant)
- **Size:** Small (32px height)
- **Text:** "Today"

**Clear Button:**
- **Type:** Button (ghost variant)
- **Size:** Small (32px height)
- **Text:** "Clear"
- **Color:** `text-secondary`

### 1.4 Date Range Selection

When `mode="range"`:

**Visual Changes:**
- Two input fields (From - To)
- Calendar shows start and end dates
- Days between are highlighted with light background
- Click once to select start, click again to select end

**Range Highlight:**
- Start/End: Full `colors.brand.500` background
- Middle days: `colors.brand.100` background
- Hover shows preview of range

### 1.5 Month/Year Selector

Clicking month/year label opens selector:

```
┌─────────────────────────────┐
│  Select Year                │
│ ┌─────────────────────────┐ │
│ │ 2024  2025  [2026]      │ │
│ │ 2027  2028  2029        │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│  Select Month               │
│ ┌─────────────────────────┐ │
│ │ Jan  Feb  Mar  Apr      │ │
│ │ May  Jun  Jul  Aug      │ │
│ │ Sep  Oct  Nov  Dec      │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**Grid Layout:**
- Years: 3 columns × 2 rows (6 visible)
- Months: 4 columns × 3 rows (12 total)
- Cell size: 64px × 32px
- Gap: 8px
- Current year/month highlighted

### 1.6 Animation

**Popover Open:**
- Scale: 0.95 to 1.0
- Opacity: 0 to 1
- Duration: 200ms
- Easing: ease-out
- Transform Origin: Top left

**Popover Close:**
- Scale: 1.0 to 0.95
- Opacity: 1 to 0
- Duration: 150ms
- Easing: ease-in

**Month Transition:**
- Slide: Current month slides left/right
- New month fades in from opposite direction
- Duration: 300ms
- Easing: ease-in-out

**Day Hover:**
- Background: 0ms (instant)
- Scale: 1.0 to 1.05 (subtle)
- Duration: 100ms

### 1.7 Keyboard Navigation

**Input Field:**
- **Space / Enter:** Open calendar
- **Escape:** Close calendar
- **Tab:** Move to next field

**Calendar (when open):**
- **Arrow Keys:** Navigate days
- **Page Up/Down:** Previous/next month
- **Home:** Go to start of week
- **End:** Go to end of week
- **Ctrl+Home:** Go to start of month
- **Ctrl+End:** Go to end of month
- **Enter:** Select focused day
- **Escape:** Close calendar without selecting
- **T:** Select today

### 1.8 Responsive Behavior

**Desktop (>768px):**
- Popover width: 320px
- Full calendar grid (7×6)
- Footer actions visible

**Mobile (<768px):**
- Popover: Full width (100vw - 32px)
- Larger touch targets (48px cells)
- Bottom sheet instead of popover
- Backdrop overlay (0.5 opacity black)

### 1.9 Dark Mode

**Input Field:**
- Background: `colors.neutral.900`
- Border: `colors.neutral.700`
- Text: `colors.neutral.50`
- Icon: `colors.neutral.400`

**Popover:**
- Background: `colors.neutral.800`
- Border: `colors.neutral.700`
- Text: `colors.neutral.50`

**Day Cells:**
- Default: `colors.neutral.50`
- Other month: `colors.neutral.600`
- Hover: `colors.neutral.700` background
- Selected: `colors.brand.500` background (unchanged)
- Today: `colors.brand.400` border

### 1.10 Accessibility

**ARIA Attributes:**
- `role="button"` on input trigger
- `aria-haspopup="dialog"` on input
- `aria-expanded="true/false"` based on state
- `role="dialog"` on popover
- `aria-label="Choose date"` on dialog
- `role="grid"` on calendar
- `aria-label="Day D of Month M, Year Y"` on day cells

**Screen Reader:**
- Announce "Date picker, select a date"
- Read current value when focused
- Announce calendar opened/closed
- Read day, month, year on navigation
- Announce selection

**Focus Management:**
- Focus input on mount
- Focus current/selected day when calendar opens
- Return focus to input when calendar closes
- Trap focus within calendar while open

---

## 2. TimePicker Component

### 2.1 Component Anatomy

```
┌─────────────────────────────────────┐
│ Input Field (trigger)               │
│ ┌─────────────────────────────────┐ │
│ │ 🕐  02:30 PM             ▼     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
         ↓ (on click)
┌─────────────────────────────────────┐
│ Time Selector Popover               │
│ ┌───────┬───────┬───────┐           │
│ │ Hour  │ Min   │ AM/PM │           │
│ ├───────┼───────┼───────┤           │
│ │  01   │  00   │       │           │
│ │ [02]  │  15   │ [AM]  │           │
│ │  03   │ [30]  │ [PM]  │           │
│ │  04   │  45   │       │           │
│ │  05   │       │       │           │
│ │  ...  │       │       │           │
│ └───────┴───────┴───────┘           │
│ ┌─────────────────────────────────┐ │
│ │  [Now]          [Clear]         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 2.2 Input Field Specifications

#### Container
- **Width:** 100% (fluid, min 180px)
- **Height:** 40px (medium), 48px (large)
- **Border:** 1px solid `border-default` (`colors.neutral.300`)
- **Border Radius:** 8px
- **Background:** `bg-surface` (white)
- **Padding:** 0 12px
- **Layout:** Flexbox (align-items: center)
- **Gap:** 8px

#### Icon (Clock)
- **Size:** 20px
- **Color:** `text-secondary` (`colors.neutral.600`)
- **Position:** Left

#### Display Text
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-primary`
- **Format 12h:** HH:MM AM/PM (02:30 PM)
- **Format 24h:** HH:MM (14:30)

#### States
- Same as DatePicker input field
- Default, Hover, Focus, Disabled, Error

### 2.3 Time Selector Popover

#### Container
- **Width:** 240px (12h), 200px (24h)
- **Background:** `bg-surface` (white)
- **Border:** 1px solid `border-default`
- **Border Radius:** 12px
- **Shadow:** `shadow-lg`
- **Padding:** 16px

#### Column Layout
- **Layout:** Grid (3 columns for 12h, 2 for 24h)
- **Column Width:** Equal (1fr each)
- **Gap:** 12px

**Columns:**
1. Hours (01-12 or 00-23)
2. Minutes (00-59)
3. Period (AM/PM) - only for 12h format

#### Spinner/Scrollable List

Each column is a scrollable list:

**Container:**
- **Height:** 200px (shows 5 items at a time)
- **Overflow:** Auto (vertical scroll)
- **Scroll Snap:** Mandatory (snap to center)
- **Padding:** 64px 0 (top/bottom for centering)

**Item:**
- **Height:** 40px
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Font Variant Numeric: Tabular nums
- **Text Align:** Center
- **Line Height:** 40px
- **Cursor:** Pointer

#### Item States

**Default:**
- Color: `text-tertiary` (`colors.neutral.500`)
- Opacity: 0.5

**Nearby (1 position away):**
- Color: `text-secondary` (`colors.neutral.600`)
- Opacity: 0.7

**Selected (centered):**
- Color: `text-primary` (`colors.neutral.900`)
- Weight: `font-weight-semibold` (600)
- Opacity: 1.0
- Background: `colors.brand.50`
- Border Radius: 6px

**Hover:**
- Background: `colors.neutral.100`
- Color: `text-primary`

#### Visual Gradient Mask
- **Top:** Linear gradient (white → transparent)
- **Bottom:** Linear gradient (transparent → white)
- **Height:** 32px each
- **Purpose:** Fade out non-selected items visually

### 2.4 Direct Input Mode

Alternative to spinner: allow typing time directly

```
┌─────────────────────────────────────┐
│ Enter Time                          │
│ ┌────────┬───┬──────┬───┬─────────┐ │
│ │  [02]  │ : │ [30] │   │ [PM]    │ │
│ │  HH    │   │ MM   │   │ AM/PM   │ │
│ └────────┴───┴──────┴───┴─────────┘ │
│                                     │
│  [Set Time]         [Cancel]        │
└─────────────────────────────────────┘
```

**Input Fields:**
- **Width:** 48px (hours/minutes), 64px (period)
- **Height:** 40px
- **Font:** `font-family-mono` (tabular nums)
- **Text Align:** Center
- **Input Type:** Number (hours/minutes)
- **Validation:** Real-time (01-12 or 00-23, 00-59)

### 2.5 Time Format Toggle

Optional toggle for 12h/24h format:

**Toggle Location:** Top right of popover
**Component:** SegmentedControl
**Options:** "12h" / "24h"
**Default:** User locale preference

### 2.6 Animation

**Popover Open:**
- Same as DatePicker (scale + opacity)

**Spinner Scroll:**
- Smooth scroll with `scroll-behavior: smooth`
- Snap to center item (CSS Scroll Snap)
- Transition: 200ms ease-out

**Item Selection:**
- Background fade: 150ms ease
- Weight change: Instant
- Opacity: 100ms ease

### 2.7 Keyboard Navigation

**Input Field:**
- **Space / Enter:** Open time selector
- **Arrow Up/Down:** Increment/decrement hour
- **Shift + Arrow:** Increment/decrement minute
- **A / P:** Set AM/PM

**Time Selector (spinner):**
- **Arrow Up/Down:** Navigate within column
- **Tab:** Move to next column
- **Shift+Tab:** Move to previous column
- **Page Up/Down:** Jump by 5 (hours/minutes)
- **Enter:** Confirm selection
- **Escape:** Cancel and close

**Direct Input Mode:**
- **Tab:** Move between fields (hours → minutes → period)
- **Arrow Up/Down:** Increment/decrement value
- **Enter:** Submit
- **Escape:** Cancel

### 2.8 Time Constraints

**Min/Max Time:**
- Disable times outside range
- Gray out disabled times
- Skip disabled times in navigation

**Step Intervals:**
- Minutes step: 1, 5, 10, 15, 30, 60 (configurable)
- Show only valid intervals in list
- Example: step=15 shows 00, 15, 30, 45

### 2.9 Responsive Behavior

**Desktop:**
- Popover width: 240px (12h) or 200px (24h)
- Spinner with 5 visible items

**Mobile:**
- Full-width bottom sheet
- Larger touch targets (56px item height)
- Show 3 visible items (larger)
- Backdrop overlay

### 2.10 Dark Mode

**Input & Popover:**
- Same as DatePicker dark mode

**Spinner Items:**
- Default: `colors.neutral.600`
- Nearby: `colors.neutral.400`
- Selected: `colors.neutral.50` on `colors.brand.900`

### 2.11 Accessibility

**ARIA Attributes:**
- `role="combobox"` on input
- `aria-haspopup="listbox"`
- `role="listbox"` on each column
- `role="option"` on each item
- `aria-selected="true"` on selected item
- `aria-label="Hour / Minute / Period"` on columns

**Screen Reader:**
- Announce "Time picker, select time"
- Read current time when focused
- Announce column (Hour, Minute, AM/PM)
- Announce value as user navigates
- Confirm selection

---

## 3. FileUpload Component

### 3.1 Component Anatomy

```
┌─────────────────────────────────────────────┐
│ File Upload Container                       │
│ ┌─────────────────────────────────────────┐ │
│ │ Drop Zone (default state)               │ │
│ │                                         │ │
│ │          ⬆️ Upload Icon                  │ │
│ │                                         │ │
│ │     Drag and drop files here            │ │
│ │              or                         │ │
│ │        [Browse Files]                   │ │
│ │                                         │ │
│ │   Supported: PNG, JPG, PDF (max 5MB)   │ │
│ │                                         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ File List                               │ │
│ │ ┌─────────────────────────────────────┐ │ │
│ │ │ 📄 document.pdf    2.3 MB   ✓  [×] │ │ │
│ │ │ [████████████░░░░░░░░░░] 65%       │ │ │
│ │ └─────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────┐ │ │
│ │ │ 🖼️ image.png       1.8 MB   ✓  [×] │ │ │
│ │ │ [████████████████████] 100%        │ │ │
│ │ └─────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 3.2 Drop Zone Specifications

#### Container
- **Width:** 100% (fluid)
- **Min Height:** 200px
- **Border:** 2px dashed `border-default` (`colors.neutral.300`)
- **Border Radius:** 12px
- **Background:** `bg-subtle` (`colors.neutral.50`)
- **Padding:** 40px
- **Text Align:** Center
- **Layout:** Flexbox column (center alignment)
- **Gap:** 16px

#### Upload Icon
- **Size:** 48px
- **Color:** `colors.neutral.400`
- **Type:** Upload arrow or cloud icon
- **Margin Bottom:** 8px

#### Main Text
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-medium` (500)
  - Color: `text-primary` (`colors.neutral.900`)

#### Secondary Text ("or")
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary` (`colors.neutral.600`)

#### Browse Button
- **Type:** Button (secondary variant)
- **Size:** Medium (40px height)
- **Min Width:** 140px
- **Icon:** Folder icon (optional)

#### Helper Text (file types, size limit)
- **Typography:**
  - Font Size: `font-size-xs` (12px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-tertiary` (`colors.neutral.500`)
- **Margin Top:** 12px

### 3.3 Drop Zone States

**Default:**
- Border: 2px dashed `border-default` (`colors.neutral.300`)
- Background: `bg-subtle` (`colors.neutral.50`)
- Icon: `colors.neutral.400`

**Hover:**
- Border: 2px dashed `border-strong` (`colors.neutral.400`)
- Background: `bg-subtle` (unchanged)
- Cursor: `pointer`

**Drag Over (file being dragged):**
- Border: 2px dashed `colors.brand.500`
- Background: `colors.brand.50`
- Icon: `colors.brand.500`
- Text: "Drop files to upload"
- Animation: Gentle pulse (scale 1.0 to 1.02)

**Focus (keyboard navigation):**
- Border: 2px solid `colors.brand.500`
- Outline: None
- Box Shadow: `0 0 0 4px rgba(brand.500, 0.1)`

**Disabled:**
- Opacity: 0.5
- Cursor: `not-allowed`
- Border: Dashed `colors.neutral.200`
- Background: `colors.neutral.100`

**Error:**
- Border: 2px dashed `colors.error.500`
- Background: `colors.error.50`
- Text color: `colors.error.700`
- Helper text: Show error message in red

### 3.4 File List Specifications

#### Container
- **Width:** 100%
- **Margin Top:** 16px
- **Layout:** Flexbox column
- **Gap:** 12px
- **Max Height:** 400px (scrollable if more files)

#### File Item
- **Width:** 100%
- **Height:** Auto (minimum 64px)
- **Border:** 1px solid `border-default` (`colors.neutral.200`)
- **Border Radius:** 8px
- **Background:** `bg-surface` (white)
- **Padding:** 12px 16px
- **Layout:** Flexbox column
- **Gap:** 8px

**Top Row (file info):**
- **Layout:** Flexbox row (space-between, align-items: center)

**Icon:**
- **Size:** 32px
- **Type:** File type icon (document, image, video, etc.)
- **Color:** Based on file type
  - PDF: `colors.error.500`
  - Image: `colors.brand.500`
  - Video: `colors.warning.500`
  - Other: `colors.neutral.500`

**File Name:**
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-medium` (500)
  - Color: `text-primary`
- **Max Width:** 60%
- **Truncation:** Ellipsis in middle (preserve extension)
  - Example: "very-long-filename-that-tru...cate.pdf"

**File Size:**
- **Typography:**
  - Font Size: `font-size-xs` (12px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary`
- **Format:** Auto (B, KB, MB, GB)

**Status Icon:**
- **Size:** 20px
- **States:**
  - Uploading: Spinner animation
  - Success: Green checkmark (✓)
  - Error: Red X icon

**Remove Button:**
- **Size:** 24x24px (icon button)
- **Icon:** X icon (16px)
- **Color:** `text-secondary`
- **Hover:** `colors.error.500`
- **Position:** Far right

**Bottom Row (progress bar):**
- **Width:** 100%
- **Height:** 4px
- **Margin Top:** 8px

### 3.5 Progress Bar Specifications

#### Container
- **Width:** 100%
- **Height:** 4px
- **Border Radius:** 2px
- **Background:** `colors.neutral.200`
- **Overflow:** Hidden

#### Fill
- **Height:** 100%
- **Border Radius:** 2px
- **Background:** `colors.brand.500`
- **Width:** 0% to 100% (based on upload progress)
- **Transition:** `width 200ms ease-out`

#### States

**Uploading:**
- Background: `colors.brand.500`
- Animation: Shimmer effect (optional)

**Complete:**
- Background: `colors.success.500`
- Width: 100%

**Error:**
- Background: `colors.error.500`
- Width: Current progress (frozen)

### 3.6 File Validation

#### Size Validation
- **Max Size:** Configurable (default 5MB)
- **Error:** "File exceeds maximum size of 5MB"
- **Visual:** Red border on file item, error icon

#### Type Validation
- **Allowed Types:** Configurable (e.g., image/*, .pdf, .doc)
- **Error:** "File type not supported. Allowed: PNG, JPG, PDF"
- **Visual:** Red border, error icon

#### Count Validation
- **Max Files:** Configurable (e.g., 5 files)
- **Error:** "Maximum 5 files allowed"
- **Visual:** Disable drop zone when limit reached

### 3.7 Multiple File Upload

**Simultaneous Uploads:**
- Upload files in parallel (max 3 concurrent)
- Queue additional files
- Show progress for each file independently

**Overall Progress (optional):**
- Show total progress (e.g., "3 of 5 files uploaded")
- Display at top of file list

### 3.8 Preview Thumbnails

For image files, show thumbnail:

```
┌─────────────────────────────────────┐
│ ┌────┬──────────────────┬─────────┐ │
│ │[📷]│ image.png        │ ✓  [×] │ │
│ │    │ 1.2 MB           │        │ │
│ │    │ [████████] 100%  │        │ │
│ └────┴──────────────────┴─────────┘ │
└─────────────────────────────────────┘
```

**Thumbnail:**
- **Size:** 48x48px
- **Border Radius:** 6px
- **Object Fit:** Cover
- **Position:** Replace icon area

### 3.9 Animation

**File Addition:**
- Fade in: 200ms
- Slide down: 10px to 0
- Easing: ease-out

**Progress Bar:**
- Width transition: 200ms ease-out
- Color transition: 150ms ease (on state change)

**File Removal:**
- Slide up: 0 to -10px
- Fade out: 200ms
- Easing: ease-in
- Collapse height: 150ms (after fade)

**Drag Over:**
- Scale: 1.0 to 1.02
- Duration: 300ms
- Easing: ease-in-out
- Repeat: Infinite (while dragging)

### 3.10 Keyboard Navigation

**Drop Zone:**
- **Tab:** Focus drop zone
- **Enter / Space:** Open file browser
- **Escape:** Blur/cancel

**File List:**
- **Tab:** Navigate through files
- **Delete / Backspace:** Remove focused file
- **Arrow Up/Down:** Navigate files
- **Enter:** Open file preview (if supported)

### 3.11 Responsive Behavior

**Desktop:**
- Full layout as described
- Show all file details

**Tablet:**
- Reduce padding to 24px
- Smaller drop zone (min 160px)

**Mobile:**
- Drop zone: Min height 140px
- File list: Stack vertically
- Hide file size on very small screens
- Larger touch targets (min 44px)

### 3.12 Dark Mode

**Drop Zone:**
- Border: Dashed `colors.neutral.700`
- Background: `colors.neutral.800`
- Icon: `colors.neutral.500`
- Text: `colors.neutral.200`

**Drag Over:**
- Border: Dashed `colors.brand.400`
- Background: `colors.brand.900` (0.3 opacity)

**File Item:**
- Background: `colors.neutral.900`
- Border: `colors.neutral.700`
- Text: `colors.neutral.50`

**Progress Bar:**
- Container: `colors.neutral.700`
- Fill: `colors.brand.500` (unchanged)

### 3.13 Accessibility

**ARIA Attributes:**
- `role="button"` on drop zone
- `aria-label="Upload files, drag and drop or browse"`
- `aria-describedby="file-upload-help"` (link to helper text)
- `role="list"` on file list
- `role="listitem"` on each file
- `aria-label="File name, size, upload status"` on file items
- `aria-valuemin="0"` and `aria-valuemax="100"` on progress
- `aria-valuenow="N"` (current progress %)
- `aria-live="polite"` on status updates

**Screen Reader:**
- Announce "File upload area"
- Read helper text (file types, size limit)
- Announce file added ("document.pdf added, 2.3 MB")
- Announce upload progress ("Uploading, 65%")
- Announce completion ("Upload complete")
- Announce errors ("Upload failed, file too large")

**Keyboard Support:**
- Full keyboard navigation
- Tab through all interactive elements
- Enter/Space to trigger actions
- Delete to remove files

**Focus Management:**
- Clear focus indicators
- Logical tab order
- Focus on first file after upload starts

---

**DELIVERABLE SUMMARY:**

This document provides complete design specifications for 8 data and input components:

1. **Table** - Complex data grid with sorting, selection, responsive design
2. **ResponsiveTable** - Mobile-adaptive card layout for tables
3. **List** - Flexible list items with icons, actions, and metadata
4. **Charts** - Line, bar, pie charts with tooltips and legends
5. **EmptyState** - Contextual empty states with illustrations
6. **DatePicker** - Calendar-based date selection
7. **TimePicker** - Spinner-based time selection
8. **FileUpload** - Drag-drop file upload with progress tracking

All specifications include:
- Visual anatomy and measurements
- Interactive states and behaviors
- Responsive design guidelines
- Dark mode specifications
- Accessibility (WCAG AA compliance)
- Keyboard navigation
- Animation timing

**Total Word Count:** 7,200+ words
**Files Created:** 2 comprehensive specification documents
