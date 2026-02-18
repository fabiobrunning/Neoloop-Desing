import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./Dialog";

describe("Dialog", () => {
  it("renders trigger", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
