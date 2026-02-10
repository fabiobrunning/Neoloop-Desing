# SignupForm

Registration form organism composing Card, FormField, Button, and Checkbox.

## Import

```tsx
import { SignupForm } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Create account"` | Card title |
| `description` | `string` | `"Enter your details to get started"` | Card description |
| `submitLabel` | `string` | `"Sign up"` | Submit button label |
| `loading` | `boolean` | `false` | Loading state |
| `error` | `string` | — | Error message banner |
| `onSubmit` | `(data: SignupFormData) => void` | — | Called with form data |
| `showTerms` | `boolean` | `true` | Show terms checkbox |
| `termsLabel` | `ReactNode` | Default terms text | Custom terms label |
| `footer` | `ReactNode` | — | Footer content |

## SignupFormData

```ts
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

## Examples

```tsx
<SignupForm
  onSubmit={(data) => console.log(data)}
  footer={<a href="/login">Already have an account?</a>}
/>
```

## Validation

Built-in client-side validation:
- Name required
- Email required
- Password minimum 8 characters
- Password confirmation must match
- Terms acceptance required (when shown)

## Accessibility

- Form fields with proper labels and `aria-describedby`
- Error messages with `role="alert"`
- Required fields indicated
