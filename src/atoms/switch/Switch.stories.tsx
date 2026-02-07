import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Visual size",
    },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    defaultChecked: false,
    "aria-label": "Toggle",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ── Sizes ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { "aria-label": "Default toggle" },
};

export const Small: Story = {
  args: { size: "sm", "aria-label": "Small toggle" },
};

export const Checked: Story = {
  args: { defaultChecked: true, "aria-label": "Checked toggle" },
};

// ── States ──────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Disabled toggle" },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, "aria-label": "Disabled checked" },
};

// ── Compositions ────────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: () => (
    <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-text-primary)" }}>
      <Switch />
      <span>Enable notifications</span>
    </label>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Switch size="sm" aria-label="Small" defaultChecked />
      <Switch size="md" aria-label="Medium" defaultChecked />
    </div>
  ),
};
