import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders label and input", () => {
    render(<FormField label="Email" placeholder="email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<FormField label="Email" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("shows description", () => {
    render(<FormField label="Name" description="Your full name" />);
    expect(screen.getByText("Your full name")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<FormField label="Email" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
