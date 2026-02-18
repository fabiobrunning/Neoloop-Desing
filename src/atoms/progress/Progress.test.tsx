import { describe, it, expect } from "vitest";
import { render, axe } from "../../lib/test-utils";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders with value", () => {
    const { container } = render(<Progress value={50} aria-label="Loading" />);
    expect(container.querySelector("[role=progressbar]")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Progress value={50} aria-label="Loading" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
