import { describe, it, expect } from "vitest";
import { render, axe } from "../../lib/test-utils";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders", () => {
    const { container } = render(<Skeleton className="h-4 w-[200px]" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Skeleton className="h-4 w-[200px]" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
