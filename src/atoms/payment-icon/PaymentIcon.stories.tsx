import type { Meta, StoryObj } from "@storybook/react";
import { PaymentIcon, PAYMENT_METHODS } from "./PaymentIcon";

const meta: Meta<typeof PaymentIcon> = {
  title: "Atoms/PaymentIcon",
  component: PaymentIcon,
  tags: ["autodocs"],
  argTypes: {
    method: { control: "select", options: [...PAYMENT_METHODS] },
    size: { control: { type: "range", min: 20, max: 80, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentIcon>;

export const Default: Story = {
  args: { method: "Visa", size: 40 },
};

export const AllMethods: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
      {PAYMENT_METHODS.map((method) => (
        <div key={method} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <PaymentIcon method={method} size={40} />
          <span className="text-xs text-text-muted">{method}</span>
        </div>
      ))}
    </div>
  ),
};

export const CheckoutRow: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
      <span className="text-sm text-text-secondary mr-2">We accept:</span>
      <PaymentIcon method="Visa" size={32} />
      <PaymentIcon method="Mastercard" size={32} />
      <PaymentIcon method="AMEX" size={32} />
      <PaymentIcon method="PayPal" size={32} />
      <PaymentIcon method="ApplePay" size={32} />
      <PaymentIcon method="GooglePay" size={32} />
    </div>
  ),
};
