import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { "aria-label": "Toggle feature" } };
export const Checked: Story = { args: { defaultChecked: true, "aria-label": "On" } };
export const Disabled: Story = { args: { disabled: true, "aria-label": "Disabled" } };
