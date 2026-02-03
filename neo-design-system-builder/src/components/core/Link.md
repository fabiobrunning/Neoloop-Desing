# Link Component

A versatile and accessible link component with multiple variants, sizes, and states.

## Features

- **4 Variants**: Default, Underline, Muted, Inline
- **3 Sizes**: Small, Medium, Large
- **External Link Support**: Automatically adds icon and security attributes
- **Visited States**: Proper styling for visited links
- **Disabled State**: Prevents interaction and navigation
- **Full Accessibility**: WCAG AA compliant with proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support
- **TypeScript**: Fully typed with IntelliSense support

## Usage

### Basic Link

```tsx
import { Link } from '@/components/core/Link';

<Link href="/about">About Us</Link>
```

### External Link

```tsx
<Link href="https://example.com" external>
  Visit Example
</Link>
```

### Variants

```tsx
<Link href="/page" variant="default">Default Link</Link>
<Link href="/page" variant="underline">Underlined Link</Link>
<Link href="/page" variant="muted">Muted Link</Link>
<Link href="/page" variant="inline">Inline Link</Link>
```

### Sizes

```tsx
<Link href="/page" size="sm">Small Link</Link>
<Link href="/page" size="md">Medium Link</Link>
<Link href="/page" size="lg">Large Link</Link>
```

### Disabled State

```tsx
<Link href="/page" disabled>
  Disabled Link
</Link>
```

### In Paragraphs

```tsx
<p>
  This is a paragraph with an{' '}
  <Link href="/example" variant="inline">inline link</Link>
  {' '}that flows naturally.
</p>
```

### Special Link Types

```tsx
{/* Email */}
<Link href="mailto:hello@example.com">Email Us</Link>

{/* Phone */}
<Link href="tel:+1234567890">Call Us</Link>

{/* Anchor/Hash */}
<Link href="#section">Jump to Section</Link>

{/* Download */}
<Link href="/file.pdf" download>Download PDF</Link>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'underline' \| 'muted' \| 'inline'` | `'default'` | Visual variant of the link |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the link text |
| `external` | `boolean` | `false` | Adds external icon and opens in new tab |
| `disabled` | `boolean` | `false` | Disables the link interaction |
| `href` | `string` | - | URL to navigate to |
| `children` | `ReactNode` | - | Link content |
| `className` | `string` | `''` | Additional CSS classes |

All standard HTML anchor attributes are also supported.

## Accessibility

### ARIA Attributes

- `aria-disabled`: Set to `true` when link is disabled
- `aria-label`: Automatically added for external links to indicate "opens in new tab"

### Keyboard Navigation

- **Tab**: Focus the link
- **Enter**: Activate the link (when not disabled)
- **Shift + Tab**: Focus previous element

### Focus Management

- Visible focus ring (blue) with offset
- Disabled links have `tabIndex={-1}` to prevent focus
- Focus styles meet WCAG 2.4.7 (Focus Visible) requirements

### Screen Reader Support

- External links announce "opens in new tab"
- Disabled state is properly announced
- External icon has `aria-hidden="true"` to prevent duplicate announcements

## Styling

### Visited State

All link variants (except `inline`) have distinct visited states:
- Default: Purple color for visited links
- Maintains good contrast ratios
- Helps users understand navigation history

### Dark Mode

Fully supports dark mode with appropriate color adjustments:
- Light blue links in dark mode
- Proper contrast maintained
- Muted variant uses gray palette

### States

- **Hover**: Color darkens
- **Focus**: Blue ring with offset
- **Active**: Native browser active state
- **Visited**: Purple tint (for default/underline variants)
- **Disabled**: 50% opacity, no pointer events

## Best Practices

### When to Use

- Navigation between pages
- External resource links
- Email and phone links
- Document downloads
- Anchor navigation within a page

### When Not to Use

- For actions that don't navigate (use `Button` instead)
- For submitting forms (use `<button type="submit">`)
- For toggling UI state (use `Button` or custom controls)

### Variant Selection

- **Default**: General navigation links
- **Underline**: Important links that need emphasis
- **Muted**: Secondary navigation, footer links
- **Inline**: Links within body text

### External Links

Always use `external` prop for links that:
- Point to different domains
- Open external resources
- Lead users away from your app

This ensures:
- Security (`rel="noopener noreferrer"`)
- User awareness (external icon)
- Proper accessibility announcements

## Examples

### Navigation Bar

```tsx
<nav>
  <Link href="/">Home</Link>
  <Link href="/about">About</Link>
  <Link href="/services">Services</Link>
  <Link href="/contact">Contact</Link>
</nav>
```

### Footer

```tsx
<footer>
  <Link href="/privacy" variant="muted">Privacy Policy</Link>
  <Link href="/terms" variant="muted">Terms of Service</Link>
  <Link href="https://twitter.com" variant="muted" external>Twitter</Link>
</footer>
```

### Article Content

```tsx
<article>
  <p>
    For more information, visit our{' '}
    <Link href="/docs" variant="inline">documentation</Link>
    {' '}or check out our{' '}
    <Link href="https://github.com/example" variant="inline" external>
      GitHub repository
    </Link>.
  </p>
</article>
```

## Performance

- Minimal bundle size
- No JavaScript required for basic functionality
- CSS-only hover/focus states
- Optimized re-renders with React.memo (if needed)

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 with polyfills
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing

Comprehensive test coverage includes:
- All variants and sizes
- External link behavior
- Disabled state
- Accessibility (axe-core)
- Keyboard navigation
- Edge cases (mailto, tel, hash, etc.)

Run tests:
```bash
npm test Link.test.tsx
```
