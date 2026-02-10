import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
import { axe } from "../../lib/test-utils";

function renderAccordion(type: "single" | "multiple" = "single") {
  return render(
    <Accordion type={type} collapsible={type === "single" ? true : undefined}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>Content 3</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

describe("Accordion", () => {
  it("renders all trigger items", () => {
    renderAccordion();
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
    expect(screen.getByText("Item 3")).toBeDefined();
  });

  it("content is hidden by default", () => {
    renderAccordion();
    const buttons = screen.getAllByRole("button");
    expect(buttons[0].getAttribute("data-state")).toBe("closed");
  });

  it("expands content on click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByText("Item 1"));
    expect(screen.getByText("Item 1").closest("button")?.getAttribute("data-state")).toBe("open");
  });

  it("collapses when clicking open item in collapsible single mode", async () => {
    const user = userEvent.setup();
    renderAccordion("single");
    const trigger = screen.getByText("Item 1");
    await user.click(trigger);
    expect(trigger.closest("button")?.getAttribute("data-state")).toBe("open");
    await user.click(trigger);
    expect(trigger.closest("button")?.getAttribute("data-state")).toBe("closed");
  });

  it("allows multiple items open in multiple mode", async () => {
    const user = userEvent.setup();
    renderAccordion("multiple");
    await user.click(screen.getByText("Item 1"));
    await user.click(screen.getByText("Item 2"));
    expect(screen.getByText("Item 1").closest("button")?.getAttribute("data-state")).toBe("open");
    expect(screen.getByText("Item 2").closest("button")?.getAttribute("data-state")).toBe("open");
  });

  it("renders chevron icon on triggers", () => {
    const { container } = renderAccordion();
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(3);
  });

  it("passes custom className to AccordionItem", () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="test" className="custom-item">
          <AccordionTrigger>Test</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const item = container.querySelector(".custom-item");
    expect(item).not.toBeNull();
    expect(item?.className).toContain("border-b");
  });

  it("triggers are keyboard accessible", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByText("Item 1");
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger.closest("button")?.getAttribute("data-state")).toBe("open");
  });

  // A11y
  it("has no a11y violations", async () => {
    const { container } = renderAccordion();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
