# PaymentIcon

Renders payment method brand icons (Visa, Mastercard, PayPal, etc.) from bundled SVG assets.

## Import

```tsx
import { PaymentIcon } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `method` | `string` | — | Payment method name (e.g., "Visa", "Mastercard") |
| `size` | `number` | `40` | Icon height in pixels |
| `alt` | `string` | Method name | Alt text for accessibility |
| `className` | `string` | — | Additional CSS classes |

## Examples

```tsx
<PaymentIcon method="Visa" />
<PaymentIcon method="Mastercard" size={60} />
<PaymentIcon method="PayPal" alt="Pay with PayPal" />
```

## Available Methods

Visa, Mastercard, AMEX, PayPal, GooglePay, ApplePay, Bitcoin, Stripe, Boleto, Pix, and more.

## Accessibility

- Uses `<img>` with alt text (defaults to method name)
- Lazy loading enabled by default
