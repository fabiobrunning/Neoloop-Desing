import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

describe("RadioGroup", () => {
  it("renders radio items", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <RadioGroup defaultValue="a" aria-label="Options">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
