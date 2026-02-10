import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["primary", "success", "warning", "error", "info"] },
    indeterminate: { control: "boolean" },
  },
  args: { value: 60, size: "md", color: "primary" },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm", value: 40 } };

export const Large: Story = { args: { size: "lg", value: 80 } };

export const Success: Story = { args: { color: "success", value: 100 } };

export const Warning: Story = { args: { color: "warning", value: 65 } };

export const Error: Story = { args: { color: "error", value: 30 } };

export const Indeterminate: Story = { args: { indeterminate: true } };

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
      <Progress color="primary" value={80} />
      <Progress color="success" value={100} />
      <Progress color="warning" value={65} />
      <Progress color="error" value={30} />
      <Progress color="info" value={50} />
    </div>
  ),
};
