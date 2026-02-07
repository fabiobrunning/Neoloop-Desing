import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";
import { axe } from "../../lib/test-utils";

describe("Dialog", () => {
  it("does not render content by default", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByText("Title")).toBeNull();
  });

  it("opens dialog on trigger click", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>My Dialog</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("My Dialog")).toBeDefined();
  });

  it("renders title and description", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Confirm")).toBeDefined();
    expect(screen.getByText("Are you sure?")).toBeDefined();
  });

  it("renders footer content", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
          <DialogFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Cancel")).toBeDefined();
    expect(screen.getByText("Confirm")).toBeDefined();
  });

  it("has dialog role when open", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it("renders close button with sr-only label", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Close")).toBeDefined();
  });

  it("calls onOpenChange when closed", () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByText("Close"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders controlled open state", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Controlled</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Controlled")).toBeDefined();
  });

  it("renders with DialogClose in footer", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
          <DialogFooter>
            <DialogClose asChild>
              <button>Close Dialog</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Close Dialog")).toBeDefined();
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
