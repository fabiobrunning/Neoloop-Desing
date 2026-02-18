import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="r1" />
        <label htmlFor="r1">Option A</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="r2" />
        <label htmlFor="r2">Option B</label>
      </div>
    </RadioGroup>
  ),
};
