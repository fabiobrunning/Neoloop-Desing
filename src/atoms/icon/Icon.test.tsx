import { describe, it, expect } from "vitest";
import { render, axe } from "../../lib/test-utils";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an SVG element", () => {
    const { container } = render(<Icon name="home" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("accepts size prop", () => {
    const { container } = render(<Icon name="search" size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Icon name="check" aria-hidden="true" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
