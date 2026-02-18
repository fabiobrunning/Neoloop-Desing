import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { SocialIcon } from "./SocialIcon";

describe("SocialIcon", () => {
  it("renders with name", () => {
    render(<SocialIcon name="GitHub" />);
    expect(screen.getByAltText("GitHub")).toBeInTheDocument();
  });

  it("applies custom size", () => {
    render(<SocialIcon name="Discord" size={32} />);
    const img = screen.getByAltText("Discord");
    expect(img).toHaveAttribute("width", "32");
    expect(img).toHaveAttribute("height", "32");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<SocialIcon name="GitHub" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
