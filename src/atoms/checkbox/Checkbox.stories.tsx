import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { "aria-label": "Accept terms" } };
export const Checked: Story = { args: { defaultChecked: true, "aria-label": "Checked" } };
export const Disabled: Story = { args: { disabled: true, "aria-label": "Disabled" } };
