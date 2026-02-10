import type { Meta, StoryObj } from "@storybook/react";
import { SocialIcon, SOCIAL_NETWORKS } from "./SocialIcon";

const meta: Meta<typeof SocialIcon> = {
  title: "Atoms/SocialIcon",
  component: SocialIcon,
  tags: ["autodocs"],
  argTypes: {
    network: { control: "select", options: [...SOCIAL_NETWORKS] },
    variant: { control: "select", options: ["colorida", "black", "white"] },
    size: { control: { type: "range", min: 16, max: 64, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof SocialIcon>;

export const Default: Story = {
  args: { network: "GitHub", size: 32 },
};

export const AllNetworks: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
      {SOCIAL_NETWORKS.map((network) => (
        <div key={network} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <SocialIcon network={network} size={32} />
          <span className="text-xs text-text-muted">{network}</span>
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px" }}>
      {(["colorida", "black", "white"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span className="text-xs text-text-muted font-semibold uppercase">{variant}</span>
          <div style={{ display: "flex", gap: "8px", padding: variant === "white" ? "8px" : undefined, background: variant === "white" ? "#1a1a1f" : undefined, borderRadius: "8px" }}>
            <SocialIcon network="GitHub" variant={variant} size={24} />
            <SocialIcon network="Discord" variant={variant} size={24} />
            <SocialIcon network="LinkedIn" variant={variant} size={24} />
            <SocialIcon network="X" variant={variant} size={24} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      {[16, 20, 24, 32, 48].map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <SocialIcon network="Instagram" size={size} />
          <span className="text-xs text-text-muted">{size}px</span>
        </div>
      ))}
    </div>
  ),
};
