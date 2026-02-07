import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    placeholder: { control: "text" },
    rows: { control: "number" },
  },
  args: {
    placeholder: "Type your message...",
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithRows: Story = {
  args: { rows: 6, placeholder: "Write a detailed description..." },
};

export const Disabled: Story = {
  args: { disabled: true, value: "This is read-only content" },
};

export const ErrorState: Story = {
  args: { error: true, placeholder: "This field has an error" },
};

export const WithContent: Story = {
  args: {
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rows: 4,
  },
};

export const MaxLength: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Textarea maxLength={200} placeholder="Max 200 characters..." />
      <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textAlign: "right" }}>
        0/200
      </span>
    </div>
  ),
};
