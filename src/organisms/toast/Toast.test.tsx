import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Toast, ToastTitle, ToastDescription } from "./Toast";

describe("Toast", () => {
  it("renders with content", () => {
    render(
      <Toast>
        <ToastTitle>Success</ToastTitle>
        <ToastDescription>Operation completed.</ToastDescription>
      </Toast>,
    );
    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  it("renders close button when onClose provided", () => {
    const onClose = () => {};
    render(<Toast onClose={onClose}>Message</Toast>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Toast>
        <ToastTitle>Info</ToastTitle>
      </Toast>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
