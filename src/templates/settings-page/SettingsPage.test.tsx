import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SettingsPage, SettingsSection } from "./SettingsPage";
import { axe } from "../../lib/test-utils";

const navItems = [
  { label: "General", value: "general" },
  { label: "Profile", value: "profile" },
  { label: "Security", value: "security" },
];

describe("SettingsPage", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders title", () => {
    render(<SettingsPage title="Settings" />);
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("renders default title when not provided", () => {
    render(<SettingsPage />);
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("renders description", () => {
    render(<SettingsPage description="Manage your account." />);
    expect(screen.getByText("Manage your account.")).toBeDefined();
  });

  it("renders children content", () => {
    render(
      <SettingsPage>
        <p>Content area</p>
      </SettingsPage>,
    );
    expect(screen.getByText("Content area")).toBeDefined();
  });

  // ── Navigation ─────────────────────────────────────────────────────────

  it("renders nav items", () => {
    render(<SettingsPage navItems={navItems} activeSection="general" />);
    expect(screen.getByText("General")).toBeDefined();
    expect(screen.getByText("Profile")).toBeDefined();
    expect(screen.getByText("Security")).toBeDefined();
  });

  it("marks active section with aria-current", () => {
    render(<SettingsPage navItems={navItems} activeSection="general" />);
    const generalBtn = screen.getByText("General");
    expect(generalBtn.getAttribute("aria-current")).toBe("true");
  });

  it("calls onSectionChange when nav item is clicked", () => {
    const onSectionChange = vi.fn();
    render(
      <SettingsPage
        navItems={navItems}
        activeSection="general"
        onSectionChange={onSectionChange}
      />,
    );
    fireEvent.click(screen.getByText("Profile"));
    expect(onSectionChange).toHaveBeenCalledWith("profile");
  });

  // ── Header Actions ─────────────────────────────────────────────────────

  it("renders header actions", () => {
    render(
      <SettingsPage headerActions={<button>Save</button>} />,
    );
    expect(screen.getByText("Save")).toBeDefined();
  });

  // ── Settings Navigation landmark ───────────────────────────────────────

  it("has settings navigation landmark", () => {
    render(<SettingsPage navItems={navItems} activeSection="general" />);
    expect(screen.getByLabelText("Settings navigation")).toBeDefined();
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className", () => {
    render(<SettingsPage className="custom-settings" data-testid="sp" />);
    expect(screen.getByTestId("sp").className).toContain("custom-settings");
  });
});

describe("SettingsSection", () => {
  it("renders section title", () => {
    render(<SettingsSection title="General">Content</SettingsSection>);
    expect(screen.getByText("General")).toBeDefined();
  });

  it("renders section description", () => {
    render(
      <SettingsSection title="General" description="Basic settings.">
        Content
      </SettingsSection>,
    );
    expect(screen.getByText("Basic settings.")).toBeDefined();
  });

  it("renders children", () => {
    render(
      <SettingsSection title="General">
        <input data-testid="input" />
      </SettingsSection>,
    );
    expect(screen.getByTestId("input")).toBeDefined();
  });

  it("passes custom className", () => {
    render(
      <SettingsSection title="Test" className="custom-section" data-testid="sec">
        Content
      </SettingsSection>,
    );
    expect(screen.getByTestId("sec").className).toContain("custom-section");
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(
      <SettingsSection title="General" description="Basic settings.">
        <input aria-label="Setting value" />
      </SettingsSection>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
