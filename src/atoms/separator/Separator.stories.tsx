import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {};
export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
