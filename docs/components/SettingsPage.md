# SettingsPage

> Template | Settings page with sidebar navigation and section-based content areas

## Import

```tsx
import { SettingsPage, SettingsSection } from "synkra-ds";
```

## Props

### SettingsPage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Settings"` | Page title |
| `description` | `string` | - | Page description displayed below the title |
| `navItems` | `SettingsNavItem[]` | `[]` | Navigation items for settings sections |
| `activeSection` | `string` | - | Currently active section value |
| `onSectionChange` | `(value: string) => void` | - | Section change handler |
| `headerActions` | `ReactNode` | - | Header actions (save button, etc.) |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Main content area |

### SettingsNavItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Display label |
| `value` | `string` | - | Unique value/key |
| `icon` | `ReactNode` | - | Icon element |

### SettingsSection

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Section title |
| `description` | `string` | - | Section description |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Section content |

## Usage

```tsx
const navItems = [
  { label: "General", value: "general" },
  { label: "Profile", value: "profile" },
  { label: "Security", value: "security" },
];

const [section, setSection] = React.useState("general");

<SettingsPage
  title="Settings"
  description="Manage your account settings and preferences."
  navItems={navItems}
  activeSection={section}
  onSectionChange={setSection}
  headerActions={<Button size="sm">Save changes</Button>}
>
  <SettingsSection title="General" description="Basic account settings.">
    <Input id="display-name" defaultValue="Fabio Brunning" />
  </SettingsSection>
  <SettingsSection title="Notifications" description="Choose what notifications you receive.">
    <Switch defaultChecked />
  </SettingsSection>
</SettingsPage>
```

## Layout Structure

```
+-----------------------------------------------------+
| Header (border-b, bg-bg-elevated, px-6 py-6)        |
| max-w-5xl centered                                  |
| [title]                          [headerActions]     |
| [description]                                        |
+-----------------------------------------------------+
| Content area (max-w-5xl, px-6 py-8)                  |
| +----------+--------------------------------------+  |
| | Nav      | Main content (flex-1)                |  |
| | (md:w-56)|                                      |  |
| |          | +--SettingsSection (rounded border)-+ |  |
| | General* | | [title]                           | |  |
| | Profile  | | [description]                     | |  |
| | Security | | [children]                        | |  |
| |          | +-----------------------------------+ |  |
| +----------+--------------------------------------+  |
+-----------------------------------------------------+
* = active (bg-primary/10, text-primary)
Nav is horizontal scroll on mobile, vertical on md+
```

## Composes

- `SettingsSection` is an exported sub-component for structuring content

## Accessibility

- Navigation uses semantic `<nav>` element with `aria-label="Settings navigation"`
- Active section button marked with `aria-current="true"`
- Uses semantic `<h1>` for page title, `<h2>` for section titles
- Navigation items rendered as `<button>` elements within `<ul>/<li>` list
- Supports `ref` forwarding on both `SettingsPage` and `SettingsSection`

## Tests: 15 | Stories: 3
