# Synkra DS - Pattern Library

> Design System for Lendario brand | v0.3.0

## Overview

Synkra DS is a component library built with **Atomic Design** methodology, using **Tailwind CSS v4**, **Radix UI** primitives, and **CVA** for variant management.

| Metric | Value |
|--------|-------|
| Components | 41+ |
| Design Tokens | 180+ |
| Test Coverage | 491 tests (100% passing) |
| Accessibility | WCAG AA compliant |
| CSS Approach | Tailwind v4 + CSS tokens |
| Theming | Dark / Light / System |

## Architecture

```
Atoms → Molecules → Organisms → Templates → Pages
```

### Atoms (18)
- [Button](./components/Button.md) - Primary action element (6 variants, 4 sizes)
- [Input](./components/Input.md) - Text input field
- [Checkbox](./components/Checkbox.md) - Binary toggle with Radix
- [Card](./components/Card.md) - Content container (6 subcomponents)
- [Switch](./components/Switch.md) - Toggle switch with Radix
- [Badge](./components/Badge.md) - Status indicator with gradients
- [Select](./components/Select.md) - Dropdown selection input
- [Textarea](./components/Textarea.md) - Multi-line text input
- [Avatar](./components/Avatar.md) - User profile image with fallback
- [RadioGroup](./components/RadioGroup.md) - Radio button group with Radix
- [PaymentIcon](./components/PaymentIcon.md) - Payment method icons (12 brands)
- [SocialIcon](./components/SocialIcon.md) - Social network icons (85 logos)
- [Alert](./components/Alert.md) - Contextual feedback messages
- [Progress](./components/Progress.md) - Progress bar indicator
- [Skeleton](./components/Skeleton.md) - Loading placeholder with animation
- [Separator](./components/Separator.md) - Visual divider (horizontal/vertical)
- [Slider](./components/Slider.md) - Range input with Radix
- [Toggle](./components/Toggle.md) - Pressable toggle button (2 variants, 3 sizes)

### Molecules (8)
- [FormField](./components/FormField.md) - Label + Input + helper/error
- [Tabs](./components/Tabs.md) - Tabbed content navigation
- [Tooltip](./components/Tooltip.md) - Hover information popup
- [Popover](./components/Popover.md) - Click-triggered popup content
- [DropdownMenu](./components/DropdownMenu.md) - Action menu with submenus
- [Breadcrumb](./components/Breadcrumb.md) - Navigation breadcrumb trail
- [Accordion](./components/Accordion.md) - Expandable content sections
- [NavigationMenu](./components/NavigationMenu.md) - Horizontal nav with dropdowns

### Organisms (11)
- [Sidebar](./components/Sidebar.md) - Navigation sidebar (6 subcomponents)
- [LoginForm](./components/LoginForm.md) - Authentication form with validation
- [SignupForm](./components/SignupForm.md) - Registration form with validation
- [Dialog](./components/Dialog.md) - Modal dialog with overlay
- [AlertDialog](./components/AlertDialog.md) - Destructive action confirmation
- [Sheet](./components/Sheet.md) - Slide-over drawer (4 sides)
- [Toast](./components/Toast.md) - Notification toast with variants
- [DataTable](./components/DataTable.md) - Sortable data table
- [Navbar](./components/Navbar.md) - Top navigation bar
- [Footer](./components/Footer.md) - Page footer with link groups
- [Pagination](./components/Pagination.md) - Page navigation controls

### Templates (4)
- [DashboardLayout](./components/DashboardLayout.md) - Full-page dashboard layout
- [AuthLayout](./components/AuthLayout.md) - Authentication page layout
- [SettingsPage](./components/SettingsPage.md) - Settings page with nav sections
- [ErrorPage](./components/ErrorPage.md) - Error page (404, 500, etc.)

### Utilities
- [ChartConfig](./components/ChartConfig.md) - Chart theme with 10-color palette

## Quick Start

```tsx
import { Button, Input, Badge, ThemeProvider } from "synkra-ds";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Badge variant="success">Active</Badge>
      <Input placeholder="Email" />
      <Button variant="primary">Submit</Button>
    </ThemeProvider>
  );
}
```

## Related Docs

- [Getting Started](./getting-started.md)
- [Token Reference](./tokens.md)
- [Accessibility Guide](./accessibility.md)
- [Component References](./component-references.md)
