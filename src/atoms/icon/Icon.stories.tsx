import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { iconRegistry } from "../../icons";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: Object.keys(iconRegistry) },
    size: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = { args: { name: "home", size: 24 } };

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(Object.keys(iconRegistry) as Array<keyof typeof iconRegistry>).map((name) => (
        <div key={name} className="flex flex-col items-center gap-1 p-2">
          <Icon name={name} size={24} />
          <span className="text-xs text-[var(--color-muted-foreground)]">{name}</span>
        </div>
      ))}
    </div>
  ),
};
