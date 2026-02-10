import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./NavigationMenu";
import { axe } from "../../lib/test-utils";

describe("NavigationMenu", () => {
  const renderMenu = () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/analytics">
              Analytics
            </NavigationMenuLink>
            <NavigationMenuLink href="/automation">
              Automation
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">
              Documentation
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  // -- Rendering -----------------------------------------------------------

  it("renders navigation menu", () => {
    render(renderMenu());
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("renders menu items", () => {
    render(renderMenu());
    expect(screen.getByText("Products")).toBeDefined();
    expect(screen.getByText("Resources")).toBeDefined();
  });

  // -- Interaction ---------------------------------------------------------

  it("opens content on trigger click", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Products"));
    expect(await screen.findByText("Analytics")).toBeDefined();
    expect(screen.getByText("Automation")).toBeDefined();
  });

  it("renders links in content", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Products"));
    const analyticsLink = await screen.findByText("Analytics");
    expect(analyticsLink.closest("a")).toBeDefined();
  });

  // -- Custom className ----------------------------------------------------

  it("passes custom className", () => {
    render(
      <NavigationMenu className="custom-class">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/test">Test</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("custom-class");
  });

  // -- A11y ----------------------------------------------------------------

  it("has no a11y violations", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Products"));
    await screen.findByText("Analytics");
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
