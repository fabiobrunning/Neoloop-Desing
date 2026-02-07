# LoginForm

> Organism | Authentication form

## Import

```tsx
import { LoginForm } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Welcome back"` | Card title |
| `description` | `string` | `"Enter your credentials..."` | Card subtitle |
| `submitLabel` | `string` | `"Sign in"` | Button text |
| `loading` | `boolean` | `false` | Loading state on submit |
| `error` | `string` | - | Error banner message |
| `onSubmit` | `(data: { email, password }) => void` | - | Submit handler |
| `showForgotPassword` | `boolean` | `true` | Show forgot link |
| `onForgotPassword` | `() => void` | - | Forgot click handler |
| `footer` | `ReactNode` | - | Footer content |

## Usage

```tsx
<LoginForm
  title="Lendario"
  description="Access your premium account"
  onSubmit={({ email, password }) => login(email, password)}
  onForgotPassword={() => navigate("/forgot")}
  footer={
    <p>
      New here? <a href="/signup">Create account</a>
    </p>
  }
/>
```

## Composition

Composes: `Card` + `FormField` + `Button`

- Email field with `autoComplete="email"`
- Password field with `autoComplete="current-password"`
- Error banner with `role="alert"`
- Loading state disables submit

## Tests: 12 | Stories: 7
