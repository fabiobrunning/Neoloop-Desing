import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" {...args}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-1" id="r1" />
        <label htmlFor="r1" className="text-sm text-text-secondary">
          Option 1
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-2" id="r2" />
        <label htmlFor="r2" className="text-sm text-text-secondary">
          Option 2
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-3" id="r3" />
        <label htmlFor="r3" className="text-sm text-text-secondary">
          Option 3
        </label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-1" id="d1" />
        <label htmlFor="d1" className="text-sm text-text-muted">
          Disabled selected
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-2" id="d2" />
        <label htmlFor="d2" className="text-sm text-text-muted">
          Disabled unselected
        </label>
      </div>
    </RadioGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <RadioGroup error>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-1" id="e1" error />
        <label htmlFor="e1" className="text-sm text-error">
          Required field
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-2" id="e2" error />
        <label htmlFor="e2" className="text-sm text-error">
          Required field
        </label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="a" orientation="horizontal" className="flex flex-row gap-4">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="a" id="h1" />
        <label htmlFor="h1" className="text-sm text-text-secondary">
          Small
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="b" id="h2" />
        <label htmlFor="h2" className="text-sm text-text-secondary">
          Medium
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="c" id="h3" />
        <label htmlFor="h3" className="text-sm text-text-secondary">
          Large
        </label>
      </div>
    </RadioGroup>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p className="text-xs text-text-muted mb-2">Default</p>
        <RadioGroup defaultValue="a">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RadioGroupItem value="a" aria-label="Selected" />
            <span className="text-sm text-text-secondary">Selected</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RadioGroupItem value="b" aria-label="Unselected" />
            <span className="text-sm text-text-secondary">Unselected</span>
          </div>
        </RadioGroup>
      </div>
      <div>
        <p className="text-xs text-text-muted mb-2">Disabled</p>
        <RadioGroup defaultValue="a" disabled>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RadioGroupItem value="a" aria-label="Disabled selected" />
            <span className="text-sm text-text-muted">Disabled selected</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RadioGroupItem value="b" aria-label="Disabled unselected" />
            <span className="text-sm text-text-muted">Disabled unselected</span>
          </div>
        </RadioGroup>
      </div>
      <div>
        <p className="text-xs text-text-muted mb-2">Error</p>
        <RadioGroup error>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RadioGroupItem value="a" aria-label="Error" error />
            <span className="text-sm text-error">Error state</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};
