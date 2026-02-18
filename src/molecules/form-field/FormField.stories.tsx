import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = { args: { label: "Email", placeholder: "email@example.com" } };
export const WithError: Story = { args: { label: "Email", error: "Email is required" } };
export const WithDescription: Story = { args: { label: "Username", description: "Choose a unique username" } };
