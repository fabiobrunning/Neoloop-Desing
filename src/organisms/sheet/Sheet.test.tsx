import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./Sheet";
import { axe } from "../../lib/test-utils";

describe("Sheet", () => {
  it("renders trigger button", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Open Sheet")).toBeDefined();
  });

  it("opens sheet on trigger click", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>My Sheet</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("My Sheet")).toBeDefined();
  });

  it("displays title and description", () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Manage your preferences.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Settings")).toBeDefined();
    expect(screen.getByText("Manage your preferences.")).toBeDefined();
  });

  it("renders footer content", () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetTitle>Test</SheetTitle>
          <SheetFooter>
            <button>Cancel</button>
            <button>Save</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Cancel")).toBeDefined();
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("closes on close button click", () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetTitle>Closeable</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Closeable")).toBeDefined();
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Closeable")).toBeNull();
  });

  it("passes custom className to content", () => {
    render(
      <Sheet defaultOpen>
        <SheetContent className="custom-sheet-class">
          <SheetTitle>Styled</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    const content = screen.getByRole("dialog");
    expect(content.className).toContain("custom-sheet-class");
  });

  it("renders with SheetClose in footer", () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetTitle>Test</SheetTitle>
          <SheetFooter>
            <SheetClose asChild>
              <button>Close Sheet</button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Close Sheet")).toBeDefined();
  });

  // -- A11y -------------------------------------------------------------------

  it("has no a11y violations", async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Accessible Sheet</SheetTitle>
            <SheetDescription>Sheet description for a11y</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
