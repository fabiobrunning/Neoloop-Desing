import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "object" },
      description: "Default value (array of numbers)",
    },
    min: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Minimum value",
    },
    max: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Maximum value",
    },
    step: {
      control: { type: "number" },
      description: "Step increment",
    },
    disabled: { control: "boolean" },
  },
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    "aria-label": "Value",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultValue: [50],
    "aria-label": "Default slider",
  },
};

// ── With Value ───────────────────────────────────────────────────────────

export const WithValue: Story = {
  args: {
    defaultValue: [75],
    "aria-label": "Volume",
  },
};

// ── Range (two thumbs) ──────────────────────────────────────────────────

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    "aria-label": "Price range",
  },
};

// ── Disabled ─────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    "aria-label": "Disabled slider",
  },
};
