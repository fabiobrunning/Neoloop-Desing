# Footer

> Organism | Footer with brand, link groups, copyright, and customizable bottom content

## Import

```tsx
import { Footer, type FooterLinkGroup, type FooterProps } from "synkra-ds";
```

## Props

### FooterLinkGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Group title |
| `links` | `{ label: string; href: string }[]` | - | Links in this group |

### FooterProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `ReactNode` | - | Brand logo or text |
| `description` | `string` | - | Description text below brand |
| `linkGroups` | `FooterLinkGroup[]` | `[]` | Link groups for footer columns |
| `copyright` | `string` | - | Copyright text |
| `bottomContent` | `ReactNode` | - | Bottom-bar extra content (social icons, etc.) |
| `className` | `string` | - | Additional CSS classes |

## Usage

```tsx
const linkGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

<Footer
  brand="Synkra DS"
  description="A token-based design system built with React, Tailwind CSS, and Radix UI."
  linkGroups={linkGroups}
  copyright={`© ${new Date().getFullYear()} Synkra. All rights reserved.`}
  bottomContent={
    <div className="flex gap-3">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </div>
  }
/>
```

## Features

- Brand column with optional description text
- Multi-column link groups with responsive grid layout (2 cols mobile, 3 cols sm, 4 cols lg)
- Copyright text in bottom bar
- Bottom content slot for social icons, legal links, etc.
- Separated bottom bar with border divider
- Ref forwarding to the underlying `<footer>` element

## Accessibility

- Renders as semantic `<footer>` element
- Link group titles use `<h3>` headings for proper document structure
- Links use semantic `<a>` elements within `<ul>/<li>` lists
- Hover transitions on links for visual feedback

## Tests: 10 | Stories: 3
