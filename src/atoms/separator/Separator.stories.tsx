import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "When true, renders role=none instead of role=separator",
    },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

// ── Stories ──────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [
    (Story) => (
      <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
        <Story />
      </div>
    ),
  ],
};

export const InContent: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <div>
        <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
          Synkra Design System
        </h4>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
          An open-source component library built with Radix UI and Tailwind CSS.
        </p>
      </div>
      <Separator className="my-4" />
      <div style={{ display: "flex", height: "20px", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "14px" }}>Docs</span>
        <Separator orientation="vertical" />
        <span style={{ fontSize: "14px" }}>Source</span>
        <Separator orientation="vertical" />
        <span style={{ fontSize: "14px" }}>Changelog</span>
      </div>
    </div>
  ),
};
