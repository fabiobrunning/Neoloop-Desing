# Card

> Atom | Content container

## Import

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `Card` | `<div>` | Root container |
| `CardHeader` | `<div>` | Header section |
| `CardTitle` | `<h3>` | Card heading |
| `CardDescription` | `<p>` | Subtitle/description |
| `CardContent` | `<div>` | Main content |
| `CardFooter` | `<div>` | Footer with actions |

## Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
    <CardDescription>Manage your preferences</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Form fields */}
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

## Styling

- Background: `bg-bg-elevated`
- Border: `border-border`
- Radius: `rounded-xl`
- Shadow: `shadow-sm`

## Tests: 8 | Stories: 4
