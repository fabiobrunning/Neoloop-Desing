# AuthLayout

> Template | Split-screen authentication layout with side panel and form area

## Import

```tsx
import { AuthLayout } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `ReactNode` | - | Brand logo or element (visible on mobile) |
| `heading` | `string` | - | Heading text displayed above the form area |
| `subheading` | `string` | - | Subheading / description text below the heading |
| `sideContent` | `ReactNode` | Default Synkra branding | Side panel content (illustration, testimonial, etc.) |
| `sideBg` | `string` | - | Side panel background class (gradient, image, etc.) |
| `footer` | `ReactNode` | - | Footer content (links, copyright) |
| `className` | `string` | - | Additional CSS classes for the root container |
| `children` | `ReactNode` | - | Form content rendered in the main panel |

## Usage

```tsx
<AuthLayout
  brand="Synkra"
  heading="Welcome back"
  subheading="Enter your credentials to access your account."
  footer={<span>&copy; 2026 Synkra. All rights reserved.</span>}
>
  <form className="flex flex-col gap-4">
    <FormField id="email" label="Email" inputProps={{ type: "email", placeholder: "you@example.com" }} />
    <FormField id="password" label="Password" inputProps={{ type: "password", placeholder: "********" }} />
    <Button type="submit" className="w-full mt-2">Sign in</Button>
  </form>
</AuthLayout>
```

## Layout Structure

```
+---------------------------+---------------------------+
| Side Panel (lg:w-1/2)     | Form Panel (w-full/lg:1/2)|
| hidden on mobile           |                           |
| bg-bg-elevated             | +--- Brand bar (p-6) ---+ |
| border-r                   | | [brand] (mobile only)  | |
|                            | +------------------------+ |
| [sideContent]              |                           |
| or default Synkra branding | +--- Form area (flex-1) -+ |
|                            | | max-w-sm centered       | |
|                            | | [heading]               | |
|                            | | [subheading]            | |
|                            | | [children]              | |
|                            | +-------------------------+ |
|                            |                           |
|                            | +--- Footer (border-t) --+ |
|                            | | [footer] (if provided)  | |
|                            | +-------------------------+ |
+---------------------------+---------------------------+
```

## Composes

- Uses `cn` utility from `lib/utils`

## Accessibility

- Uses semantic `<h1>` for the heading
- Supports `ref` forwarding via `React.forwardRef`
- Passes through all native HTML div attributes

## Tests: 11 | Stories: 4
