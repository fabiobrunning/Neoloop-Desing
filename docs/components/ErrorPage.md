# ErrorPage

> Template | Full-screen error page with status code illustration, message, and action buttons

## Import

```tsx
import { ErrorPage } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `statusCode` | `number` | `404` | HTTP status code (drives default title, description, and illustration) |
| `title` | `string` | Auto-resolved by `statusCode` | Error title |
| `description` | `string` | Auto-resolved by `statusCode` | Error description |
| `illustration` | `ReactNode` | Auto-resolved by `statusCode` | Custom illustration or icon |
| `primaryAction` | `ReactNode` | - | Primary action (e.g., "Go Home" button) |
| `secondaryAction` | `ReactNode` | - | Secondary action (e.g., "Go Back" button) |
| `className` | `string` | - | Additional CSS classes |

### Default values by statusCode

| statusCode | title | description |
|------------|-------|-------------|
| `404` | "Page Not Found" | "The page you're looking for doesn't exist or has been moved." |
| `403` | "Forbidden" | "You don't have permission to access this page." |
| `500` | "Internal Server Error" | "Something went wrong on our end. Please try again later." |

## Usage

```tsx
<ErrorPage
  statusCode={404}
  primaryAction={<Button>Go Home</Button>}
  secondaryAction={<Button variant="ghost">Go Back</Button>}
/>
```

```tsx
// Custom error page
<ErrorPage
  statusCode={500}
  title="Oops! Something broke"
  description="We're working on fixing this. Please try again in a few minutes."
  illustration={<div className="text-8xl">🔧</div>}
  primaryAction={<Button>Try Again</Button>}
/>
```

## Layout Structure

```
+---------------------------------------------+
|                                             |
|         flex min-h-screen centered          |
|                                             |
|           [illustration]                    |
|           (mb-6, e.g. "404" large text)     |
|                                             |
|           [title] (h1, text-3xl)            |
|           [description] (max-w-md)          |
|                                             |
|         [primaryAction] [secondaryAction]   |
|           (flex gap-3, if provided)         |
|                                             |
+---------------------------------------------+
```

## Composes

- Contains internal helper components: `Default404`, `Default500` (not exported)

## Accessibility

- Root container has `role="alert"` for screen reader announcement
- Default illustrations use `aria-hidden="true"` to avoid reading decorative numbers
- Uses semantic `<h1>` for the error title
- Supports `ref` forwarding via `React.forwardRef`

## Tests: 17 | Stories: 5
