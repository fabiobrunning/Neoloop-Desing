import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormField, Label } from "./FormField";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label htmlFor="test">Email</Label>);
    expect(screen.getByText("Email")).toBeDefined();
  });

  it("shows required indicator", () => {
    render(
      <Label htmlFor="test" required>
        Name
      </Label>,
    );
    expect(screen.getByText("*")).toBeDefined();
  });

  it("associates with input via htmlFor", () => {
    render(
      <div>
        <Label htmlFor="my-input">Field</Label>
        <input id="my-input" />
      </div>,
    );
    const label = screen.getByText("Field");
    expect(label.getAttribute("for")).toBe("my-input");
  });
});

describe("FormField", () => {
  it("renders label and input connected", () => {
    render(<FormField id="email" label="Email" />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("id")).toBe("email");
    expect(screen.getByText("Email")).toBeDefined();
  });

  it("shows helper text", () => {
    render(<FormField id="name" label="Name" helperText="Enter your full name" />);
    expect(screen.getByText("Enter your full name")).toBeDefined();
  });

  it("shows error message replacing helper text", () => {
    render(
      <FormField
        id="email"
        label="Email"
        helperText="We need your email"
        error="Invalid email"
      />,
    );
    expect(screen.getByText("Invalid email")).toBeDefined();
    expect(screen.queryByText("We need your email")).toBeNull();
  });

  it("sets aria-invalid on input when error exists", () => {
    render(<FormField id="email" label="Email" error="Required" />);
    expect(screen.getByRole("textbox").getAttribute("aria-invalid")).toBe("true");
  });

  it("connects input to description via aria-describedby", () => {
    render(<FormField id="name" label="Name" helperText="Help" />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("aria-describedby")).toBe("name-description");
    expect(screen.getByText("Help").getAttribute("id")).toBe("name-description");
  });

  it("error message has role alert", () => {
    render(<FormField id="email" label="Email" error="Bad" />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByRole("alert").textContent).toBe("Bad");
  });

  it("shows required indicator on label", () => {
    render(<FormField id="name" label="Name" required />);
    expect(screen.getByText("*")).toBeDefined();
  });

  it("disables the input", () => {
    render(<FormField id="name" label="Name" disabled />);
    expect((screen.getByRole("textbox") as HTMLInputElement).disabled).toBe(true);
  });

  it("passes inputProps through", () => {
    render(
      <FormField
        id="email"
        label="Email"
        inputProps={{ placeholder: "you@example.com", type: "email" }}
      />,
    );
    const input = screen.getByPlaceholderText("you@example.com");
    expect(input.getAttribute("type")).toBe("email");
  });

  it("handles input change", () => {
    const onChange = vi.fn();
    render(
      <FormField id="name" label="Name" inputProps={{ onChange }} />,
    );
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Fabio" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards ref to input", () => {
    const refCallback = vi.fn();
    render(<FormField ref={refCallback} id="name" label="Name" />);
    expect(refCallback).toHaveBeenCalled();
    const el = refCallback.mock.calls[0][0] as HTMLInputElement;
    expect(el.tagName).toBe("INPUT");
  });

  it("passes custom className to wrapper", () => {
    render(
      <FormField id="name" label="Name" className="custom-field" />,
    );
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(wrapper?.className).toContain("custom-field");
  });
});
