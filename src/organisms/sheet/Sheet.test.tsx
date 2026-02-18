import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "./Sheet";

describe("Sheet", () => {
  it("renders trigger", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </Sheet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
