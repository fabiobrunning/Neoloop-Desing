import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { colors } from "../tokens/tokens";

type GroupKey = keyof typeof colors;

function textColor(hex: string): string {
  const rgb = hex.replace("#", "").match(/.{2}/g)!.map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return lum > 0.18 ? "#000000" : "#ffffff";
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          backgroundColor: hex,
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <span style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: textColor(hex), opacity: 0.8 }}>
          {hex.toUpperCase()}
        </span>
      </div>
      <span style={{ fontSize: 10, color: "var(--color-muted-foreground)", textAlign: "center", maxWidth: 72, lineHeight: 1.2 }}>
        {name}
      </span>
    </div>
  );
}

function ColorGroup({ title, entries }: { title: string; entries: Record<string, string> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--color-foreground)", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {title} ({Object.keys(entries).length})
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {Object.entries(entries).map(([name, hex]) => (
          <ColorSwatch key={name} name={name} hex={hex as string} />
        ))}
      </div>
    </div>
  );
}

function ColorSystemPage() {
  const groups = Object.entries(colors).filter(([key]) => key !== "gradient") as [string, Record<string, string>][];

  return (
    <div style={{ padding: 32, backgroundColor: "var(--color-background)", color: "var(--color-foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px" }}>watchOS Color Palette</h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", margin: "0 0 32px" }}>79 cores extraidas do design-tokens-colors.css + gradiente badge</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {groups.map(([key, entries]) => (
          <ColorGroup key={key} title={key} entries={entries} />
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Gradient Badge</h3>
        <div style={{ width: 200, height: 40, borderRadius: 20, background: colors.gradient.badge, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
          BADGE GRADIENT
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Docs/Color System",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", backgrounds: { disable: true } },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <ColorSystemPage />,
};
