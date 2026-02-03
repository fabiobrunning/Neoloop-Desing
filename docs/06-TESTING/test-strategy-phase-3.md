# Test Strategy - Phase 3: Data & Feedback Components

**Document Version:** 1.0.0
**Date:** 2026-01-31
**Project:** Neoloop Design System Builder
**Author:** QA Agent (Astrid)
**Status:** Active
**Target:** 1.270+ test cases

---

## Executive Summary

Phase 3 expands test coverage to include 17 complex components across Data Display and Feedback categories. This phase focuses on advanced interactions, performance testing for large datasets, and comprehensive accessibility coverage for dynamic UI patterns.

### Scope: 17 Components

**Data Components (7):**
- Table (complex sorting, pagination, selection)
- ResponsiveTable (viewport adaptability)
- List (rendering patterns, infinite scroll)
- Charts (4 types: Line, Bar, Pie, Area)
- EmptyState (placeholder patterns)
- DatePicker (calendar interactions)
- TimePicker (time selection)
- FileUpload (drag-drop, validation)

**Feedback Components (10):**
- Toast (notifications, auto-dismiss)
- Alert (persistent messages)
- ConfirmDialog (modal confirmations)
- States: Hover, Focus, Disabled, Loading, Success, Error, Warning

### Success Metrics

| Metric | Target | Components | Priority |
|--------|--------|------------|----------|
| **Total Test Cases** | 1.270+ | All 17 | Critical |
| **Data Component Tests** | 800+ | 7 components | High |
| **Feedback Tests** | 200+ | 10 components | High |
| **Integration Tests** | 150+ | Cross-component | High |
| **Accessibility Tests** | 100+ | WCAG AA | Critical |
| **Performance Tests** | 20+ | Table, Charts | High |
| **Coverage** | 100% | Lines/Functions | Critical |

---

## 1. Data Components Testing (800+ cases)

### 1.1 Table Component (250 Test Cases)

#### Core Rendering Tests (20 cases)

```typescript
describe('Table Core Rendering', () => {
  test('renders empty table with headers', () => {});
  test('renders table with data rows', () => {});
  test('renders column headers correctly', () => {});
  test('applies column alignment (left/center/right)', () => {});
  test('renders with fixed layout', () => {});
  test('renders with auto layout', () => {});
  test('applies striped row styling', () => {});
  test('applies hover row styling', () => {});
  test('renders with compact size', () => {});
  test('renders with comfortable size', () => {});
  test('renders with spacious size', () => {});
  test('shows loading skeleton', () => {});
  test('renders sticky header', () => {});
  test('renders sticky first column', () => {});
  test('renders sticky last column', () => {});
  test('handles empty data array', () => {});
  test('handles undefined data', () => {});
  test('renders custom cell components', () => {});
  test('renders with border variants', () => {});
  test('applies custom className', () => {});
});
```

#### Sorting Tests (40 cases)

```typescript
describe('Table Sorting', () => {
  // Basic sorting
  test('sorts string column ascending', () => {});
  test('sorts string column descending', () => {});
  test('sorts number column ascending', () => {});
  test('sorts number column descending', () => {});
  test('sorts date column ascending', () => {});
  test('sorts date column descending', () => {});
  test('sorts boolean column', () => {});
  test('handles null values in sort', () => {});
  test('handles undefined values in sort', () => {});

  // Multi-column sorting
  test('sorts by primary column', () => {});
  test('sorts by secondary column when primary equal', () => {});
  test('sorts by tertiary column', () => {});
  test('clears sort on third click', () => {});
  test('updates sort indicator icons', () => {});
  test('maintains sort on data update', () => {});

  // Custom sorting
  test('uses custom sort comparator', () => {});
  test('sorts case-insensitive by default', () => {});
  test('sorts case-sensitive when configured', () => {});
  test('sorts with locale awareness', () => {});
  test('sorts with numeric awareness', () => {});

  // Edge cases
  test('sorts with special characters', () => {});
  test('sorts with emojis', () => {});
  test('sorts with mixed types gracefully', () => {});
  test('sorts very large numbers', () => {});
  test('sorts negative numbers', () => {});
  test('sorts decimals', () => {});
  test('sorts scientific notation', () => {});
  test('sorts dates in various formats', () => {});
  test('sorts ISO date strings', () => {});
  test('sorts timestamps', () => {});

  // Performance
  test('sorts 1000 rows under 100ms', () => {});
  test('sorts 10000 rows under 500ms', () => {});
  test('does not re-sort when switching pages', () => {});
  test('maintains scroll position after sort', () => {});
  test('debounces rapid sort clicks', () => {});

  // Accessibility
  test('announces sort state to screen reader', () => {});
  test('keyboard navigation for sort headers', () => {});
  test('Enter key triggers sort', () => {});
  test('Space key triggers sort', () => {});
  test('has aria-sort attribute', () => {});
});
```

#### Pagination Tests (35 cases)

```typescript
describe('Table Pagination', () => {
  // Basic pagination
  test('renders pagination controls', () => {});
  test('shows correct page numbers', () => {});
  test('displays total count', () => {});
  test('shows items per page', () => {});
  test('navigates to next page', () => {});
  test('navigates to previous page', () => {});
  test('jumps to first page', () => {});
  test('jumps to last page', () => {});
  test('jumps to specific page', () => {});
  test('disables previous on first page', () => {});
  test('disables next on last page', () => {});

  // Page size selection
  test('changes page size to 10', () => {});
  test('changes page size to 25', () => {});
  test('changes page size to 50', () => {});
  test('changes page size to 100', () => {});
  test('resets to page 1 on size change', () => {});
  test('maintains current selection on size change', () => {});

  // Edge cases
  test('handles single page of data', () => {});
  test('handles empty data', () => {});
  test('handles exactly one page of data', () => {});
  test('handles odd number of items', () => {});
  test('updates on data length change', () => {});

  // Server-side pagination
  test('calls onPageChange with correct params', () => {});
  test('shows loading state during fetch', () => {});
  test('handles pagination errors', () => {});
  test('retries failed page load', () => {});

  // Keyboard navigation
  test('left arrow goes to previous page', () => {});
  test('right arrow goes to next page', () => {});
  test('home key goes to first page', () => {});
  test('end key goes to last page', () => {});

  // Accessibility
  test('has navigation landmark', () => {});
  test('announces current page', () => {});
  test('has aria-label for pagination', () => {});
  test('page buttons have aria-current', () => {});
  test('no axe violations in pagination', () => {});
});
```

#### Selection Tests (45 cases)

```typescript
describe('Table Selection', () => {
  // Single selection
  test('selects row on click', () => {});
  test('deselects row on second click', () => {});
  test('shows selected row styling', () => {});
  test('calls onSelectionChange callback', () => {});
  test('clears previous selection', () => {});

  // Multiple selection
  test('selects multiple rows with Ctrl+Click', () => {});
  test('selects multiple rows with Cmd+Click', () => {});
  test('selects range with Shift+Click', () => {});
  test('selects all with header checkbox', () => {});
  test('deselects all with header checkbox', () => {});
  test('shows indeterminate state when partial', () => {});
  test('maintains selection across pages', () => {});
  test('clears selection on data change', () => {});
  test('preserves selection on sort', () => {});

  // Checkbox column
  test('renders checkbox column', () => {});
  test('checkbox column is first', () => {});
  test('checkbox column not sortable', () => {});
  test('checkbox has correct aria-label', () => {});

  // Selection modes
  test('single selection mode works', () => {});
  test('multiple selection mode works', () => {});
  test('disabled selection mode works', () => {});
  test('selection disabled for specific rows', () => {});

  // Keyboard selection
  test('Space selects focused row', () => {});
  test('Ctrl+A selects all', () => {});
  test('Cmd+A selects all on Mac', () => {});
  test('Escape clears selection', () => {});
  test('up/down arrows move focus', () => {});
  test('Shift+Arrow extends selection', () => {});

  // Selection actions
  test('shows bulk actions toolbar', () => {});
  test('displays selected count', () => {});
  test('clears selection button works', () => {});
  test('bulk delete works', () => {});
  test('bulk edit works', () => {});
  test('bulk export works', () => {});

  // Edge cases
  test('handles selecting disabled rows', () => {});
  test('handles max selection limit', () => {});
  test('selection persists across filter', () => {});
  test('selection cleared on search', () => {});

  // Performance
  test('selects 1000 rows efficiently', () => {});
  test('selection state updates < 16ms', () => {});

  // Accessibility
  test('selected rows have aria-selected', () => {});
  test('selection announced to screen reader', () => {});
  test('bulk actions keyboard accessible', () => {});
  test('no axe violations in selection', () => {});
});
```

#### Column Management Tests (30 cases)

```typescript
describe('Table Column Management', () => {
  // Resizing
  test('shows resize handle on hover', () => {});
  test('resizes column on drag', () => {});
  test('snaps to minimum width', () => {});
  test('snaps to maximum width', () => {});
  test('double-click auto-sizes column', () => {});
  test('maintains proportions on table resize', () => {});
  test('saves column widths to localStorage', () => {});
  test('restores saved column widths', () => {});

  // Reordering
  test('shows drag indicator on column', () => {});
  test('reorders column on drag', () => {});
  test('prevents reordering frozen columns', () => {});
  test('updates column order in state', () => {});
  test('saves column order', () => {});

  // Visibility
  test('shows column visibility menu', () => {});
  test('toggles column visibility', () => {});
  test('hides column', () => {});
  test('shows hidden column', () => {});
  test('prevents hiding last visible column', () => {});
  test('saves visibility preferences', () => {});

  // Pinning
  test('pins column to left', () => {});
  test('pins column to right', () => {});
  test('unpins column', () => {});
  test('multiple pinned columns work', () => {});

  // Column menu
  test('opens column menu on click', () => {});
  test('closes on outside click', () => {});
  test('sort options in menu', () => {});
  test('filter options in menu', () => {});
  test('column settings in menu', () => {});

  // Accessibility
  test('resize handle keyboard accessible', () => {});
  test('column menu keyboard accessible', () => {});
});
```

#### Filtering Tests (40 cases)

```typescript
describe('Table Filtering', () => {
  // Text filtering
  test('filters by text match', () => {});
  test('filters case-insensitive', () => {});
  test('filters with partial match', () => {});
  test('filters with exact match', () => {});
  test('filters with starts with', () => {});
  test('filters with ends with', () => {});
  test('filters with contains', () => {});
  test('filters with regex', () => {});

  // Number filtering
  test('filters equals', () => {});
  test('filters not equals', () => {});
  test('filters greater than', () => {});
  test('filters less than', () => {});
  test('filters between range', () => {});
  test('filters in list', () => {});
  test('filters not in list', () => {});

  // Date filtering
  test('filters by date equals', () => {});
  test('filters by date before', () => {});
  test('filters by date after', () => {});
  test('filters by date range', () => {});
  test('filters by relative dates (today, week, month)', () => {});

  // Boolean filtering
  test('filters true values', () => {});
  test('filters false values', () => {});

  // Multi-column filtering
  test('combines multiple filters with AND', () => {});
  test('combines multiple filters with OR', () => {});
  test('clears individual filter', () => {});
  test('clears all filters', () => {});

  // Filter UI
  test('shows filter row', () => {});
  test('shows filter count badge', () => {});
  test('filter inputs have correct types', () => {});
  test('filter dropdowns work', () => {});
  test('date picker in filter', () => {});

  // Performance
  test('filters 1000 rows under 50ms', () => {});
  test('debounces filter input', () => {});
  test('updates pagination on filter', () => {});

  // Edge cases
  test('handles null values in filter', () => {});
  test('handles undefined values in filter', () => {});
  test('handles empty string filter', () => {});

  // Accessibility
  test('filter inputs have labels', () => {});
  test('clear filter button accessible', () => {});
  test('no axe violations in filters', () => {});
});
```

#### Performance Tests (20 cases)

```typescript
describe('Table Performance', () => {
  test('renders 100 rows under 100ms', () => {});
  test('renders 1000 rows under 500ms', () => {});
  test('renders 10000 rows with virtualization', () => {});
  test('scrolls smoothly with 1000+ rows', () => {});
  test('updates single cell efficiently', () => {});
  test('sorts 1000 rows under 100ms', () => {});
  test('filters 1000 rows under 50ms', () => {});
  test('selects 1000 rows under 100ms', () => {});
  test('does not re-render unchanged rows', () => {});
  test('memoizes column definitions', () => {});
  test('memoizes cell renderers', () => {});
  test('uses virtualization for large datasets', () => {});
  test('lazy loads data on scroll', () => {});
  test('handles 100 columns without lag', () => {});
  test('resizes columns without jank', () => {});
  test('maintains 60fps during scroll', () => {});
  test('no memory leaks on unmount', () => {});
  test('cleans up event listeners', () => {});
  test('debounces expensive operations', () => {});
  test('uses requestAnimationFrame for animations', () => {});
});

// Accessibility Tests (30 cases)
describe('Table Accessibility', () => {
  test('has role="table"', () => {});
  test('headers have role="columnheader"', () => {});
  test('rows have role="row"', () => {});
  test('cells have role="cell"', () => {});
  test('has aria-label or aria-labelledby', () => {});
  test('has aria-describedby for caption', () => {});
  test('sortable columns have aria-sort', () => {});
  test('selected rows have aria-selected', () => {});
  test('announces sort changes', () => {});
  test('announces filter changes', () => {});
  test('announces page changes', () => {});
  test('keyboard navigation with arrows', () => {});
  test('Tab moves through interactive cells', () => {});
  test('Enter activates links/buttons', () => {});
  test('Space selects rows', () => {});
  test('Home/End navigation', () => {});
  test('Page Up/Down navigation', () => {});
  test('Ctrl+Home to first cell', () => {});
  test('Ctrl+End to last cell', () => {});
  test('focus visible on all interactive elements', () => {});
  test('skip navigation link provided', () => {});
  test('screen reader announces row count', () => {});
  test('screen reader announces column count', () => {});
  test('screen reader announces current position', () => {});
  test('live region for updates', () => {});
  test('loading state announced', () => {});
  test('error state announced', () => {});
  test('empty state announced', () => {});
  test('no axe violations', () => {});
  test('color contrast meets WCAG AA', () => {});
});
```

**Table Total: 250 test cases**

---

### 1.2 ResponsiveTable Component (80 Test Cases)

#### Viewport Adaptation Tests (25 cases)

```typescript
describe('ResponsiveTable Viewports', () => {
  test('renders as table on desktop (>1024px)', () => {});
  test('renders as cards on tablet (768-1023px)', () => {});
  test('renders as list on mobile (<768px)', () => {});
  test('switches layout on resize', () => {});
  test('maintains data on layout switch', () => {});
  test('preserves selection on layout switch', () => {});
  test('preserves sort on layout switch', () => {});
  test('adjusts columns on desktop', () => {});
  test('shows priority columns on tablet', () => {});
  test('shows essential columns on mobile', () => {});
  test('hides low-priority columns on small screens', () => {});
  test('shows column picker on mobile', () => {});
  test('expands card details on mobile', () => {});
  test('collapses card details on mobile', () => {});
  test('touch-friendly on mobile', () => {});
  test('swipe gestures on mobile', () => {});
  test('pinch-to-zoom disabled on table', () => {});
  test('horizontal scroll on mobile table', () => {});
  test('vertical scroll works on all viewports', () => {});
  test('responsive images in cells', () => {});
  test('responsive text sizing', () => {});
  test('mobile-optimized spacing', () => {});
  test('tablet-optimized spacing', () => {});
  test('handles orientation change', () => {});
  test('no layout shift on resize', () => {});
});
```

#### Mobile Card View Tests (20 cases)

```typescript
describe('ResponsiveTable Mobile Cards', () => {
  test('renders data as cards', () => {});
  test('shows primary data prominently', () => {});
  test('shows secondary data in details', () => {});
  test('expandable details section', () => {});
  test('tappable card area', () => {});
  test('swipe to delete', () => {});
  test('swipe to edit', () => {});
  test('card selection works', () => {});
  test('card sorting works', () => {});
  test('card filtering works', () => {});
  test('card pagination works', () => {});
  test('shows card actions', () => {});
  test('card images render', () => {});
  test('card badges render', () => {});
  test('card layout variants', () => {});
  test('card spacing correct', () => {});
  test('card shadows correct', () => {});
  test('card hover effects', () => {});
  test('card press effects', () => {});
  test('card accessibility', () => {});
});
```

#### Tablet View Tests (15 cases)

```typescript
describe('ResponsiveTable Tablet View', () => {
  test('shows hybrid table-card layout', () => {});
  test('groups columns logically', () => {});
  test('shows essential columns', () => {});
  test('hides non-essential columns', () => {});
  test('expandable rows work', () => {});
  test('column picker accessible', () => {});
  test('touch-optimized controls', () => {});
  test('tablet-specific breakpoint', () => {});
  test('landscape mode optimization', () => {});
  test('portrait mode optimization', () => {});
  test('maintains functionality', () => {});
  test('selection works', () => {});
  test('sorting works', () => {});
  test('filtering works', () => {});
  test('pagination works', () => {});
});
```

#### Touch Interactions Tests (20 cases)

```typescript
describe('ResponsiveTable Touch', () => {
  test('tap to select row', () => {});
  test('long press for context menu', () => {});
  test('swipe to reveal actions', () => {});
  test('swipe to delete', () => {});
  test('swipe to archive', () => {});
  test('pull to refresh', () => {});
  test('pinch to zoom (if enabled)', () => {});
  test('double tap to expand', () => {});
  test('touch drag to reorder', () => {});
  test('touch drag to resize (tablet)', () => {});
  test('momentum scrolling', () => {});
  test('bounce effect on scroll end', () => {});
  test('tap targets >= 44x44px', () => {});
  test('spacing between tappable items', () => {});
  test('no accidental taps', () => {});
  test('haptic feedback (if available)', () => {});
  test('prevents text selection on tap', () => {});
  test('touch scroll performance', () => {});
  test('no touch delay', () => {});
  test('multi-touch gestures work', () => {});
});

// Accessibility for responsive (already covered in base table)
// Performance optimizations for mobile
```

**ResponsiveTable Total: 80 test cases**

---

### 1.3 List Component (70 Test Cases)

#### Rendering Tests (15 cases)

```typescript
describe('List Rendering', () => {
  test('renders empty list', () => {});
  test('renders list items', () => {});
  test('renders with avatars', () => {});
  test('renders with icons', () => {});
  test('renders with secondary text', () => {});
  test('renders with actions', () => {});
  test('renders dividers', () => {});
  test('renders nested lists', () => {});
  test('renders dense list', () => {});
  test('renders comfortable list', () => {});
  test('renders spacious list', () => {});
  test('applies custom className', () => {});
  test('renders with custom item component', () => {});
  test('handles loading state', () => {});
  test('handles error state', () => {});
});
```

#### Interaction Tests (20 cases)

```typescript
describe('List Interactions', () => {
  test('item click fires callback', () => {});
  test('item hover shows highlight', () => {});
  test('item focus shows outline', () => {});
  test('item selection works', () => {});
  test('multi-select with Ctrl+Click', () => {});
  test('range select with Shift+Click', () => {});
  test('keyboard navigation', () => {});
  test('arrow keys move focus', () => {});
  test('Enter activates item', () => {});
  test('Space selects item', () => {});
  test('Home goes to first', () => {});
  test('End goes to last', () => {});
  test('type-ahead search', () => {});
  test('action buttons work', () => {});
  test('nested list expand/collapse', () => {});
  test('drag to reorder', () => {});
  test('drop to reorder', () => {});
  test('disabled items not interactive', () => {});
  test('right-click context menu', () => {});
  test('double-click action', () => {});
});
```

#### Infinite Scroll Tests (15 cases)

```typescript
describe('List Infinite Scroll', () => {
  test('loads more items on scroll', () => {});
  test('shows loading indicator', () => {});
  test('stops loading when all items loaded', () => {});
  test('handles scroll to bottom', () => {});
  test('throttles scroll events', () => {});
  test('maintains scroll position on load', () => {});
  test('loads more on threshold (e.g., 80%)', () => {});
  test('handles rapid scrolling', () => {});
  test('error handling on failed load', () => {});
  test('retry button on error', () => {});
  test('shows end-of-list message', () => {});
  test('virtual scrolling for huge lists', () => {});
  test('loads initial batch', () => {});
  test('loads subsequent batches', () => {});
  test('performance with 10000+ items', () => {});
});
```

#### Virtualization Tests (10 cases)

```typescript
describe('List Virtualization', () => {
  test('renders only visible items', () => {});
  test('renders buffer items above', () => {});
  test('renders buffer items below', () => {});
  test('unmounts off-screen items', () => {});
  test('smooth scrolling with virtualization', () => {});
  test('handles variable item heights', () => {});
  test('handles fixed item heights', () => {});
  test('updates visible range on scroll', () => {});
  test('no jank during fast scroll', () => {});
  test('memory efficient with 100k items', () => {});
});
```

#### Accessibility Tests (10 cases)

```typescript
describe('List Accessibility', () => {
  test('has role="list"', () => {});
  test('items have role="listitem"', () => {});
  test('keyboard navigation works', () => {});
  test('selected items have aria-selected', () => {});
  test('disabled items have aria-disabled', () => {});
  test('nested lists have correct roles', () => {});
  test('screen reader announces item count', () => {});
  test('screen reader announces position', () => {});
  test('no axe violations', () => {});
  test('focus visible on all items', () => {});
});
```

**List Total: 70 test cases**

---

### 1.4 Charts Components (200 Test Cases)

**Chart Types:** LineChart, BarChart, PieChart, AreaChart (50 cases each)

#### LineChart Tests (50 cases)

```typescript
describe('LineChart', () => {
  // Rendering (10 cases)
  test('renders empty state', () => {});
  test('renders with single data series', () => {});
  test('renders with multiple data series', () => {});
  test('renders axes', () => {});
  test('renders grid lines', () => {});
  test('renders legend', () => {});
  test('renders tooltips', () => {});
  test('renders data labels', () => {});
  test('applies custom colors', () => {});
  test('applies custom dimensions', () => {});

  // Interactions (15 cases)
  test('hover shows tooltip', () => {});
  test('click selects data point', () => {});
  test('legend toggle series', () => {});
  test('zoom in on data', () => {});
  test('zoom out on data', () => {});
  test('pan chart', () => {});
  test('reset zoom', () => {});
  test('crosshair on hover', () => {});
  test('data point highlight', () => {});
  test('touch interactions work', () => {});
  test('pinch to zoom on mobile', () => {});
  test('swipe to pan on mobile', () => {});
  test('tooltip follows cursor', () => {});
  test('tooltip stays on touch', () => {});
  test('tooltip dismissed on tap outside', () => {});

  // Data handling (10 cases)
  test('handles positive values', () => {});
  test('handles negative values', () => {});
  test('handles zero values', () => {});
  test('handles null values', () => {});
  test('handles missing data points', () => {});
  test('handles very large numbers', () => {});
  test('handles very small numbers', () => {});
  test('handles date x-axis', () => {});
  test('handles categorical x-axis', () => {});
  test('updates on data change', () => {});

  // Styling (5 cases)
  test('line stroke styles', () => {});
  test('line markers render', () => {});
  test('gradient fills work', () => {});
  test('dashed lines work', () => {});
  test('custom line interpolation', () => {});

  // Responsiveness (5 cases)
  test('resizes on container change', () => {});
  test('maintains aspect ratio', () => {});
  test('adapts legend position', () => {});
  test('font sizes scale', () => {});
  test('works on mobile viewport', () => {});

  // Accessibility (5 cases)
  test('has descriptive title', () => {});
  test('has data table alternative', () => {});
  test('keyboard navigation works', () => {});
  test('screen reader describes data', () => {});
  test('no axe violations', () => {});
});
```

#### BarChart Tests (50 cases)

```typescript
describe('BarChart', () => {
  // Rendering (10 cases)
  test('renders vertical bars', () => {});
  test('renders horizontal bars', () => {});
  test('renders grouped bars', () => {});
  test('renders stacked bars', () => {});
  test('renders with gaps', () => {});
  test('renders with rounded corners', () => {});
  test('renders axes', () => {});
  test('renders grid lines', () => {});
  test('renders legend', () => {});
  test('renders data labels', () => {});

  // Interactions (15 cases)
  test('hover highlights bar', () => {});
  test('click selects bar', () => {});
  test('tooltip on hover', () => {});
  test('legend toggles series', () => {});
  test('zoom functionality', () => {});
  test('pan functionality', () => {});
  test('animation on load', () => {});
  test('animation on data change', () => {});
  test('touch interactions', () => {});
  test('bar width adjusts', () => {});
  test('grouped bars have spacing', () => {});
  test('stacked bars sum correctly', () => {});
  test('negative values show correctly', () => {});
  test('baseline at zero', () => {});
  test('custom baseline', () => {});

  // Data handling (10 cases)
  test('handles single series', () => {});
  test('handles multiple series', () => {});
  test('handles empty data', () => {});
  test('handles null values', () => {});
  test('handles negative values', () => {});
  test('handles zero values', () => {});
  test('handles very large values', () => {});
  test('sorts data if needed', () => {});
  test('updates on data change', () => {});
  test('transitions smoothly', () => {});

  // Styling (5 cases)
  test('bar colors', () => {});
  test('bar borders', () => {});
  test('bar patterns', () => {});
  test('bar gradients', () => {});
  test('custom bar component', () => {});

  // Responsiveness (5 cases)
  test('resizes bars on container change', () => {});
  test('adjusts bar count on small screens', () => {});
  test('horizontal bars on mobile', () => {});
  test('legend position adapts', () => {});
  test('axis labels rotate if needed', () => {});

  // Accessibility (5 cases)
  test('bars keyboard navigable', () => {});
  test('data table alternative', () => {});
  test('screen reader support', () => {});
  test('color contrast sufficient', () => {});
  test('no axe violations', () => {});
});
```

#### PieChart Tests (50 cases)

```typescript
describe('PieChart', () => {
  // Rendering (10 cases)
  test('renders pie slices', () => {});
  test('renders donut chart', () => {});
  test('renders labels', () => {});
  test('renders percentages', () => {});
  test('renders legend', () => {});
  test('renders center label', () => {});
  test('applies colors', () => {});
  test('renders with border', () => {});
  test('renders start angle', () => {});
  test('renders end angle', () => {});

  // Interactions (15 cases)
  test('hover highlights slice', () => {});
  test('hover shows tooltip', () => {});
  test('click selects slice', () => {});
  test('click explodes slice', () => {});
  test('legend toggles slice', () => {});
  test('animation on load', () => {});
  test('animation on hover', () => {});
  test('touch interactions', () => {});
  test('slice separation', () => {});
  test('active slice grows', () => {});
  test('tooltip follows cursor', () => {});
  test('custom tooltip content', () => {});
  test('click outside deselects', () => {});
  test('keyboard navigation', () => {});
  test('Enter selects slice', () => {});

  // Data handling (10 cases)
  test('calculates percentages', () => {});
  test('handles single value', () => {});
  test('handles multiple values', () => {});
  test('handles zero values', () => {});
  test('handles negative values (absolute)', () => {});
  test('sorts slices by value', () => {});
  test('groups small slices', () => {});
  test('handles empty data', () => {});
  test('updates on data change', () => {});
  test('smooth transitions', () => {});

  // Styling (5 cases)
  test('slice colors', () => {});
  test('slice borders', () => {});
  test('slice patterns', () => {});
  test('slice gradients', () => {});
  test('custom slice component', () => {});

  // Responsiveness (5 cases)
  test('resizes on container change', () => {});
  test('maintains aspect ratio', () => {});
  test('adapts label positions', () => {});
  test('legend position adapts', () => {});
  test('works on mobile', () => {});

  // Accessibility (5 cases)
  test('slices keyboard navigable', () => {});
  test('data table alternative', () => {});
  test('screen reader announces values', () => {});
  test('color patterns for accessibility', () => {});
  test('no axe violations', () => {});
});
```

#### AreaChart Tests (50 cases)

```typescript
describe('AreaChart', () => {
  // Rendering (10 cases)
  test('renders filled area', () => {});
  test('renders stacked areas', () => {});
  test('renders multiple areas', () => {});
  test('renders with gradient fill', () => {});
  test('renders area border line', () => {});
  test('renders axes', () => {});
  test('renders grid', () => {});
  test('renders legend', () => {});
  test('renders tooltips', () => {});
  test('renders markers', () => {});

  // Interactions (15 cases)
  test('hover highlights area', () => {});
  test('hover shows crosshair', () => {});
  test('hover shows tooltip', () => {});
  test('click selects area', () => {});
  test('legend toggles series', () => {});
  test('zoom in works', () => {});
  test('zoom out works', () => {});
  test('pan works', () => {});
  test('reset zoom works', () => {});
  test('touch interactions', () => {});
  test('pinch zoom on mobile', () => {});
  test('swipe pan on mobile', () => {});
  test('animation on load', () => {});
  test('animation on data change', () => {});
  test('smooth transitions', () => {});

  // Data handling (10 cases)
  test('handles positive values', () => {});
  test('handles negative values', () => {});
  test('handles zero baseline', () => {});
  test('handles null values', () => {});
  test('handles missing data', () => {});
  test('stacked areas sum correctly', () => {});
  test('percentage areas sum to 100%', () => {});
  test('updates on data change', () => {});
  test('handles very large datasets', () => {});
  test('downsamples for performance', () => {});

  // Styling (5 cases)
  test('area fill colors', () => {});
  test('area opacity', () => {});
  test('area gradients', () => {});
  test('border line styles', () => {});
  test('custom area component', () => {});

  // Responsiveness (5 cases)
  test('resizes on container change', () => {});
  test('maintains aspect ratio', () => {});
  test('adapts legend position', () => {});
  test('font sizes scale', () => {});
  test('works on mobile', () => {});

  // Accessibility (5 cases)
  test('has descriptive title', () => {});
  test('data table alternative', () => {});
  test('keyboard navigation', () => {});
  test('screen reader support', () => {});
  test('no axe violations', () => {});
});
```

**Charts Total: 200 test cases**

---

### 1.5 EmptyState Component (30 Test Cases)

```typescript
describe('EmptyState', () => {
  // Rendering (10 cases)
  test('renders title', () => {});
  test('renders description', () => {});
  test('renders icon', () => {});
  test('renders image', () => {});
  test('renders CTA button', () => {});
  test('renders secondary action', () => {});
  test('renders without image', () => {});
  test('renders with custom content', () => {});
  test('applies custom className', () => {});
  test('applies size variants', () => {});

  // Variants (8 cases)
  test('search variant renders', () => {});
  test('error variant renders', () => {});
  test('no-data variant renders', () => {});
  test('no-results variant renders', () => {});
  test('offline variant renders', () => {});
  test('permissions variant renders', () => {});
  test('maintenance variant renders', () => {});
  test('custom variant renders', () => {});

  // Interactions (5 cases)
  test('CTA button click works', () => {});
  test('secondary action works', () => {});
  test('custom action works', () => {});
  test('link navigation works', () => {});
  test('button disabled state', () => {});

  // Styling (4 cases)
  test('centered layout', () => {});
  test('compact layout', () => {});
  test('full-page layout', () => {});
  test('inline layout', () => {});

  // Accessibility (3 cases)
  test('has semantic structure', () => {});
  test('buttons keyboard accessible', () => {});
  test('no axe violations', () => {});
});
```

**EmptyState Total: 30 test cases**

---

### 1.6 DatePicker Component (90 Test Cases)

```typescript
describe('DatePicker', () => {
  // Rendering (10 cases)
  test('renders input field', () => {});
  test('renders calendar icon', () => {});
  test('renders placeholder', () => {});
  test('renders with initial date', () => {});
  test('renders in disabled state', () => {});
  test('renders in error state', () => {});
  test('renders with label', () => {});
  test('renders with helper text', () => {});
  test('applies custom className', () => {});
  test('renders inline calendar', () => {});

  // Calendar Display (15 cases)
  test('opens calendar on input click', () => {});
  test('opens calendar on icon click', () => {});
  test('closes calendar on outside click', () => {});
  test('closes calendar on Escape', () => {});
  test('closes calendar on date select', () => {});
  test('displays current month', () => {});
  test('displays month name', () => {});
  test('displays year', () => {});
  test('displays day names', () => {});
  test('highlights today', () => {});
  test('highlights selected date', () => {});
  test('shows days from previous month', () => {});
  test('shows days from next month', () => {});
  test('weeks start on Sunday/Monday', () => {});
  test('calendar position adapts', () => {});

  // Month Navigation (10 cases)
  test('navigates to next month', () => {});
  test('navigates to previous month', () => {});
  test('navigates to next year', () => {});
  test('navigates to previous year', () => {});
  test('month dropdown works', () => {});
  test('year dropdown works', () => {});
  test('jumps to specific month', () => {});
  test('jumps to specific year', () => {});
  test('navigates with keyboard arrows', () => {});
  test('wraps to next/previous year', () => {});

  // Date Selection (15 cases)
  test('selects date on click', () => {});
  test('selects date with Enter key', () => {});
  test('updates input field', () => {});
  test('calls onChange callback', () => {});
  test('formats date correctly', () => {});
  test('accepts custom date format', () => {});
  test('validates date input', () => {});
  test('prevents invalid date selection', () => {});
  test('clears date with clear button', () => {});
  test('sets date programmatically', () => {});
  test('handles min date constraint', () => {});
  test('handles max date constraint', () => {});
  test('disables dates before min', () => {});
  test('disables dates after max', () => {});
  test('disables specific dates', () => {});

  // Range Selection (10 cases)
  test('selects start date', () => {});
  test('selects end date', () => {});
  test('highlights range', () => {});
  test('validates range order', () => {});
  test('swaps if end before start', () => {});
  test('clears range', () => {});
  test('shows range in inputs', () => {});
  test('range with min/max', () => {});
  test('max range length', () => {});
  test('preset ranges work', () => {});

  // Keyboard Navigation (12 cases)
  test('Tab focuses input', () => {});
  test('Enter opens calendar', () => {});
  test('Escape closes calendar', () => {});
  test('Arrow keys navigate dates', () => {});
  test('Page Up/Down for months', () => {});
  test('Home goes to week start', () => {});
  test('End goes to week end', () => {});
  test('Ctrl+Home goes to month start', () => {});
  test('Ctrl+End goes to month end', () => {});
  test('Enter selects date', () => {});
  test('Space selects date', () => {});
  test('Tab moves through controls', () => {});

  // Input Validation (10 cases)
  test('accepts manual date entry', () => {});
  test('validates date format', () => {});
  test('shows error for invalid date', () => {});
  test('shows error for out-of-range date', () => {});
  test('auto-formats as user types', () => {});
  test('handles partial dates', () => {});
  test('handles various formats', () => {});
  test('locale-aware parsing', () => {});
  test('clears invalid input', () => {});
  test('reverts to last valid', () => {});

  // Accessibility (8 cases)
  test('has role="dialog"', () => {});
  test('has aria-label', () => {});
  test('dates have aria-label', () => {});
  test('selected date has aria-selected', () => {});
  test('disabled dates have aria-disabled', () => {});
  test('announces month/year changes', () => {});
  test('keyboard navigation works', () => {});
  test('no axe violations', () => {});
});
```

**DatePicker Total: 90 test cases**

---

### 1.7 TimePicker Component (60 Test Cases)

```typescript
describe('TimePicker', () => {
  // Rendering (10 cases)
  test('renders input field', () => {});
  test('renders clock icon', () => {});
  test('renders placeholder', () => {});
  test('renders with initial time', () => {});
  test('renders 12-hour format', () => {});
  test('renders 24-hour format', () => {});
  test('renders AM/PM selector', () => {});
  test('renders with label', () => {});
  test('renders in disabled state', () => {});
  test('renders in error state', () => {});

  // Time Selection (15 cases)
  test('opens picker on click', () => {});
  test('closes on outside click', () => {});
  test('closes on Escape', () => {});
  test('selects hour', () => {});
  test('selects minute', () => {});
  test('selects second', () => {});
  test('toggles AM/PM', () => {});
  test('updates input on selection', () => {});
  test('calls onChange callback', () => {});
  test('formats time correctly', () => {});
  test('accepts custom format', () => {});
  test('validates time', () => {});
  test('clears time', () => {});
  test('sets time programmatically', () => {});
  test('handles midnight', () => {});

  // Picker UI (10 cases)
  test('shows clock face', () => {});
  test('shows hour numbers', () => {});
  test('shows minute numbers', () => {});
  test('hour hand moves', () => {});
  test('minute hand moves', () => {});
  test('click on clock sets time', () => {});
  test('drag on clock updates time', () => {});
  test('switches hour/minute mode', () => {});
  test('dropdown for hours', () => {});
  test('dropdown for minutes', () => {});

  // Constraints (8 cases)
  test('enforces min time', () => {});
  test('enforces max time', () => {});
  test('disables times before min', () => {});
  test('disables times after max', () => {});
  test('step interval for minutes', () => {});
  test('step interval for seconds', () => {});
  test('disables specific times', () => {});
  test('validates against constraints', () => {});

  // Input Validation (7 cases)
  test('accepts manual entry', () => {});
  test('validates time format', () => {});
  test('shows error for invalid time', () => {});
  test('auto-formats as user types', () => {});
  test('handles partial times', () => {});
  test('clears invalid input', () => {});
  test('reverts to last valid', () => {});

  // Keyboard Navigation (5 cases)
  test('Arrow up increases hour', () => {});
  test('Arrow down decreases hour', () => {});
  test('Arrow up increases minute', () => {});
  test('Arrow down decreases minute', () => {});
  test('Tab moves between fields', () => {});

  // Accessibility (5 cases)
  test('has role="dialog"', () => {});
  test('has aria-label', () => {});
  test('keyboard navigation works', () => {});
  test('announces time changes', () => {});
  test('no axe violations', () => {});
});
```

**TimePicker Total: 60 test cases**

---

### 1.8 FileUpload Component (70 Test Cases)

```typescript
describe('FileUpload', () => {
  // Rendering (10 cases)
  test('renders drop zone', () => {});
  test('renders browse button', () => {});
  test('renders upload instructions', () => {});
  test('renders file list area', () => {});
  test('renders with label', () => {});
  test('renders in disabled state', () => {});
  test('renders in error state', () => {});
  test('renders multiple file mode', () => {});
  test('renders single file mode', () => {});
  test('applies custom className', () => {});

  // Drag & Drop (15 cases)
  test('highlights on drag enter', () => {});
  test('unhighlights on drag leave', () => {});
  test('accepts drop', () => {});
  test('shows dragging state', () => {});
  test('prevents default drag behavior', () => {});
  test('handles drag over', () => {});
  test('handles drop event', () => {});
  test('rejects invalid file types on drop', () => {});
  test('shows error for invalid files', () => {});
  test('multiple files drop', () => {});
  test('folder drop handling', () => {});
  test('drag from browser works', () => {});
  test('drag from desktop works', () => {});
  test('touch drag on mobile', () => {});
  test('clears drag state after drop', () => {});

  // File Selection (10 cases)
  test('opens file browser on button click', () => {});
  test('opens file browser on drop zone click', () => {});
  test('accepts file selection', () => {});
  test('adds file to list', () => {});
  test('calls onChange callback', () => {});
  test('displays file name', () => {});
  test('displays file size', () => {});
  test('displays file type', () => {});
  test('displays file icon', () => {});
  test('multiple file selection', () => {});

  // File Validation (15 cases)
  test('validates file type', () => {});
  test('accepts valid file types', () => {});
  test('rejects invalid file types', () => {});
  test('validates file size', () => {});
  test('accepts files under max size', () => {});
  test('rejects files over max size', () => {});
  test('validates min size', () => {});
  test('validates max files count', () => {});
  test('prevents adding beyond max', () => {});
  test('validates total size', () => {});
  test('shows validation errors', () => {});
  test('custom validation function', () => {});
  test('validates file name', () => {});
  test('validates file extension', () => {});
  test('virus scan integration', () => {});

  // Upload Progress (10 cases)
  test('shows progress bar', () => {});
  test('updates progress percentage', () => {});
  test('shows uploading state', () => {});
  test('shows completed state', () => {});
  test('shows error state', () => {});
  test('allows cancel upload', () => {});
  test('allows retry failed upload', () => {});
  test('removes file from list', () => {});
  test('uploads multiple files', () => {});
  test('queues uploads', () => {});

  // File List Management (8 cases)
  test('displays uploaded files', () => {});
  test('removes file on delete click', () => {});
  test('clears all files', () => {});
  test('reorders files with drag', () => {});
  test('previews image files', () => {});
  test('previews PDF files', () => {});
  test('downloads file', () => {});
  test('views file details', () => {});

  // Accessibility (7 cases)
  test('drop zone keyboard accessible', () => {});
  test('browse button keyboard accessible', () => {});
  test('file list keyboard navigable', () => {});
  test('announces file addition', () => {});
  test('announces upload progress', () => {});
  test('announces errors', () => {});
  test('no axe violations', () => {});

  // Edge Cases (5 cases)
  test('handles empty file', () => {});
  test('handles corrupt file', () => {});
  test('handles network error', () => {});
  test('handles duplicate files', () => {});
  test('handles simultaneous drops', () => {});
});
```

**FileUpload Total: 70 test cases**

---

**Data Components Total: 800+ test cases**

---

## 2. Feedback Components Testing (200+ cases)

### 2.1 Toast Component (50 Test Cases)

```typescript
describe('Toast', () => {
  // Rendering (10 cases)
  test('renders toast message', () => {});
  test('renders info variant', () => {});
  test('renders success variant', () => {});
  test('renders warning variant', () => {});
  test('renders error variant', () => {});
  test('renders with icon', () => {});
  test('renders with action button', () => {});
  test('renders with close button', () => {});
  test('renders without close button', () => {});
  test('applies custom className', () => {});

  // Auto-dismiss (8 cases)
  test('auto-dismisses after default duration', () => {});
  test('auto-dismisses after custom duration', () => {});
  test('does not auto-dismiss if duration=0', () => {});
  test('pauses on hover', () => {});
  test('resumes on mouse leave', () => {});
  test('pauses on focus', () => {});
  test('shows countdown progress bar', () => {});
  test('updates progress bar', () => {});

  // Stacking (10 cases)
  test('shows multiple toasts', () => {});
  test('stacks toasts vertically', () => {});
  test('newest toast on top', () => {});
  test('limits max toasts shown', () => {});
  test('queues excess toasts', () => {});
  test('shows queued toast on dismiss', () => {});
  test('toasts have correct z-index', () => {});
  test('toasts have spacing', () => {});
  test('animates toast entrance', () => {});
  test('animates toast exit', () => {});

  // Positioning (6 cases)
  test('positions top-left', () => {});
  test('positions top-center', () => {});
  test('positions top-right', () => {});
  test('positions bottom-left', () => {});
  test('positions bottom-center', () => {});
  test('positions bottom-right', () => {});

  // Interactions (8 cases)
  test('close button dismisses toast', () => {});
  test('action button works', () => {});
  test('action button dismisses toast', () => {});
  test('click dismisses toast (if enabled)', () => {});
  test('swipe to dismiss on mobile', () => {});
  test('undo action works', () => {});
  test('calls onClose callback', () => {});
  test('calls onAction callback', () => {});

  // Accessibility (8 cases)
  test('has role="alert"', () => {});
  test('has aria-live="polite"', () => {});
  test('error toasts have aria-live="assertive"', () => {});
  test('announces message to screen reader', () => {});
  test('close button has aria-label', () => {});
  test('keyboard dismissable with Escape', () => {});
  test('focus trap when interactive', () => {});
  test('no axe violations', () => {});
});
```

**Toast Total: 50 test cases**

---

### 2.2 Alert Component (40 Test Cases)

```typescript
describe('Alert', () => {
  // Rendering (10 cases)
  test('renders alert message', () => {});
  test('renders info variant', () => {});
  test('renders success variant', () => {});
  test('renders warning variant', () => {});
  test('renders error variant', () => {});
  test('renders with icon', () => {});
  test('renders with title', () => {});
  test('renders with description', () => {});
  test('renders with action button', () => {});
  test('renders with close button', () => {});

  // Dismissible (5 cases)
  test('shows close button when dismissible', () => {});
  test('hides close button when not dismissible', () => {});
  test('dismisses on close click', () => {});
  test('animates out on dismiss', () => {});
  test('calls onClose callback', () => {});

  // Variants (8 cases)
  test('info alert has blue colors', () => {});
  test('success alert has green colors', () => {});
  test('warning alert has yellow colors', () => {});
  test('error alert has red colors', () => {});
  test('info icon shows', () => {});
  test('success icon shows', () => {});
  test('warning icon shows', () => {});
  test('error icon shows', () => {});

  // Actions (7 cases)
  test('primary action button works', () => {});
  test('secondary action button works', () => {});
  test('action does not dismiss by default', () => {});
  test('action dismisses if configured', () => {});
  test('calls onAction callback', () => {});
  test('multiple actions work', () => {});
  test('action buttons styled correctly', () => {});

  // Persistence (5 cases)
  test('alert persists across page loads', () => {});
  test('alert can be set to non-persistent', () => {});
  test('stores dismissal in localStorage', () => {});
  test('does not show dismissed persistent alert', () => {});
  test('clears stored dismissal', () => {});

  // Accessibility (5 cases)
  test('has role="alert"', () => {});
  test('has aria-live="polite"', () => {});
  test('error alerts have aria-live="assertive"', () => {});
  test('close button keyboard accessible', () => {});
  test('no axe violations', () => {});
});
```

**Alert Total: 40 test cases**

---

### 2.3 ConfirmDialog Component (60 Test Cases)

```typescript
describe('ConfirmDialog', () => {
  // Rendering (12 cases)
  test('renders dialog', () => {});
  test('renders title', () => {});
  test('renders message', () => {});
  test('renders icon', () => {});
  test('renders confirm button', () => {});
  test('renders cancel button', () => {});
  test('renders close X button', () => {});
  test('renders with overlay', () => {});
  test('renders centered', () => {});
  test('renders with custom content', () => {});
  test('does not render when closed', () => {});
  test('applies custom className', () => {});

  // Open/Close (10 cases)
  test('opens on open prop true', () => {});
  test('closes on close button click', () => {});
  test('closes on cancel button click', () => {});
  test('closes on overlay click', () => {});
  test('closes on Escape key', () => {});
  test('does not close on overlay click if disabled', () => {});
  test('does not close on Escape if disabled', () => {});
  test('animates in on open', () => {});
  test('animates out on close', () => {});
  test('calls onClose callback', () => {});

  // Confirm/Cancel (8 cases)
  test('confirm button triggers onConfirm', () => {});
  test('cancel button triggers onCancel', () => {});
  test('confirm button closes dialog', () => {});
  test('cancel button closes dialog', () => {});
  test('Enter key confirms', () => {});
  test('Escape key cancels', () => {});
  test('confirm button has correct label', () => {});
  test('cancel button has correct label', () => {});

  // Variants (8 cases)
  test('info variant renders', () => {});
  test('success variant renders', () => {});
  test('warning variant renders', () => {});
  test('error/danger variant renders', () => {});
  test('destructive confirm button styled', () => {});
  test('default confirm button styled', () => {});
  test('variant icons show', () => {});
  test('variant colors applied', () => {});

  // Loading State (5 cases)
  test('shows loading on confirm button', () => {});
  test('disables buttons during loading', () => {});
  test('does not close during loading', () => {});
  test('async confirm works', () => {});
  test('handles confirm error', () => {});

  // Focus Management (7 cases)
  test('focuses confirm button on open', () => {});
  test('focuses cancel button if dangerous', () => {});
  test('traps focus within dialog', () => {});
  test('Tab cycles through buttons', () => {});
  test('Shift+Tab cycles backwards', () => {});
  test('restores focus on close', () => {});
  test('prevents focus outside dialog', () => {});

  // Accessibility (10 cases)
  test('has role="alertdialog"', () => {});
  test('has role="dialog" if not alert', () => {});
  test('has aria-labelledby', () => {});
  test('has aria-describedby', () => {});
  test('has aria-modal="true"', () => {});
  test('overlay has aria-hidden', () => {});
  test('screen reader announces open', () => {});
  test('buttons keyboard accessible', () => {});
  test('color contrast sufficient', () => {});
  test('no axe violations', () => {});
});
```

**ConfirmDialog Total: 60 test cases**

---

### 2.4 Component State Tests (50 Test Cases)

Testing state patterns across all components:

```typescript
describe('Component States', () => {
  const components = [
    'Button', 'Input', 'Select', 'Checkbox', 'Radio',
    'Switch', 'Card', 'Link', 'IconButton'
  ];

  describe('Hover State', () => {
    components.forEach(comp => {
      test(`${comp} shows hover state`, () => {});
    });
  });

  describe('Focus State', () => {
    components.forEach(comp => {
      test(`${comp} shows focus outline`, () => {});
      test(`${comp} focus visible on keyboard`, () => {});
    });
  });

  describe('Disabled State', () => {
    components.forEach(comp => {
      test(`${comp} shows disabled styling`, () => {});
      test(`${comp} prevents interactions when disabled`, () => {});
      test(`${comp} has aria-disabled`, () => {});
    });
  });

  describe('Loading State', () => {
    const loadingComponents = ['Button', 'Select', 'Table', 'FileUpload'];
    loadingComponents.forEach(comp => {
      test(`${comp} shows loading spinner`, () => {});
      test(`${comp} disables interactions when loading`, () => {});
    });
  });

  describe('Success State', () => {
    const feedbackComponents = ['Input', 'Alert', 'Toast'];
    feedbackComponents.forEach(comp => {
      test(`${comp} shows success styling`, () => {});
      test(`${comp} shows success icon`, () => {});
    });
  });

  describe('Error State', () => {
    const errorComponents = ['Input', 'Select', 'Textarea', 'FileUpload'];
    errorComponents.forEach(comp => {
      test(`${comp} shows error styling`, () => {});
      test(`${comp} shows error message`, () => {});
      test(`${comp} has aria-invalid`, () => {});
    });
  });

  describe('Warning State', () => {
    const warningComponents = ['Alert', 'Toast', 'Input'];
    warningComponents.forEach(comp => {
      test(`${comp} shows warning styling`, () => {});
      test(`${comp} shows warning icon`, () => {});
    });
  });
});
```

**Component States Total: 50 test cases**

---

**Feedback Components Total: 200+ test cases**

---

## 3. Integration Testing (150+ cases)

### 3.1 Table + Pagination + Search (30 cases)

```typescript
describe('Table Integration', () => {
  test('pagination updates on search', () => {});
  test('search filters table data', () => {});
  test('pagination resets to page 1 on search', () => {});
  test('sort persists across pagination', () => {});
  test('search + sort + pagination work together', () => {});
  test('selection persists across pages', () => {});
  test('selection cleared on search', () => {});
  test('bulk actions work across pages', () => {});
  test('filter + search + pagination', () => {});
  test('export filtered data', () => {});
  // ... 20 more integration scenarios
});
```

### 3.2 Forms + Validation + Feedback (40 cases)

```typescript
describe('Form Integration', () => {
  test('form validates on submit', () => {});
  test('shows error messages', () => {});
  test('prevents submit when invalid', () => {});
  test('success toast on submit', () => {});
  test('error alert on submit failure', () => {});
  test('loading state during submit', () => {});
  test('disabled form during submit', () => {});
  test('file upload in form', () => {});
  test('date picker in form', () => {});
  test('form reset works', () => {});
  // ... 30 more form integration tests
});
```

### 3.3 Modal + Forms + Upload (30 cases)

```typescript
describe('Modal Form Integration', () => {
  test('opens modal with form', () => {});
  test('validates form in modal', () => {});
  test('file upload in modal', () => {});
  test('closes modal on success', () => {});
  test('confirms before closing with changes', () => {});
  test('focus trap in modal form', () => {});
  test('error handling in modal', () => {});
  test('loading state in modal', () => {});
  test('nested modals work', () => {});
  test('accessibility in modal forms', () => {});
  // ... 20 more modal integration tests
});
```

### 3.4 Chart + Table Integration (20 cases)

```typescript
describe('Chart-Table Integration', () => {
  test('clicking chart updates table', () => {});
  test('selecting table row highlights chart', () => {});
  test('filtering table updates chart', () => {});
  test('sorting table updates chart', () => {});
  test('chart legend toggles table data', () => {});
  test('synced tooltips', () => {});
  test('export chart + table data', () => {});
  test('responsive chart and table', () => {});
  // ... 12 more chart-table integration tests
});
```

### 3.5 Complex User Flows (30 cases)

```typescript
describe('Complex User Flows', () => {
  test('search, filter, sort, select, export flow', () => {});
  test('create item with upload flow', () => {});
  test('edit item with validation flow', () => {});
  test('delete with confirmation flow', () => {});
  test('bulk edit multiple items flow', () => {});
  test('multi-step form flow', () => {});
  test('wizard with validation flow', () => {});
  test('data import flow', () => {});
  // ... 22 more complex flow tests
});
```

---

## 4. Accessibility Testing (100+ cases)

### 4.1 WCAG AA Compliance Tests (40 cases)

```typescript
describe('WCAG AA Compliance', () => {
  // Perceivable
  test('all images have alt text', () => {});
  test('color contrast meets 4.5:1', () => {});
  test('large text contrast meets 3:1', () => {});
  test('UI components contrast meets 3:1', () => {});
  test('text resizable to 200%', () => {});
  test('no horizontal scroll at 320px', () => {});
  test('info not conveyed by color alone', () => {});

  // Operable
  test('all functionality keyboard accessible', () => {});
  test('no keyboard trap', () => {});
  test('focus visible on all interactive elements', () => {});
  test('skip navigation link provided', () => {});
  test('page title describes purpose', () => {});
  test('focus order is logical', () => {});
  test('link purpose clear from text', () => {});

  // Understandable
  test('language attribute set', () => {});
  test('labels for all form inputs', () => {});
  test('error identification clear', () => {});
  test('error suggestions provided', () => {});
  test('help text available', () => {});

  // Robust
  test('valid HTML', () => {});
  test('name, role, value for custom components', () => {});
  test('status messages announced', () => {});
  // ... 17 more WCAG tests
});
```

### 4.2 Screen Reader Tests (30 cases)

```typescript
describe('Screen Reader Support', () => {
  test('table structure announced', () => {});
  test('row and column headers announced', () => {});
  test('selected items announced', () => {});
  test('sort order announced', () => {});
  test('pagination announced', () => {});
  test('modal open/close announced', () => {});
  test('toast messages announced', () => {});
  test('error messages announced', () => {});
  test('loading states announced', () => {});
  test('form validation announced', () => {});
  // ... 20 more screen reader tests
});
```

### 4.3 Keyboard Navigation Tests (30 cases)

```typescript
describe('Keyboard Navigation', () => {
  test('Tab navigates through all interactive elements', () => {});
  test('Shift+Tab navigates backwards', () => {});
  test('Arrow keys navigate within components', () => {});
  test('Enter activates buttons/links', () => {});
  test('Space activates buttons/checkboxes', () => {});
  test('Escape closes modals/dropdowns', () => {});
  test('Home/End keys work', () => {});
  test('Page Up/Down keys work', () => {});
  test('Ctrl shortcuts work', () => {});
  test('no keyboard traps', () => {});
  // ... 20 more keyboard tests
});
```

---

## 5. Performance Testing (20+ cases)

### 5.1 Component Render Performance (10 cases)

```typescript
describe('Render Performance', () => {
  test('Table renders 1000 rows < 500ms', () => {});
  test('Chart renders 1000 points < 300ms', () => {});
  test('List renders 10000 items with virtualization', () => {});
  test('FileUpload handles 100 files', () => {});
  test('DatePicker renders < 50ms', () => {});
  test('Modal opens < 100ms', () => {});
  test('Toast renders < 16ms', () => {});
  test('Form validates < 50ms', () => {});
  test('Table sort < 100ms', () => {});
  test('Table filter < 50ms', () => {});
});
```

### 5.2 Memory & Performance (10 cases)

```typescript
describe('Memory & Performance', () => {
  test('no memory leaks on unmount', () => {});
  test('event listeners cleaned up', () => {});
  test('timers cleared', () => {});
  test('subscriptions unsubscribed', () => {});
  test('maintains 60fps during scroll', () => {});
  test('throttles expensive operations', () => {});
  test('debounces user input', () => {});
  test('uses requestAnimationFrame', () => {});
  test('lazy loads heavy components', () => {});
  test('code-splits large components', () => {});
});
```

---

## 6. Test Infrastructure

### 6.1 Test Utilities

```typescript
// tests/utils/phase3-utils.ts
export function renderTable(props) {
  return render(<Table {...mockTableProps(props)} />);
}

export function renderChart(type, props) {
  const ChartComponent = {
    line: LineChart,
    bar: BarChart,
    pie: PieChart,
    area: AreaChart
  }[type];
  return render(<ChartComponent {...props} />);
}

export function mockLargeDataset(rows = 1000) {
  return Array.from({ length: rows }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.random() * 100,
    date: new Date(2024, 0, i % 365)
  }));
}

export async function testPerformance(fn, threshold) {
  const start = performance.now();
  await fn();
  const duration = performance.now() - start;
  expect(duration).toBeLessThan(threshold);
}
```

### 6.2 Mock Data Generators

```typescript
// tests/mocks/phase3-data.ts
export const mockTableData = (rows = 100) => ({
  columns: [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'date', label: 'Date', sortable: true }
  ],
  data: Array.from({ length: rows }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    status: ['active', 'inactive'][i % 2],
    date: new Date(2024, 0, i)
  }))
});

export const mockChartData = (points = 100) => ({
  labels: Array.from({ length: points }, (_, i) => `Point ${i}`),
  datasets: [{
    label: 'Series 1',
    data: Array.from({ length: points }, () => Math.random() * 100)
  }]
});

export const mockFileList = (count = 10) =>
  Array.from({ length: count }, (_, i) => ({
    name: `file${i}.txt`,
    size: Math.floor(Math.random() * 1000000),
    type: 'text/plain',
    lastModified: Date.now() - i * 1000
  }));
```

---

## 7. Test Execution Plan

### 7.1 NPM Scripts

```json
{
  "scripts": {
    "test:phase3": "vitest run src/components/**/*.test.tsx",
    "test:phase3:watch": "vitest watch src/components/**/*.test.tsx",
    "test:data-components": "vitest run src/components/{Table,List,Charts}/**",
    "test:feedback-components": "vitest run src/components/{Toast,Alert,Dialog}/**",
    "test:integration": "vitest run tests/integration/**",
    "test:performance": "vitest run tests/performance/**",
    "test:a11y:phase3": "vitest run tests/a11y/phase3/**"
  }
}
```

### 7.2 CI/CD Pipeline

```yaml
# .github/workflows/test-phase3.yml
name: Phase 3 Tests

on:
  push:
    branches: [main, develop]
    paths:
      - 'src/components/Table/**'
      - 'src/components/List/**'
      - 'src/components/Charts/**'
      - 'src/components/Toast/**'
      - 'src/components/Alert/**'
      - 'src/components/Dialog/**'

jobs:
  test-phase3:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:phase3
      - run: npm run test:integration
      - run: npm run test:a11y:phase3
      - run: npm run test:performance
```

---

## 8. Success Criteria

### 8.1 Coverage Targets

| Component | Test Cases | Status |
|-----------|------------|--------|
| Table | 250 | Pending |
| ResponsiveTable | 80 | Pending |
| List | 70 | Pending |
| LineChart | 50 | Pending |
| BarChart | 50 | Pending |
| PieChart | 50 | Pending |
| AreaChart | 50 | Pending |
| EmptyState | 30 | Pending |
| DatePicker | 90 | Pending |
| TimePicker | 60 | Pending |
| FileUpload | 70 | Pending |
| Toast | 50 | Pending |
| Alert | 40 | Pending |
| ConfirmDialog | 60 | Pending |
| Component States | 50 | Pending |
| Integration | 150 | Pending |
| Accessibility | 100 | Pending |
| Performance | 20 | Pending |
| **TOTAL** | **1.270+** | **Pending** |

### 8.2 Quality Gates

- [ ] All 1.270+ tests pass
- [ ] 100% line coverage on data components
- [ ] 100% function coverage on feedback components
- [ ] 90%+ branch coverage overall
- [ ] 0 axe violations
- [ ] All WCAG AA criteria met
- [ ] Performance budgets met
- [ ] No memory leaks detected

---

## 9. Implementation Timeline

### Week 1: Data Components (800 tests)
- Day 1-2: Table component (250 tests)
- Day 3: ResponsiveTable (80 tests)
- Day 4: List component (70 tests)
- Day 5: Charts (200 tests - 50 each)

### Week 2: Data Components Continued
- Day 1: EmptyState (30 tests)
- Day 2: DatePicker (90 tests)
- Day 3: TimePicker (60 tests)
- Day 4: FileUpload (70 tests)
- Day 5: Integration testing (50 tests)

### Week 3: Feedback & Integration
- Day 1: Toast (50 tests)
- Day 2: Alert + ConfirmDialog (100 tests)
- Day 3: Component States (50 tests)
- Day 4: Integration tests (100 tests)
- Day 5: Accessibility suite (100 tests)

### Week 4: Performance & Polish
- Day 1-2: Performance tests (20 tests)
- Day 3: Bug fixes
- Day 4: Documentation
- Day 5: Final review and sign-off

---

## 10. Next Steps

1. **Implement test infrastructure** for Phase 3
2. **Create test data generators** for large datasets
3. **Set up performance benchmarking** tools
4. **Execute tests** following the timeline
5. **Document results** and learnings
6. **Iterate** on failures
7. **Achieve 100% coverage** on all 17 components

---

## Appendix: Test Case Summary

### By Component Category

**Data Components: 800 tests**
- Table: 250
- ResponsiveTable: 80
- List: 70
- Charts: 200
- EmptyState: 30
- DatePicker: 90
- TimePicker: 60
- FileUpload: 70

**Feedback Components: 200 tests**
- Toast: 50
- Alert: 40
- ConfirmDialog: 60
- States: 50

**Cross-Cutting: 270 tests**
- Integration: 150
- Accessibility: 100
- Performance: 20

**Grand Total: 1.270+ test cases**

---

**Document Status:** Complete
**Ready for Implementation:** Yes
**Owner:** QA Agent (Astrid)
**Next Review:** After implementation complete
