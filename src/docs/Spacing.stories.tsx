import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { spacing } from "../tokens/tokens";

function SpacingPage() {
  return (
    <div style={{ padding: 32, backgroundColor: "var(--color-background)", color: "var(--color-foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px" }}>Spacing Scale</h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", margin: "0 0 32px" }}>
        Base 4px spacing system
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 80, fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--color-muted-foreground)" }}>
              spacing-{key}
            </div>
            <div style={{ width: 50, fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--color-foreground)" }}>
              {value}
            </div>
            <div
              style={{
                width: parseInt(value),
                height: 24,
                backgroundColor: "var(--color-accent)",
                borderRadius: 4,
                opacity: 0.8,
                minWidth: 2,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Docs/Spacing",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", backgrounds: { disable: true } },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <SpacingPage />,
};
