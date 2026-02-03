# Phase 3: Data Components - Design Specifications
**Neoloop Design System Builder**
**Date:** 2026-01-31
**Author:** @ux-design-expert
**Status:** Complete

---

## Table of Contents

1. [Table Component](#1-table-component)
2. [ResponsiveTable Component](#2-responsivetable-component)
3. [List Component](#3-list-component)
4. [Charts Component](#4-charts-component)
5. [EmptyState Component](#5-emptystate-component)
6. [DatePicker Component](#6-datepicker-component)
7. [TimePicker Component](#7-timepicker-component)
8. [FileUpload Component](#8-fileupload-component)

---

## 1. Table Component

### 1.1 Component Anatomy

```
┌─────────────────────────────────────────────────────────┐
│ Table Container                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Header Row (sticky)                                 │ │
│ │ ┌─────────┬─────────┬─────────┬─────────┬─────────┐ │ │
│ │ │ Column  │ Column  │ Column  │ Column  │ Actions │ │ │
│ │ │ Name ↑  │ Status  │ Date    │ Value   │         │ │ │
│ │ └─────────┴─────────┴─────────┴─────────┴─────────┘ │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Row 1 (default state)                               │ │
│ │ ├─────────┬─────────┬─────────┬─────────┬─────────┤ │ │
│ │ │ Data    │ Badge   │ Date    │ Number  │ [Icons] │ │ │
│ │ └─────────┴─────────┴─────────┴─────────┴─────────┘ │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Row 2 (hover state - highlighted)                   │ │
│ │ ├─────────┬─────────┬─────────┬─────────┬─────────┤ │ │
│ │ │ Data    │ Badge   │ Date    │ Number  │ [Icons] │ │ │
│ │ └─────────┴─────────┴─────────┴─────────┴─────────┘ │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Row 3 (selected state - checkmark visible)          │ │
│ │ ├─────────┬─────────┬─────────┬─────────┬─────────┤ │ │
│ │ │ ☑ Data  │ Badge   │ Date    │ Number  │ [Icons] │ │ │
│ │ └─────────┴─────────┴─────────┴─────────┴─────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Footer (pagination, info)                           │ │
│ │ Showing 1-10 of 100        [< 1 2 3 ... 10 >]      │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Visual Specifications

#### Container
- **Width:** 100% (fluid)
- **Border:** 1px solid `border-default` (`colors.neutral.200`)
- **Border Radius:** `border-radius-md` (8px)
- **Background:** `bg-surface` (`colors.neutral.0` / white)
- **Shadow:** `shadow-sm` (0 1px 3px rgba(0,0,0,0.08))
- **Overflow:** Auto (scrollable on x-axis if needed)

#### Header Row
- **Height:** 48px (fixed)
- **Background:** `bg-subtle` (`colors.neutral.50`)
- **Border Bottom:** 2px solid `border-strong` (`colors.neutral.300`)
- **Sticky:** `position: sticky; top: 0; z-index: 10;`
- **Typography:**
  - Font: `font-family-base` (Inter)
  - Size: `font-size-sm` (14px)
  - Weight: `font-weight-semibold` (600)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Transform: None (sentence case)

#### Header Cell
- **Padding:** 12px 16px
- **Alignment:** Left (text), Right (numbers)
- **Min Width:** 80px
- **Max Width:** Flexible (based on content)
- **Gap:** 8px (between text and sort icon)

#### Sort Indicator
- **Icon Size:** 16px
- **Position:** Right of text (inline)
- **States:**
  - Unsorted: Arrow up/down gray (neutral.400)
  - Ascending: Arrow up primary (brand.500)
  - Descending: Arrow down primary (brand.500)
- **Transition:** `color 150ms ease`

#### Data Row
- **Height:** 56px (minimum)
- **Padding:** 12px 16px (per cell)
- **Border Bottom:** 1px solid `border-subtle` (`colors.neutral.100`)
- **Background:** White (default)

#### Row States

**Default State:**
- Background: `bg-surface` (white)
- Text: `text-primary` (`colors.neutral.900`)
- Border: `border-subtle` (`colors.neutral.100`)

**Hover State:**
- Background: `bg-hover` (`colors.neutral.50`)
- Text: `text-primary` (unchanged)
- Border: `border-default` (`colors.neutral.200`)
- Transition: `background 150ms ease`
- Cursor: `pointer`

**Selected State:**
- Background: `bg-primary-subtle` (`colors.brand.50`)
- Text: `text-primary` (unchanged)
- Border Left: 3px solid `border-primary` (`colors.brand.500`)
- Checkbox: Visible (checked)

**Focus State (keyboard navigation):**
- Outline: 2px solid `colors.brand.500`
- Outline Offset: -2px (inside)
- Box Shadow: `0 0 0 4px rgba(brand.500, 0.1)`

**Disabled State:**
- Opacity: 0.5
- Cursor: `not-allowed`
- Pointer Events: `none`

### 1.3 Column Types

#### Text Column
- **Alignment:** Left
- **Typography:** `font-size-base` (16px), `text-primary`
- **Truncation:** Ellipsis after 1 line
- **Max Width:** 300px (default)
- **Tooltip:** Show full text on hover if truncated

#### Number Column
- **Alignment:** Right
- **Typography:** `font-family-mono` (JetBrains Mono), `font-size-base`
- **Format:** Locale-aware (1,234.56)
- **Color:** `text-primary` (positive), `text-error` (negative)

#### Date Column
- **Alignment:** Left
- **Typography:** `font-size-base`, `text-secondary`
- **Format:** MMM DD, YYYY (Jan 31, 2026)
- **Relative:** Show "Today", "Yesterday" if within 2 days

#### Badge Column
- **Alignment:** Left
- **Component:** Badge (imported)
- **Spacing:** Centered vertically in cell

#### Actions Column
- **Alignment:** Right
- **Width:** Fixed (120px)
- **Content:** Icon buttons (edit, delete, more)
- **Gap:** 8px between icons
- **Visibility:** Always visible (not hover-only for accessibility)

### 1.4 Interactive Behaviors

#### Sorting
1. Click header cell to sort ascending
2. Click again to sort descending
3. Click third time to remove sort (return to default)
4. Visual indicator (arrow icon) shows current state
5. Only one column sorted at a time (single sort)

#### Selection
1. Click checkbox in row to select/deselect
2. Click header checkbox to select all visible rows
3. Shift+Click to select range
4. Selected rows show visual feedback (background + border)

#### Row Actions
1. Hover row to see contextual actions (optional)
2. Click action icon to trigger function
3. Confirm dialog for destructive actions

#### Keyboard Navigation
- **Tab:** Move to next cell
- **Shift+Tab:** Move to previous cell
- **Arrow Up/Down:** Navigate rows
- **Arrow Left/Right:** Navigate columns
- **Enter:** Activate row action or edit mode
- **Space:** Select/deselect row

### 1.5 Responsive Behavior

**Desktop (>1024px):**
- Show all columns
- Fixed column widths
- Horizontal scroll if needed

**Tablet (768px - 1024px):**
- Hide non-essential columns
- Show priority columns only
- Horizontal scroll enabled

**Mobile (<768px):**
- Switch to card layout (see ResponsiveTable)
- OR show minimal columns (2-3 max)
- Stack data vertically

### 1.6 Sizing Variants

#### Compact (`size="compact"`)
- Row Height: 40px
- Font Size: 14px
- Padding: 8px 12px

#### Default (`size="default"`)
- Row Height: 56px
- Font Size: 16px
- Padding: 12px 16px

#### Comfortable (`size="comfortable"`)
- Row Height: 72px
- Font Size: 16px
- Padding: 16px 20px

### 1.7 Dark Mode

**Background Colors:**
- Container: `colors.neutral.900`
- Header: `colors.neutral.800`
- Row Default: `colors.neutral.900`
- Row Hover: `colors.neutral.800`
- Row Selected: `colors.brand.900` (with 0.3 opacity)

**Border Colors:**
- Default: `colors.neutral.700`
- Strong: `colors.neutral.600`

**Text Colors:**
- Primary: `colors.neutral.50`
- Secondary: `colors.neutral.400`

**Contrast Ratio:**
- Text/Background: 7:1 (AAA)
- Border/Background: 3:1 (AA)

### 1.8 Accessibility

**ARIA Attributes:**
- `role="table"` on container
- `role="rowgroup"` on thead and tbody
- `role="row"` on each row
- `role="columnheader"` on header cells
- `role="cell"` on data cells
- `aria-sort="ascending|descending|none"` on sorted column
- `aria-selected="true"` on selected rows
- `aria-label` on action buttons

**Keyboard Support:**
- Full keyboard navigation (Tab, Arrows, Enter, Space)
- Focus visible (outline)
- Skip to content link

**Screen Reader:**
- Announce column headers
- Announce row selection
- Announce sort state
- Describe actions available

---

## 2. ResponsiveTable Component

### 2.1 Component Purpose

ResponsiveTable adapts table data to small screens by switching to a card-based layout on mobile devices, maintaining data hierarchy and readability.

### 2.2 Breakpoint Strategy

**Desktop View (≥768px):**
- Standard table layout (as Table component)
- All columns visible

**Mobile View (<768px):**
- Card-based layout
- Stacked data rows
- One card per row

### 2.3 Mobile Card Layout

```
┌─────────────────────────────────────┐
│ Card Container                      │
│ ┌─────────────────────────────────┐ │
│ │ Card 1                          │ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │ Primary Info (bold, large)  │ │ │
│ │ │ John Doe                    │ │ │
│ │ ├─────────────────────────────┤ │ │
│ │ │ Label: Value                │ │ │
│ │ │ Status: Active 🟢           │ │ │
│ │ │ Date: Jan 31, 2026          │ │ │
│ │ │ Value: $1,234.56            │ │ │
│ │ ├─────────────────────────────┤ │ │
│ │ │ Actions [Edit] [Delete]     │ │ │
│ │ └─────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Card 2                          │ │
│ │ ... (same structure)            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 2.4 Card Visual Specifications

#### Card Container
- **Width:** 100%
- **Padding:** 16px
- **Background:** `bg-surface` (white)
- **Border:** 1px solid `border-default` (`colors.neutral.200`)
- **Border Radius:** 12px
- **Margin Bottom:** 16px
- **Shadow:** `shadow-sm` (0 1px 3px rgba(0,0,0,0.08))

#### Primary Info Section
- **Typography:**
  - Font Size: `font-size-lg` (18px)
  - Weight: `font-weight-semibold` (600)
  - Color: `text-primary`
- **Margin Bottom:** 12px
- **Border Bottom:** 1px solid `border-subtle`
- **Padding Bottom:** 12px

#### Data Rows (Label-Value Pairs)
- **Layout:** Flexbox (space-between)
- **Gap:** 8px vertical
- **Label:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-medium` (500)
  - Color: `text-secondary` (`colors.neutral.600`)
- **Value:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-primary`
- **Alignment:** Left (label), Right (value)

#### Actions Section
- **Padding Top:** 12px
- **Border Top:** 1px solid `border-subtle`
- **Layout:** Flexbox (flex-end)
- **Gap:** 12px
- **Buttons:** Small size (32px height)

### 2.5 Card Interaction States

**Default State:**
- Background: `bg-surface` (white)
- Border: `border-default`
- Shadow: `shadow-sm`

**Hover State:**
- Background: `bg-hover` (`colors.neutral.50`)
- Border: `border-strong` (`colors.neutral.300`)
- Shadow: `shadow-md` (0 4px 6px rgba(0,0,0,0.1))
- Transition: `all 200ms ease`

**Selected State:**
- Background: `bg-primary-subtle` (`colors.brand.50`)
- Border: 2px solid `border-primary` (`colors.brand.500`)
- Shadow: `shadow-md`

**Focus State:**
- Outline: 2px solid `colors.brand.500`
- Outline Offset: 2px
- Box Shadow: `0 0 0 4px rgba(brand.500, 0.1)`

### 2.6 Responsive Transitions

**Transition Behavior:**
- Smooth animation between table and card layout
- Fade-out table, fade-in cards (300ms ease-in-out)
- No jarring jumps or layout shifts

**Media Query:**
```css
@media (max-width: 767px) {
  .table-view { display: none; }
  .card-view { display: block; }
}

@media (min-width: 768px) {
  .table-view { display: table; }
  .card-view { display: none; }
}
```

### 2.7 Data Priority

**High Priority (Always Show):**
- Primary identifier (name, ID)
- Status or state
- Primary action

**Medium Priority (Show if space):**
- Date
- Secondary info
- Tags/categories

**Low Priority (Hide on mobile):**
- Tertiary data
- Verbose descriptions
- Non-critical metadata

### 2.8 Accessibility (Mobile)

**Touch Targets:**
- Minimum size: 44x44px (WCAG 2.5.5)
- Spacing: 8px minimum between targets

**Screen Reader:**
- Announce "Card N of M"
- Read label-value pairs sequentially
- Announce actions available

**Keyboard (if Bluetooth keyboard connected):**
- Tab through cards
- Enter to select
- Arrow keys to navigate within card

---

## 3. List Component

### 3.1 Component Anatomy

```
┌─────────────────────────────────────────────┐
│ List Container                              │
│ ┌─────────────────────────────────────────┐ │
│ │ List Item 1 (default)                   │ │
│ │ ┌────┬──────────────────────┬─────────┐ │ │
│ │ │Icon│ Content              │ Actions │ │ │
│ │ │ 📄 │ Title                │ [Edit]  │ │ │
│ │ │    │ Description...       │ [Del]   │ │ │
│ │ └────┴──────────────────────┴─────────┘ │ │
│ ├─────────────────────────────────────────┤ │
│ │ List Item 2 (hover - highlighted)       │ │
│ │ ┌────┬──────────────────────┬─────────┐ │ │
│ │ │ 📁 │ Title                │ [Edit]  │ │ │
│ │ │    │ Description...       │ [Del]   │ │ │
│ │ └────┴──────────────────────┴─────────┘ │ │
│ ├─────────────────────────────────────────┤ │
│ │ List Item 3 (selected)                  │ │
│ │ ┌────┬──────────────────────┬─────────┐ │ │
│ │ │☑ 🎨│ Title                │ [Edit]  │ │ │
│ │ │    │ Description...       │ [Del]   │ │ │
│ │ └────┴──────────────────────┴─────────┘ │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 3.2 Visual Specifications

#### List Container
- **Width:** 100% (fluid)
- **Background:** Transparent
- **Spacing:** 0px between items (dividers create visual separation)

#### List Item
- **Height:** Auto (minimum 64px)
- **Padding:** 16px
- **Background:** `bg-surface` (white)
- **Border Bottom:** 1px solid `border-subtle` (`colors.neutral.100`)
- **Layout:** Flexbox (align-items: center)
- **Gap:** 16px

#### Icon Section
- **Width:** 40px (fixed)
- **Height:** 40px (fixed)
- **Flex:** 0 0 40px (no grow/shrink)
- **Alignment:** Center (both axes)
- **Background:** `bg-subtle` (`colors.neutral.100`)
- **Border Radius:** 8px
- **Icon Size:** 20px
- **Icon Color:** `text-secondary` (`colors.neutral.600`)

#### Content Section
- **Flex:** 1 (grow to fill)
- **Min Width:** 0 (allow truncation)
- **Layout:** Flexbox column
- **Gap:** 4px

**Title:**
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-medium` (500)
  - Color: `text-primary` (`colors.neutral.900`)
- **Truncation:** Ellipsis after 1 line
- **Max Width:** 100%

**Description:**
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Line Height: 1.5
- **Truncation:** Ellipsis after 2 lines
- **Max Width:** 100%

**Metadata (optional):**
- **Typography:**
  - Font Size: `font-size-xs` (12px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-tertiary` (`colors.neutral.500`)
- **Layout:** Flexbox row
- **Gap:** 8px
- **Separator:** "•" between items

#### Actions Section
- **Flex:** 0 0 auto (no grow/shrink)
- **Layout:** Flexbox row
- **Gap:** 8px
- **Alignment:** Center
- **Button Size:** Small (32px)

### 3.3 Item States

**Default State:**
- Background: `bg-surface` (white)
- Border: `border-subtle` (`colors.neutral.100`)

**Hover State:**
- Background: `bg-hover` (`colors.neutral.50`)
- Border: `border-default` (`colors.neutral.200`)
- Cursor: `pointer`
- Transition: `background 150ms ease`

**Selected State:**
- Background: `bg-primary-subtle` (`colors.brand.50`)
- Border Left: 3px solid `border-primary` (`colors.brand.500`)
- Checkbox: Visible (checked) in icon area

**Focus State:**
- Outline: 2px solid `colors.brand.500`
- Outline Offset: -2px
- Box Shadow: `0 0 0 4px rgba(brand.500, 0.1)`

**Disabled State:**
- Opacity: 0.5
- Cursor: `not-allowed`
- Pointer Events: `none`

### 3.4 List Variants

#### Simple List
- No icon
- No actions
- Just title (no description)
- Minimum height: 48px
- Padding: 12px 16px

#### Rich List (default)
- Icon + title + description
- Actions on right
- Metadata row
- Minimum height: 64px

#### Compact List
- Icon + title only
- Smaller padding (8px 12px)
- Minimum height: 40px
- Font size: 14px

### 3.5 List Spacing

**Between Items:**
- No margin (divider creates separation)
- Last item: No border bottom

**Within Item:**
- Icon to Content: 16px
- Content to Actions: 16px
- Title to Description: 4px
- Description to Metadata: 8px

### 3.6 Interactive Behaviors

#### Selection
- Click anywhere on item to select
- Checkbox appears in icon area when selected
- Multiple selection supported (Cmd/Ctrl+Click)
- Range selection (Shift+Click)

#### Actions
- Hover to show actions (optional)
- Click action button to trigger
- Confirm dialog for destructive actions

#### Drag and Drop (optional)
- Drag handle appears on hover (left side)
- Visual feedback during drag (opacity 0.5)
- Drop indicator (blue line) shows target position

### 3.7 Empty State

When list has no items:

```
┌─────────────────────────────────────┐
│                                     │
│          [Empty Icon]               │
│       No items to display           │
│    Add your first item to get      │
│             started                 │
│                                     │
│        [+ Add Item Button]          │
│                                     │
└─────────────────────────────────────┘
```

- **Padding:** 48px vertical
- **Icon:** 48px, `colors.neutral.300`
- **Title:** `font-size-lg`, `text-secondary`
- **Description:** `font-size-base`, `text-tertiary`
- **Button:** Primary variant

### 3.8 Dark Mode

**Background:**
- Container: Transparent
- Item Default: `colors.neutral.900`
- Item Hover: `colors.neutral.800`
- Item Selected: `colors.brand.900` (0.3 opacity)

**Text:**
- Primary: `colors.neutral.50`
- Secondary: `colors.neutral.400`
- Tertiary: `colors.neutral.500`

**Borders:**
- Subtle: `colors.neutral.800`
- Default: `colors.neutral.700`

### 3.9 Accessibility

**ARIA Attributes:**
- `role="list"` on container
- `role="listitem"` on each item
- `aria-selected="true"` on selected items
- `aria-label` on action buttons

**Keyboard Support:**
- Arrow Up/Down: Navigate items
- Space: Select/deselect
- Enter: Activate primary action
- Tab: Move to actions

**Screen Reader:**
- Announce "List with N items"
- Read title, description, metadata
- Announce selection state
- Describe available actions

---

## 4. Charts Component

### 4.1 Component Types

1. **Line Chart** - Trend over time
2. **Bar Chart** - Comparison of categories
3. **Pie Chart** - Part-to-whole relationships
4. **Area Chart** - Cumulative trends
5. **Scatter Plot** - Correlation analysis (future)

### 4.2 Common Chart Anatomy

```
┌─────────────────────────────────────────────────────┐
│ Chart Container                                     │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Title & Controls                                │ │
│ │ Revenue Trend            [Day][Week][Month]  ⚙️ │ │
│ ├─────────────────────────────────────────────────┤ │
│ │ Chart Canvas                                    │ │
│ │ ↑                                               │ │
│ │ │     ╱─────╲                                   │ │
│ │ │    ╱       ╲     ╱╲                          │ │
│ │ │   ╱         ╲   ╱  ╲                         │ │
│ │ │  ╱           ╲ ╱    ╲                        │ │
│ │ └──────────────────────────────────────────→   │ │
│ │  Jan   Feb   Mar   Apr   May   Jun             │ │
│ ├─────────────────────────────────────────────────┤ │
│ │ Legend                                          │ │
│ │ ● Series 1    ● Series 2    ● Series 3        │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### 4.3 Visual Specifications

#### Chart Container
- **Width:** 100% (responsive)
- **Aspect Ratio:** 16:9 (default), configurable
- **Min Height:** 300px
- **Background:** `bg-surface` (white)
- **Border:** 1px solid `border-default` (`colors.neutral.200`)
- **Border Radius:** 12px
- **Padding:** 24px
- **Shadow:** `shadow-sm`

#### Title Section
- **Height:** 48px
- **Margin Bottom:** 16px
- **Layout:** Flexbox (space-between)

**Title:**
- **Typography:**
  - Font Size: `font-size-lg` (18px)
  - Weight: `font-weight-semibold` (600)
  - Color: `text-primary`

**Controls:**
- **Layout:** Flexbox row
- **Gap:** 8px
- **Button Size:** Small (32px)

#### Canvas Area
- **Width:** 100%
- **Height:** Calculated (aspect ratio)
- **Padding:** 16px (for axes labels)
- **Background:** Transparent

#### Axes

**X-Axis (Horizontal):**
- **Position:** Bottom
- **Height:** 32px
- **Line:** 1px solid `border-subtle` (`colors.neutral.200`)
- **Labels:**
  - Font Size: `font-size-sm` (14px)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Rotation: 0deg (horizontal), -45deg (if overlap)

**Y-Axis (Vertical):**
- **Position:** Left
- **Width:** 48px
- **Line:** 1px solid `border-subtle` (`colors.neutral.200`)
- **Labels:**
  - Font Size: `font-size-sm` (14px)
  - Color: `text-secondary`
  - Format: Abbreviated (1K, 1M, 1B)

**Grid Lines:**
- **Color:** `border-subtle` (`colors.neutral.100`)
- **Width:** 1px
- **Style:** Dashed (4px dash, 4px gap)
- **Opacity:** 0.5
- **Frequency:** 5-7 lines per axis

### 4.4 Chart Color Palette

**Default Palette (8 colors):**
1. `colors.brand.500` (Primary blue)
2. `colors.success.500` (Green)
3. `colors.warning.500` (Orange)
4. `colors.error.500` (Red)
5. `colors.info.500` (Cyan)
6. `colors.neutral.500` (Gray)
7. `colors.brand.300` (Light blue)
8. `colors.success.300` (Light green)

**Accessibility:**
- Contrast ratio: ≥ 3:1 against background
- Use patterns/textures for color-blind users
- Include legend always (don't rely on color alone)

### 4.5 Legend Specifications

#### Horizontal Legend (default)
- **Position:** Bottom center
- **Margin Top:** 16px
- **Layout:** Flexbox row wrap
- **Gap:** 16px horizontal, 8px vertical
- **Alignment:** Center

**Legend Item:**
- **Layout:** Flexbox row
- **Gap:** 8px
- **Alignment:** Center

**Indicator:**
- **Size:** 12x12px
- **Shape:** Circle (default), Square (optional)
- **Color:** Series color
- **Border:** 1px solid white (for contrast)

**Label:**
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary`
- **Max Width:** 150px
- **Truncation:** Ellipsis

#### Vertical Legend
- **Position:** Right side
- **Width:** 150px
- **Layout:** Flexbox column
- **Gap:** 12px
- **Alignment:** Flex-start

### 4.6 Tooltip Styling

```
┌─────────────────────────┐
│ Mar 15, 2026            │
├─────────────────────────┤
│ ● Revenue: $12,345      │
│ ● Expenses: $8,901      │
│ ● Profit: $3,444        │
└─────────────────────────┘
```

#### Tooltip Container
- **Background:** `colors.neutral.900` (0.95 opacity)
- **Border:** None
- **Border Radius:** 8px
- **Padding:** 12px
- **Shadow:** `shadow-lg` (0 8px 16px rgba(0,0,0,0.2))
- **Max Width:** 250px
- **Min Width:** 150px

#### Tooltip Content
**Date/Category:**
- **Font Size:** `font-size-sm` (14px)
- **Weight:** `font-weight-semibold` (600)
- **Color:** White
- **Margin Bottom:** 8px
- **Border Bottom:** 1px solid `colors.neutral.700`
- **Padding Bottom:** 8px

**Data Rows:**
- **Layout:** Flexbox column
- **Gap:** 4px

**Each Row:**
- **Layout:** Flexbox row (space-between)
- **Indicator:** 8x8px circle (series color)
- **Label:** `font-size-sm`, white, weight 400
- **Value:** `font-size-sm`, white, weight 600

#### Tooltip Positioning
- **Default:** Top center (above cursor)
- **Fallback:** Bottom center (if top overflow)
- **Offset:** 12px from cursor
- **Arrow:** 6px triangle pointing to data point

### 4.7 Interactive Behaviors

#### Hover State
- **Data Point:** Enlarge by 20% (scale 1.2)
- **Line Segment:** Increase stroke width by 2px
- **Bar:** Increase opacity to 1.0 (from 0.9)
- **Tooltip:** Show with 150ms delay

#### Click State
- **Data Point:** Lock tooltip (persistent)
- **Legend Item:** Toggle series visibility
- **Series:** Fade to 0.3 opacity when hidden

#### Animation on Load
- **Duration:** 800ms
- **Easing:** ease-out
- **Line:** Draw from left to right
- **Bar:** Grow from bottom to top
- **Pie:** Rotate from 0deg to final angle

### 4.8 Responsive Behavior

**Desktop (>1024px):**
- Full size chart
- All labels visible
- Horizontal legend

**Tablet (768px - 1024px):**
- Reduce padding to 16px
- Abbreviate axis labels
- Horizontal legend

**Mobile (<768px):**
- Stack vertically
- Hide minor grid lines
- Vertical legend
- Rotate x-axis labels -45deg
- Reduce data point size by 30%

### 4.9 Accessibility

**ARIA Attributes:**
- `role="img"` on SVG
- `aria-label="Chart title and description"`
- `aria-describedby="chart-data-table"` (link to data table)

**Data Table:**
- Provide hidden data table for screen readers
- Announce "N series with M data points"
- Navigate table with keyboard

**Keyboard Support:**
- Tab: Move to chart
- Arrow keys: Navigate data points
- Enter: Show/lock tooltip
- Space: Toggle series visibility

**Screen Reader:**
- Announce chart type
- Read title and description
- Provide data summary
- Announce trend (increasing, decreasing, stable)

### 4.10 Dark Mode

**Background:**
- Container: `colors.neutral.900`
- Canvas: Transparent

**Axes & Grid:**
- Line: `colors.neutral.700`
- Grid: `colors.neutral.800`
- Labels: `colors.neutral.400`

**Tooltip:**
- Background: `colors.neutral.800` (0.95 opacity)
- Border: 1px solid `colors.neutral.600`
- Text: `colors.neutral.50`

**Chart Colors:**
- Adjust all colors for dark background
- Maintain contrast ratio ≥ 3:1

---

## 5. EmptyState Component

### 5.1 Component Anatomy

```
┌─────────────────────────────────────┐
│ Empty State Container               │
│                                     │
│          ┌─────────────┐            │
│          │             │            │
│          │   [Image]   │            │
│          │             │            │
│          └─────────────┘            │
│                                     │
│      No Data Available              │
│                                     │
│   We couldn't find any items.       │
│   Try adjusting your filters or     │
│   creating a new item.              │
│                                     │
│     [Primary Action Button]         │
│      [Secondary Action Link]        │
│                                     │
└─────────────────────────────────────┘
```

### 5.2 Visual Specifications

#### Container
- **Width:** 100% (max-width: 480px)
- **Padding:** 48px 32px
- **Margin:** 0 auto (centered)
- **Text Align:** Center
- **Background:** Transparent (or `bg-subtle` for emphasis)
- **Border Radius:** 12px (if background)

#### Image/Illustration
- **Size:** 120x120px to 200x200px
- **Margin Bottom:** 24px
- **Type:** SVG illustration or icon
- **Style:** Two-tone (primary + neutral)
- **Colors:**
  - Primary: `colors.brand.200` (light)
  - Secondary: `colors.neutral.300`
- **Opacity:** 0.8 (subtle, not dominating)

#### Title
- **Typography:**
  - Font Size: `font-size-xl` (20px)
  - Weight: `font-weight-semibold` (600)
  - Color: `text-primary` (`colors.neutral.900`)
  - Line Height: 1.3
- **Margin Bottom:** 12px

#### Description
- **Typography:**
  - Font Size: `font-size-base` (16px)
  - Weight: `font-weight-normal` (400)
  - Color: `text-secondary` (`colors.neutral.600`)
  - Line Height: 1.5
- **Max Width:** 400px
- **Margin:** 0 auto 24px auto

#### Primary Action
- **Type:** Button (primary variant)
- **Size:** Medium (40px height)
- **Min Width:** 160px
- **Margin Bottom:** 12px

#### Secondary Action
- **Type:** Link
- **Typography:**
  - Font Size: `font-size-sm` (14px)
  - Weight: `font-weight-medium` (500)
  - Color: `colors.brand.500`
  - Text Decoration: None (underline on hover)
- **Margin Bottom:** 0

### 5.3 Empty State Variants

#### No Data (Default)
- **Icon:** Document or inbox icon
- **Title:** "No [items] yet"
- **Description:** "Create your first [item] to get started"
- **Action:** "Create [Item]" button

#### No Results (Search/Filter)
- **Icon:** Magnifying glass with X
- **Title:** "No results found"
- **Description:** "Try adjusting your search or filters"
- **Actions:**
  - "Clear Filters" button
  - "Reset Search" link

#### No Access (Permission)
- **Icon:** Lock or shield icon
- **Title:** "Access Restricted"
- **Description:** "You don't have permission to view this content"
- **Action:** "Request Access" button

#### Error State
- **Icon:** Alert triangle
- **Title:** "Something went wrong"
- **Description:** "We couldn't load this content. Please try again."
- **Actions:**
  - "Try Again" button
  - "Go Back" link

#### Coming Soon
- **Icon:** Clock or calendar
- **Title:** "Coming Soon"
- **Description:** "This feature is under development"
- **Action:** "Notify Me" button

### 5.4 Illustration Guidelines

**Style:**
- Line art with minimal fills
- Two-color palette (brand + neutral)
- Rounded corners and friendly shapes
- Avoid complex details

**Subject Matter:**
- Empty box/container
- Document with magnifying glass (search)
- Person with question mark (help)
- Rocket or construction (coming soon)
- Lock or shield (permission)

**Size Recommendations:**
- Small: 80x80px (inline empty state)
- Medium: 120x120px (card empty state)
- Large: 200x200px (full page empty state)

### 5.5 Contextual Usage

#### In Tables
- Show when table has no rows
- Reduce padding to 32px
- Smaller image (80px)
- Compact text

#### In Cards
- Show when card content is empty
- Center within card
- Scale to card size
- Medium image (120px)

#### Full Page
- Show when entire view is empty
- Maximum size (200px image)
- Full padding (48px)
- Multiple action options

### 5.6 Animation

**On Load:**
- Fade in: 300ms ease-out
- Image scale: from 0.8 to 1.0 (400ms ease-out)
- Stagger text: Title → Description → Actions (100ms delay each)

**On Interaction:**
- Button hover: Standard button hover state
- Link hover: Underline with slide animation

### 5.7 Dark Mode

**Background:**
- Container: `colors.neutral.800` (if using background)
- Transparent otherwise

**Image:**
- Primary color: `colors.brand.400`
- Secondary color: `colors.neutral.600`

**Text:**
- Title: `colors.neutral.50`
- Description: `colors.neutral.400`

**Actions:**
- Button: Standard dark mode button
- Link: `colors.brand.400`

### 5.8 Accessibility

**Semantic HTML:**
- Wrap in `<section>` with `aria-label="Empty state"`
- Image with `alt` text describing illustration
- Heading (`<h3>`) for title

**Screen Reader:**
- Announce "No content available"
- Read title and description
- Announce actions available

**Keyboard:**
- Tab to primary action
- Enter to activate
- Focus visible on button/link

---

*Continued in next response...*
