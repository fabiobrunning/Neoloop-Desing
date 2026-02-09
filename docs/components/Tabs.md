# Tabs

> Molecule | Compound component for organizing content into selectable tabbed panels

## Import

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "synkra-ds";
```

## Subcomponents

| Subcomponent | Description |
|--------------|-------------|
| `Tabs` | Root container. Wraps `@radix-ui/react-tabs` Root. Accepts `defaultValue` and `value` to control the active tab. |
| `TabsList` | Row of tab triggers. Renders with `tablist` role, rounded surface background, muted text. |
| `TabsTrigger` | Individual tab button. Accepts `value` (required), `disabled`, and `className`. Active state shows elevated background, primary text, and shadow. |
| `TabsContent` | Panel displayed when its `value` matches the active tab. Renders with `tabpanel` role. |

## Usage

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Manage your account settings and preferences.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Change your password and security settings.</p>
  </TabsContent>
  <TabsContent value="settings">
    <p>Configure your application settings.</p>
  </TabsContent>
</Tabs>
```

## Features

- Compound component pattern built on `@radix-ui/react-tabs`
- Controlled (`value`) and uncontrolled (`defaultValue`) modes
- Active tab highlighted with elevated background, primary text color, and subtle shadow
- Disabled tabs via `disabled` prop on `TabsTrigger`
- Smooth transitions with `duration-fast`
- All subcomponents support `className` merging and `ref` forwarding

## Accessibility

- `TabsList` renders with `tablist` role
- Each `TabsTrigger` renders with `tab` role
- Each `TabsContent` renders with `tabpanel` role
- Active tab indicated via `data-state="active"` attribute
- Focus-visible outline on triggers and content panels (`outline-primary`)
- Keyboard navigation handled by Radix (Arrow keys, Home, End)

## Tests: 8 | Stories: 3
