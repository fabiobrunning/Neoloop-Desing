import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { PaymentIcon } from "./PaymentIcon";

describe("PaymentIcon", () => {
  it("renders with name", () => {
    render(<PaymentIcon name="Visa" />);
    expect(screen.getByAltText("Visa")).toBeInTheDocument();
  });

  it("applies size", () => {
    render(<PaymentIcon name="Mastercard" size="lg" />);
    const img = screen.getByAltText("Mastercard");
    expect(img).toHaveAttribute("width", "56");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<PaymentIcon name="Visa" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
