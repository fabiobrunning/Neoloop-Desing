import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Molecules/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ maxWidth: "480px" }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Synkra DS?</AccordionTrigger>
        <AccordionContent>
          A design system built with Atomic Design, Tailwind CSS v4, and Radix UI primitives.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Run npm install synkra-ds and import components directly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes, all components follow WCAG AA guidelines using Radix UI primitives.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" style={{ maxWidth: "480px" }}>
      <AccordionItem value="faq-1">
        <AccordionTrigger>Can I customize the theme?</AccordionTrigger>
        <AccordionContent>
          Yes, Synkra DS uses CSS custom properties for all design tokens.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>
          Yes, use the ThemeProvider with dark, light, or system preference.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>What about TypeScript?</AccordionTrigger>
        <AccordionContent>
          Fully typed with exported interfaces for all component props.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
