import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

describe("Avatar", () => {
  it("renders avatar root element", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar")).toBeDefined();
  });

  it("renders fallback text", () => {
    render(
      <Avatar>
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("FB")).toBeDefined();
  });

  it("renders sm size", () => {
    render(
      <Avatar size="sm" data-testid="avatar">
        <AvatarFallback>S</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar").getAttribute("data-size")).toBe("sm");
    expect(screen.getByTestId("avatar").className).toContain("h-8");
  });

  it("renders md size by default", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>M</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar").getAttribute("data-size")).toBe("md");
    expect(screen.getByTestId("avatar").className).toContain("h-10");
  });

  it("renders lg size", () => {
    render(
      <Avatar size="lg" data-testid="avatar">
        <AvatarFallback>L</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar").getAttribute("data-size")).toBe("lg");
    expect(screen.getByTestId("avatar").className).toContain("h-12");
  });

  it("renders xl size", () => {
    render(
      <Avatar size="xl" data-testid="avatar">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar").getAttribute("data-size")).toBe("xl");
    expect(screen.getByTestId("avatar").className).toContain("h-16");
  });

  it("shows fallback when image has not loaded (jsdom)", () => {
    render(
      <Avatar>
        <AvatarImage src="/photo.jpg" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>,
    );
    // In jsdom, images never load, so fallback is shown
    expect(screen.getByText("U")).toBeDefined();
  });

  it("passes custom className to avatar", () => {
    render(
      <Avatar className="ring-2 ring-primary" data-testid="avatar">
        <AvatarFallback>C</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar").className).toContain("ring-2");
  });

  it("passes custom className to fallback", () => {
    render(
      <Avatar>
        <AvatarFallback className="bg-primary text-text-inverse" data-testid="fb">
          OK
        </AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("fb").className).toContain("bg-primary");
  });
});
