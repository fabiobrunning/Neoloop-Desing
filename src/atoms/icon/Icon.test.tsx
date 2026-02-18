import { describe, it, expect } from "vitest";
import { render, axe } from "../../lib/test-utils";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an SVG element", () => {
    const { container } = render(<Icon name="accessibility" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("accepts size prop", () => {
    const { container } = render(<Icon name="check" size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Icon name="check" aria-hidden="true" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a Line icon with viewBox 14", () => {
    const { container } = render(<Icon name="accessibility" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 14 14");
  });

  it("renders a Solid icon with fill", () => {
    const { container } = render(<Icon name="accessibility-solid" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 14 14");
    expect(svg).toHaveAttribute("fill", "currentColor");
  });
});
