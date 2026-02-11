import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "success", "warning", "error", "info", "gradient"],
      description: "Visual variant",
    },
    gradient: {
      control: "select",
      options: ["badge", "purple-blue", "hibiscus", "green-mint"],
      description: "Gradient preset (only for gradient variant)",
    },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ── Variants ────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: "default", children: "Default" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Success: Story = {
  args: { variant: "success", children: "Active" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Pending" },
};

export const Error: Story = {
  args: { variant: "error", children: "Failed" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

// ── Gradients ───────────────────────────────────────────────────────────

export const GradientBadge: Story = {
  args: { variant: "gradient", gradient: "badge", children: "Hot" },
};

export const GradientPurpleBlue: Story = {
  args: { variant: "gradient", gradient: "purple-blue", children: "Pro" },
};

export const GradientHibiscus: Story = {
  args: { variant: "gradient", gradient: "hibiscus", children: "Premium" },
};

// ── Compositions ────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="gradient" gradient="badge">Hot</Badge>
      <Badge variant="gradient" gradient="purple-blue">Pro</Badge>
      <Badge variant="gradient" gradient="hibiscus">Premium</Badge>
    </div>
  ),
};
