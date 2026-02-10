import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ── Variants ────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { children: "B", "aria-label": "Toggle bold" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "B", "aria-label": "Toggle bold" },
};

// ── With Icon ───────────────────────────────────────────────────────────

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
  name: "With Icon",
};

// ── States ──────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true, children: "B", "aria-label": "Toggle bold" },
};

// ── Sizes ───────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: "sm", children: "B", "aria-label": "Toggle bold" },
};

export const Large: Story = {
  args: { size: "lg", children: "B", "aria-label": "Toggle bold" },
};
