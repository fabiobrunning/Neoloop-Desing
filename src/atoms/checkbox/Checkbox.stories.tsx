import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Story />
        <label className="text-sm text-text-secondary">Checkbox label</label>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { "aria-label": "Unchecked" },
};

export const Checked: Story = {
  args: { defaultChecked: true, "aria-label": "Checked" },
};

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Disabled" },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, "aria-label": "Disabled checked" },
};

export const WithError: Story = {
  args: { error: true, "aria-label": "Error" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox aria-label="Unchecked" />
        <span className="text-sm text-text-secondary">Unchecked</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox defaultChecked aria-label="Checked" />
        <span className="text-sm text-text-secondary">Checked</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox disabled aria-label="Disabled" />
        <span className="text-sm text-text-secondary">Disabled</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox error aria-label="Error" />
        <span className="text-sm text-text-secondary">Error</span>
      </div>
    </div>
  ),
};
