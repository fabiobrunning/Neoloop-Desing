import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Icon } from "../atoms/icon/Icon";
import { iconRegistry, type IconName } from "../icons";

function IconGalleryPage() {
  const [search, setSearch] = React.useState("");
  const names = Object.keys(iconRegistry) as IconName[];
  const filtered = names.filter((n) => n.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 32, backgroundColor: "var(--color-background)", color: "var(--color-foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px" }}>Icon Gallery</h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", margin: "0 0 24px" }}>
        {names.length} icons available
      </p>

      <input
        type="text"
        placeholder="Search icons..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-foreground)",
          fontSize: 14,
          marginBottom: 24,
          outline: "none",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8 }}>
        {filtered.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: 12,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <Icon name={name} size={24} />
            <span style={{ fontSize: 9, color: "var(--color-muted-foreground)", textAlign: "center", lineHeight: 1.2, wordBreak: "break-all" }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", textAlign: "center", padding: 40 }}>
          No icons found for "{search}"
        </p>
      )}
    </div>
  );
}

const meta: Meta = {
  title: "Docs/Icon Gallery",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", backgrounds: { disable: true } },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <IconGalleryPage />,
};
