import type { Meta, StoryObj } from "@storybook/react";
import { PaymentIcon } from "./PaymentIcon";
import { paymentNames } from "../../assets/logos";

const meta: Meta<typeof PaymentIcon> = {
  title: "Atoms/PaymentIcon",
  component: PaymentIcon,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof PaymentIcon>;

export const Default: Story = {
  args: { name: "Visa", size: "lg" },
};

export const AllPayments: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {paymentNames.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <PaymentIcon name={name} size="lg" />
          <span style={{ fontSize: 10, color: "var(--color-muted-foreground)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
