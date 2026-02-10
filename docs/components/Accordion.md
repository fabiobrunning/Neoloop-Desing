# Accordion

Expandable content sections built on Radix UI Accordion primitive.

## Import

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "synkra-ds";
```

## Props

### Accordion (Root)
| Prop | Type | Description |
|------|------|-------------|
| `type` | `"single" \| "multiple"` | Allow one or multiple items open |
| `collapsible` | `boolean` | Allow closing all items (single mode) |

## Examples

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="faq-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Accessibility

- Full keyboard navigation (Arrow keys, Enter, Space)
- WAI-ARIA Accordion pattern
- Animated open/close transitions
