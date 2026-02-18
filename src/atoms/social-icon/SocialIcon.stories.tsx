import type { Meta, StoryObj } from "@storybook/react";
import { SocialIcon } from "./SocialIcon";
import { socialNames } from "../../assets/logos";

const meta: Meta<typeof SocialIcon> = {
  title: "Atoms/SocialIcon",
  component: SocialIcon,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["black", "color", "white"] },
    size: { control: { type: "range", min: 16, max: 64 } },
  },
};
export default meta;
type Story = StoryObj<typeof SocialIcon>;

export const Default: Story = {
  args: { name: "GitHub", variant: "color", size: 32 },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {socialNames.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <SocialIcon name={name} variant="color" size={32} />
          <span style={{ fontSize: 10, color: "var(--color-muted-foreground)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      {(["black", "color", "white"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 16, borderRadius: 8, backgroundColor: variant === "white" ? "#1a1e30" : "transparent" }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "var(--color-muted-foreground)" }}>{variant}</span>
          <SocialIcon name="GitHub" variant={variant} size={32} />
          <SocialIcon name="Discord" variant={variant} size={32} />
          <SocialIcon name="X" variant={variant} size={32} />
        </div>
      ))}
    </div>
  ),
};
