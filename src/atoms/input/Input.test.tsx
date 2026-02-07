import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with default type text", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeDefined();
    expect(input.getAttribute("type")).toBe("text");
  });

  it("renders with specified type", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email").getAttribute("type")).toBe("email");
  });

  it("renders password type", () => {
    render(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText("Password").getAttribute("type")).toBe("password");
  });

  it("handles value change", () => {
    const onChange = vi.fn();
    render(<Input placeholder="Type" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("Type"), {
      target: { value: "hello" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("disables the input", () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText("Disabled") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("sets aria-invalid when error is true", () => {
    render(<Input error placeholder="Error" />);
    expect(screen.getByPlaceholderText("Error").getAttribute("aria-invalid")).toBe("true");
  });

  it("does not set aria-invalid when no error", () => {
    render(<Input placeholder="Normal" />);
    expect(screen.getByPlaceholderText("Normal").getAttribute("aria-invalid")).toBeNull();
  });

  it("forwards ref", () => {
    const refCallback = vi.fn();
    render(<Input ref={refCallback} placeholder="Ref" />);
    expect(refCallback).toHaveBeenCalled();
    const el = refCallback.mock.calls[0][0] as HTMLInputElement;
    expect(el.tagName).toBe("INPUT");
  });

  it("passes custom className", () => {
    render(<Input className="custom" placeholder="Styled" />);
    expect(screen.getByPlaceholderText("Styled").className).toContain("custom");
  });

  it("supports aria-describedby", () => {
    render(<Input aria-describedby="help-text" placeholder="Described" />);
    expect(
      screen.getByPlaceholderText("Described").getAttribute("aria-describedby"),
    ).toBe("help-text");
  });
});
