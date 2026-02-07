# Accessibility Guide

> Synkra DS targets WCAG 2.1 AA compliance

## Principles

1. **Perceivable** - All content accessible to screen readers
2. **Operable** - Full keyboard navigation support
3. **Understandable** - Clear labels, errors, and states
4. **Robust** - Semantic HTML + ARIA where needed

## Component Accessibility

### Button
- Uses native `<button>` element
- `aria-busy="true"` during loading state
- `disabled` attribute properly handled
- Focus ring: `focus-visible:ring-2 ring-border-emphasis`
- Supports `asChild` for rendering as `<a>` with button behavior

### Input
- Native `<input>` element with proper `type`
- `aria-invalid="true"` on error state
- Focus border: `border-emphasis` token
- Associated with `<label>` via `id` when used in FormField

### Checkbox
- Built on `@radix-ui/react-checkbox` (fully accessible)
- `role="checkbox"` with `aria-checked` states
- Supports `indeterminate` state
- Keyboard: Space to toggle

### Switch
- Built on `@radix-ui/react-switch`
- `role="switch"` with `data-state` attributes
- Keyboard: Space to toggle
- Always requires `aria-label` or associated label

### Card
- Semantic `<div>` containers
- Heading hierarchy via `CardTitle`
- Content structure: Header → Content → Footer

### Badge
- Decorative by default (informational)
- Sufficient color contrast for all variants
- Gradient variants include `text-white` for contrast

### FormField
- Auto-associates `<label>` with `<input>` via `htmlFor`
- Helper text connected via `aria-describedby`
- Error messages use `role="alert"` for live announcements
- Required indicator: `*` visual + `required` on input

### Sidebar
- Uses `<aside>` landmark element
- `<nav>` wrapping navigation items
- `aria-current="page"` on active item
- `data-collapsed` for state tracking
- Keyboard: Tab through items, Enter/Space to activate

### LoginForm
- Error banner uses `role="alert"` for screen reader announcement
- Form fields properly labeled
- Submit button shows loading state with `aria-busy`
- `autoComplete` attributes for browser autofill

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move focus forward |
| Shift+Tab | Move focus backward |
| Enter/Space | Activate button, toggle checkbox/switch |
| Escape | Close dropdowns (future components) |

## Focus Management

All interactive components use a consistent focus ring:
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-border-emphasis
focus-visible:ring-offset-2
focus-visible:ring-offset-bg-base
```

## Color Contrast

| Pair | Ratio | Status |
|------|-------|--------|
| Text Primary on BG Base | 18.1:1 | AAA |
| Text Secondary on BG Base | 6.2:1 | AA |
| Primary on BG Base | 8.4:1 | AAA |
| Error on BG Base | 5.1:1 | AA |
| Success on BG Base | 7.3:1 | AAA |

## Testing

Run accessibility audits with Storybook addon-a11y:
```bash
npm run storybook
# Check the "Accessibility" tab on each story
```
