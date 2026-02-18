import * as React from "react";
import { cn } from "../../lib/utils";
import type { PaymentName } from "../../assets/logos";

const paymentFileMap: Record<PaymentName, string> = {
  Alipay: "Size=large, Payment method=Alipay.svg",
  Amazon: "Size=large, Payment method=Amazon.svg",
  AMEX: "Size=large, Payment method=AMEX.svg",
  ApplePay: "Size=large, Payment method=ApplePay.svg",
  Bitcoin: "Size=large, Payment method=Bitcoin.svg",
  Etherium: "Size=large, Payment method=Etherium.svg",
  GooglePay: "Size=large, Payment method=GooglePay.svg",
  Maestro: "Size=large, Payment method=Maestro.svg",
  Mastercard: "Size=large, Payment method=Mastercard.svg",
  PayPal: "Size=large, Payment method=PayPal.svg",
  Stripe: "Size=large, Payment method=Stripe.svg",
  Visa: "Size=large, Payment method=Visa.svg",
};

export interface PaymentIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: PaymentName;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: 24, md: 40, lg: 56 } as const;

const PaymentIcon = React.forwardRef<HTMLImageElement, PaymentIconProps>(
  ({ name, size = "md", className, alt, ...props }, ref) => {
    const px = sizeMap[size];
    const filename = paymentFileMap[name];
    const src = new URL(
      `../../assets/logos/payment/${filename}`,
      import.meta.url,
    ).href;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt || name}
        width={px}
        height={px}
        className={cn("inline-block", className)}
        {...props}
      />
    );
  },
);
PaymentIcon.displayName = "PaymentIcon";

export { PaymentIcon };
