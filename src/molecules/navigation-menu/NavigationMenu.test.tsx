import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { NavigationMenu, NavigationMenuItem } from "./NavigationMenu";

describe("NavigationMenu", () => {
  it("renders items", () => {
    render(
      <NavigationMenu aria-label="Main">
        <NavigationMenuItem href="/">Home</NavigationMenuItem>
        <NavigationMenuItem href="/about">About</NavigationMenuItem>
      </NavigationMenu>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <NavigationMenu aria-label="Main">
        <NavigationMenuItem href="/">Home</NavigationMenuItem>
      </NavigationMenu>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
