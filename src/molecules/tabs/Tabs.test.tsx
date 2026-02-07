import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

describe("Tabs", () => {
  const renderTabs = (defaultValue = "tab1") => (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );

  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders all tab triggers", () => {
    render(renderTabs());
    expect(screen.getByRole("tab", { name: /tab 1/i })).toBeDefined();
    expect(screen.getByRole("tab", { name: /tab 2/i })).toBeDefined();
    expect(screen.getByRole("tab", { name: /tab 3/i })).toBeDefined();
  });

  it("renders the tablist", () => {
    render(renderTabs());
    expect(screen.getByRole("tablist")).toBeDefined();
  });

  it("shows default tab content", () => {
    render(renderTabs());
    expect(screen.getByText("Content 1")).toBeDefined();
  });

  // ── Interaction ────────────────────────────────────────────────────────

  it("switches content when clicking another tab", async () => {
    const user = userEvent.setup();
    render(renderTabs());
    await user.click(screen.getByRole("tab", { name: /tab 2/i }));
    expect(screen.getByText("Content 2")).toBeDefined();
  });

  it("marks active tab with data-state=active", () => {
    render(renderTabs());
    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    expect(tab1.getAttribute("data-state")).toBe("active");
  });

  // ── Disabled ───────────────────────────────────────────────────────────

  it("disables tab when disabled prop is set", () => {
    render(renderTabs());
    const tab3 = screen.getByRole("tab", { name: /tab 3/i });
    expect(tab3.hasAttribute("disabled")).toBe(true);
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it("has tabpanel role on content", () => {
    render(renderTabs());
    expect(screen.getByRole("tabpanel")).toBeDefined();
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className to TabsList", () => {
    render(
      <Tabs defaultValue="t1">
        <TabsList className="custom-list">
          <TabsTrigger value="t1">T1</TabsTrigger>
        </TabsList>
        <TabsContent value="t1">C1</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist").className).toContain("custom-list");
  });
});
