import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

describe("Accordion", () => {
  it("renders items", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Section 1")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
