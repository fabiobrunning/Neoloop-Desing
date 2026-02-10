import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./NavigationMenu";

const meta: Meta = {
  title: "Molecules/NavigationMenu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// -- Default ----------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <li>
                <NavigationMenuLink href="/analytics">
                  <div className="text-sm font-medium leading-none text-text-primary">
                    Analytics
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-muted">
                    Track your metrics and monitor performance.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/automation">
                  <div className="text-sm font-medium leading-none text-text-primary">
                    Automation
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-muted">
                    Automate your workflows and save time.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/integrations">
                  <div className="text-sm font-medium leading-none text-text-primary">
                    Integrations
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-muted">
                    Connect with your favorite tools seamlessly.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/security">
                  <div className="text-sm font-medium leading-none text-text-primary">
                    Security
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-muted">
                    Enterprise-grade security for your data.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <li>
                <NavigationMenuLink href="/docs">
                  <div className="text-sm font-medium leading-none text-text-primary">
                    Documentation
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-muted">
                    Guides and API references for developers.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/blog">
                  <div className="text-sm font-medium leading-none text-text-primary">
                    Blog
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-muted">
                    Latest updates, tutorials, and insights.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/support">
                  <div className="text-sm font-medium leading-none text-text-primary">
                    Support
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text-muted">
                    Get help from our team or community.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// -- Simple -----------------------------------------------------------------

export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/home"
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
