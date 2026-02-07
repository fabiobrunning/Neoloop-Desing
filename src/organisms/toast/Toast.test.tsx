import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./Toast";

function renderToast(props: Record<string, unknown> = {}) {
  return render(
    <ToastProvider>
      <Toast open {...props}>
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>Something happened</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>,
  );
}

describe("Toast", () => {
  it("renders toast with title and description", () => {
    renderToast();
    expect(screen.getByText("Notification")).toBeDefined();
    expect(screen.getByText("Something happened")).toBeDefined();
  });

  it("renders default variant", () => {
    renderToast({ "data-testid": "toast" });
    const el = screen.getByTestId("toast");
    expect(el.className).toContain("border-border");
  });

  it("renders success variant", () => {
    renderToast({ variant: "success", "data-testid": "toast" });
    const el = screen.getByTestId("toast");
    expect(el.className).toContain("text-success");
  });

  it("renders error variant", () => {
    renderToast({ variant: "error", "data-testid": "toast" });
    const el = screen.getByTestId("toast");
    expect(el.className).toContain("text-error");
  });

  it("renders warning variant", () => {
    renderToast({ variant: "warning", "data-testid": "toast" });
    const el = screen.getByTestId("toast");
    expect(el.className).toContain("text-warning");
  });

  it("renders info variant", () => {
    renderToast({ variant: "info", "data-testid": "toast" });
    const el = screen.getByTestId("toast");
    expect(el.className).toContain("text-info");
  });

  it("renders close button", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Closable</ToastTitle>
          <ToastClose data-testid="close-btn" />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByTestId("close-btn")).toBeDefined();
  });

  it("renders action button", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>With action</ToastTitle>
          <ToastAction altText="Undo">Undo</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText("Undo")).toBeDefined();
  });

  it("renders viewport", () => {
    render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>,
    );
    expect(screen.getByTestId("viewport")).toBeDefined();
  });

  it("passes custom className", () => {
    renderToast({ className: "custom-toast", "data-testid": "toast" });
    expect(screen.getByTestId("toast").className).toContain("custom-toast");
  });
});
