import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

describe("Footer", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders brand", () => {
    render(<Footer brand="Synkra" />);
    expect(screen.getByText("Synkra")).toBeDefined();
  });

  it("renders description", () => {
    render(<Footer description="A design system" />);
    expect(screen.getByText("A design system")).toBeDefined();
  });

  it("renders copyright", () => {
    render(<Footer copyright="2026 Synkra" />);
    expect(screen.getByText("2026 Synkra")).toBeDefined();
  });

  // ── Link Groups ────────────────────────────────────────────────────────

  it("renders link group titles", () => {
    render(<Footer linkGroups={linkGroups} />);
    expect(screen.getByText("Product")).toBeDefined();
    expect(screen.getByText("Company")).toBeDefined();
  });

  it("renders links within groups", () => {
    render(<Footer linkGroups={linkGroups} />);
    expect(screen.getByText("Features")).toBeDefined();
    expect(screen.getByText("Pricing")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Blog")).toBeDefined();
  });

  it("links have correct href", () => {
    render(<Footer linkGroups={linkGroups} />);
    const featuresLink = screen.getByText("Features").closest("a");
    expect(featuresLink?.getAttribute("href")).toBe("/features");
  });

  // ── Bottom Content ─────────────────────────────────────────────────────

  it("renders bottom content", () => {
    render(
      <Footer
        bottomContent={<span data-testid="social">Social icons</span>}
      />,
    );
    expect(screen.getByTestId("social")).toBeDefined();
  });

  // ── Semantic HTML ──────────────────────────────────────────────────────

  it("renders as footer element", () => {
    const { container } = render(<Footer brand="Test" />);
    expect(container.querySelector("footer")).toBeDefined();
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className", () => {
    const { container } = render(<Footer className="custom-footer" />);
    const footer = container.querySelector("footer");
    expect(footer?.className).toContain("custom-footer");
  });
});
