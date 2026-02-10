import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialIcon } from "./SocialIcon";

describe("SocialIcon", () => {
  it("renders with correct src for default variant", () => {
    render(<SocialIcon network="GitHub" />);
    const img = screen.getByRole("img", { name: /github/i });
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toContain("Colorida/GitHub.svg");
  });

  it("renders with black variant path", () => {
    render(<SocialIcon network="Discord" variant="black" />);
    const img = screen.getByRole("img", { name: /discord/i });
    expect(img.getAttribute("src")).toContain("black/Discord.svg");
  });

  it("renders with white variant path", () => {
    render(<SocialIcon network="X" variant="white" />);
    const img = screen.getByRole("img", { name: /x/i });
    expect(img.getAttribute("src")).toContain("white/X.svg");
  });

  it("applies custom size", () => {
    render(<SocialIcon network="Instagram" size={48} />);
    const img = screen.getByRole("img", { name: /instagram/i });
    expect(img.getAttribute("width")).toBe("48");
    expect(img.getAttribute("height")).toBe("48");
  });

  it("defaults to size 24", () => {
    render(<SocialIcon network="LinkedIn" />);
    const img = screen.getByRole("img", { name: /linkedin/i });
    expect(img.getAttribute("width")).toBe("24");
  });

  it("uses network name as default alt text", () => {
    render(<SocialIcon network="YouTube" />);
    expect(screen.getByRole("img", { name: /youtube/i })).toBeDefined();
  });

  it("supports custom alt text", () => {
    render(<SocialIcon network="GitHub" alt="View on GitHub" />);
    expect(screen.getByRole("img", { name: /view on github/i })).toBeDefined();
  });

  it("passes custom className", () => {
    render(<SocialIcon network="Spotify" className="custom-icon" />);
    expect(screen.getByRole("img", { name: /spotify/i }).className).toContain("custom-icon");
  });

  it("has lazy loading", () => {
    render(<SocialIcon network="Telegram" />);
    expect(screen.getByRole("img", { name: /telegram/i }).getAttribute("loading")).toBe("lazy");
  });
});
