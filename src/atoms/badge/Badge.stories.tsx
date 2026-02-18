import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "destructive", "outline", "success"] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Badge" } };
export const Secondary: Story = { args: { children: "Secondary", variant: "secondary" } };
export const Destructive: Story = { args: { children: "Error", variant: "destructive" } };
export const Outline: Story = { args: { children: "Outline", variant: "outline" } };
export const Success: Story = { args: { children: "Success", variant: "success" } };
