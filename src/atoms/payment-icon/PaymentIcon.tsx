import * as React from "react";
import { cn } from "../../lib/utils";

const PAYMENT_METHODS = [
  "AMEX", "Alipay", "Amazon", "ApplePay", "Bitcoin",
  "Etherium", "GooglePay", "Maestro", "Mastercard",
  "PayPal", "Stripe", "Visa",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface PaymentIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Payment method name */
  method: PaymentMethod;
  /** Size in pixels (default 40 — payment icons are wider) */
  size?: number;
}

function PaymentIcon({
  method,
  size = 40,
  className,
  alt,
  ...props
}: PaymentIconProps) {
  const src = `/assets/Logos/pagamento/Size=large, Payment method=${method}.svg`;

  return (
    <img
      src={src}
      alt={alt ?? method}
      height={size}
      className={cn("inline-block shrink-0", className)}
      loading="lazy"
      {...props}
    />
  );
}

PaymentIcon.displayName = "PaymentIcon";

export { PaymentIcon, PAYMENT_METHODS };
