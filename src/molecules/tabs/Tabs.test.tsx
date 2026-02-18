import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

describe("Tabs", () => {
  it("renders tabs", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Tab A")).toBeInTheDocument();
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
