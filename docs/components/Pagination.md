# Pagination

> Organism | Page navigation with smart ellipsis, previous/next buttons, and disabled states

## Import

```tsx
import { Pagination, type PaginationProps } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | - | Current page (1-based) |
| `totalPages` | `number` | - | Total number of pages |
| `onPageChange` | `(page: number) => void` | - | Page change handler |
| `siblingCount` | `number` | `1` | Number of sibling pages to show around current |
| `className` | `string` | - | Additional class names |

## Usage

```tsx
const [page, setPage] = React.useState(1);

<Pagination
  page={page}
  totalPages={20}
  onPageChange={setPage}
  siblingCount={1}
/>
```

## Features

- Smart pagination range algorithm with ellipsis ("...") for large page counts
- Configurable `siblingCount` to control how many pages appear around the current page
- Previous/Next navigation buttons with chevron icons
- Automatically disables Previous on first page and Next on last page
- Returns `null` when `totalPages <= 1` (hides when unnecessary)
- Highlights current page with primary color styling
- Ref forwarding to the underlying `<nav>` element

## Accessibility

- Wraps in `<nav>` element with `aria-label="pagination"`
- Current page marked with `aria-current="page"`
- Each page button has `aria-label="Page N"`
- Previous/Next buttons have `aria-label="Previous page"` / `aria-label="Next page"`
- Disabled buttons have `disabled` attribute set
- Ellipsis dots marked with `aria-hidden="true"`
- Chevron SVG icons marked with `aria-hidden="true"`

## Tests: 12 | Stories: 6
