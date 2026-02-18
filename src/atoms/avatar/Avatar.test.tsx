import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Avatar, AvatarFallback } from "./Avatar";

describe("Avatar", () => {
  it("renders fallback", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
