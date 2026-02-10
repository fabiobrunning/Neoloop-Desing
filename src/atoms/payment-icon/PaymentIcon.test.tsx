import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentIcon } from "./PaymentIcon";

describe("PaymentIcon", () => {
  it("renders with correct src", () => {
    render(<PaymentIcon method="Visa" />);
    const img = screen.getByRole("img", { name: /visa/i });
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toContain("Payment method=Visa.svg");
  });

  it("applies custom size", () => {
    render(<PaymentIcon method="Mastercard" size={60} />);
    const img = screen.getByRole("img", { name: /mastercard/i });
    expect(img.getAttribute("height")).toBe("60");
  });

  it("defaults to size 40", () => {
    render(<PaymentIcon method="AMEX" />);
    const img = screen.getByRole("img", { name: /amex/i });
    expect(img.getAttribute("height")).toBe("40");
  });

  it("uses method name as default alt", () => {
    render(<PaymentIcon method="PayPal" />);
    expect(screen.getByRole("img", { name: /paypal/i })).toBeDefined();
  });

  it("supports custom alt text", () => {
    render(<PaymentIcon method="Bitcoin" alt="Pay with Bitcoin" />);
    expect(screen.getByRole("img", { name: /pay with bitcoin/i })).toBeDefined();
  });

  it("passes custom className", () => {
    render(<PaymentIcon method="Stripe" className="payment-icon" />);
    expect(screen.getByRole("img", { name: /stripe/i }).className).toContain("payment-icon");
  });

  it("has lazy loading", () => {
    render(<PaymentIcon method="GooglePay" />);
    expect(screen.getByRole("img", { name: /googlepay/i }).getAttribute("loading")).toBe("lazy");
  });
});
