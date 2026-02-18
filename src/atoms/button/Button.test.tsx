import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("destructive");
  });

  it("is disabled when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when disabled", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("supports asChild via Slot", () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Link button" })).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Button>Accessible</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
