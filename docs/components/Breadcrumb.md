# Breadcrumb

> Molecule | Navigation trail showing the user's current location within a hierarchical structure

## Import

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "synkra-ds";
```

## Subcomponents

| Subcomponent | Description |
|--------------|-------------|
| `Breadcrumb` | Root `<nav>` element with `aria-label="breadcrumb"`. Accepts `separator`. |
| `BreadcrumbList` | Ordered list (`<ol>`) containing breadcrumb items. Flex layout with wrapping. |
| `BreadcrumbItem` | List item (`<li>`) wrapper for a single breadcrumb entry. |
| `BreadcrumbLink` | Navigable link (`<a>`). Supports `asChild` for router integration. |
| `BreadcrumbPage` | Current/active page indicator (`<span>`). Non-interactive. |
| `BreadcrumbSeparator` | Visual separator. Defaults to chevron-right icon. Accepts custom `children`. |
| `BreadcrumbEllipsis` | Collapsed items indicator (three-dot icon with `sr-only` "More" text). |

## Usage

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Features

- Semantic `<nav>` + `<ol>` structure for proper document outline
- `BreadcrumbLink` supports `asChild` pattern (via Radix `Slot`) for router integration
- `BreadcrumbPage` marks the current page as non-interactive
- Default chevron-right separator, customizable via `children` on `BreadcrumbSeparator`
- `BreadcrumbEllipsis` for collapsing long trails
- Hover transition on links: `text-text-secondary` to `text-text-primary`
- All subcomponents support `className` merging and `ref` forwarding

## Accessibility

- Root `<nav>` has `aria-label="breadcrumb"`
- Current page uses `aria-current="page"` and `aria-disabled="true"`
- Separators have `role="presentation"` and `aria-hidden="true"`
- Ellipsis has `role="presentation"`, `aria-hidden="true"`, and `sr-only` "More" text

## Tests: 10 | Stories: 3
