import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { typography } from "../tokens/tokens";

function TypographyPage() {
  return (
    <div style={{ padding: 32, backgroundColor: "var(--color-background)", color: "var(--color-foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px" }}>Typography Scale</h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", margin: "0 0 32px" }}>
        Inter (300-800) + JetBrains Mono (400,500,700)
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Object.entries(typography.scale).map(([name, { size, weight, lineHeight }]) => (
          <div key={name} style={{ display: "flex", alignItems: "baseline", gap: 24, borderBottom: "1px solid var(--color-border)", paddingBottom: 12 }}>
            <div style={{ width: 120, flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-muted-foreground)" }}>{name}</div>
              <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--color-muted-foreground)", opacity: 0.6 }}>
                {size} / {weight} / {lineHeight}
              </div>
            </div>
            <div style={{ fontSize: size, fontWeight: weight, lineHeight }}>
              The quick brown fox
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 16px" }}>Font Weights</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.entries(typography.fontWeight).map(([name, weight]) => (
            <div key={name} style={{ fontSize: 18, fontWeight: weight }}>
              {name} ({weight}) — The quick brown fox jumps over the lazy dog
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Docs/Typography",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", backgrounds: { disable: true } },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <TypographyPage />,
};
