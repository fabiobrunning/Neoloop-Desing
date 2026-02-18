import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";

describe("Card", () => {
  it("renders all subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader><CardTitle>Card</CardTitle></CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
