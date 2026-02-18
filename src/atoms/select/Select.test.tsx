import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./Select";

describe("Select", () => {
  it("renders trigger", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Select>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
