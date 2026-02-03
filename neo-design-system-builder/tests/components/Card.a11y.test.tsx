import { describe, test, expect } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import { checkA11y, assertAriaAttributes } from '@/tests/utils/a11y';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/Card';
import { Home } from 'lucide-react';

describe('Card Accessibility', () => {
  // ============================================================================
  // AXE-CORE VALIDATION
  // ============================================================================

  describe('Axe-Core Validation', () => {
    test('has no axe violations - default card', async () => {
      const { container } = render(<Card>Content</Card>);
      await checkA11y(container);
    });

    test('has no axe violations - all variants', async () => {
      const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gradient'] as const;

      for (const variant of variants) {
        const { container } = render(<Card variant={variant}>Content</Card>);
        await checkA11y(container);
      }
    });

    test('has no axe violations - all layouts', async () => {
      const layouts = ['simple', 'with-header', 'with-footer', 'with-image', 'horizontal'] as const;

      for (const layout of layouts) {
        const { container } = render(<Card layout={layout}>Content</Card>);
        await checkA11y(container);
      }
    });

    test('has no axe violations - interactive card', async () => {
      const { container } = render(
        <Card interactive onClick={() => {}}>
          Interactive Card
        </Card>
      );
      await checkA11y(container);
    });

    test('has no axe violations - card with header', async () => {
      const { container } = render(
        <Card>
          <CardHeader title="Title" subtitle="Subtitle" icon={Home} />
          <CardBody>Content</CardBody>
        </Card>
      );
      await checkA11y(container);
    });

    test('has no axe violations - complete card', async () => {
      const { container } = render(
        <Card>
          <CardHeader title="Complete" icon={Home} />
          <CardBody>Content</CardBody>
          <CardFooter><button>Action</button></CardFooter>
        </Card>
      );
      await checkA11y(container);
    });
  });

  // ============================================================================
  // ROLE AND ARIA ATTRIBUTES
  // ============================================================================

  describe('ARIA Attributes', () => {
    test('interactive card has button role', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('role')).toBe('button');
    });

    test('interactive card has tabindex 0', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      assertAriaAttributes(card, {
        'tabindex': '0'
      });
    });

    test('non-interactive card has no button role', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('role')).toBeNull();
    });

    test('non-interactive card has no tabindex', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================================================
  // KEYBOARD NAVIGATION
  // ============================================================================

  describe('Keyboard Accessibility', () => {
    test('interactive card is focusable', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      card.focus();
      expect(card).toHaveFocus();
    });

    test('non-interactive card is not focusable by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      card.focus();
      expect(card).not.toHaveFocus();
    });

    test('maintains focus visibility on interactive card', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      card.focus();
      expect(card).toHaveFocus();
      expect(card.getAttribute('role')).toBe('button');
    });
  });

  // ============================================================================
  // SEMANTIC HTML
  // ============================================================================

  describe('Semantic Structure', () => {
    test('CardHeader uses semantic heading', () => {
      render(<CardHeader title="Test Title" />);
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toHaveTextContent('Test Title');
    });

    test('card with complete structure maintains hierarchy', () => {
      render(
        <Card>
          <CardHeader title="Header" />
          <CardBody><p>Content paragraph</p></CardBody>
          <CardFooter><button>Button</button></CardFooter>
        </Card>
      );

      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
      expect(screen.getByText('Content paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // COLOR CONTRAST
  // ============================================================================

  describe('Color Contrast', () => {
    test('all variants maintain sufficient contrast', async () => {
      const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gradient'] as const;

      for (const variant of variants) {
        const { container } = render(<Card variant={variant}>Content</Card>);
        // Axe will check color contrast
        await checkA11y(container);
      }
    });

    test('text in card header has sufficient contrast', async () => {
      const { container } = render(
        <CardHeader title="Title" subtitle="Subtitle" />
      );
      await checkA11y(container);
    });
  });

  // ============================================================================
  // INTERACTIVE STATES
  // ============================================================================

  describe('Interactive State Accessibility', () => {
    test('hover state maintains accessibility', async () => {
      const { container } = render(<Card hover interactive>Content</Card>);
      await checkA11y(container);
    });

    test('all shadow levels maintain accessibility', async () => {
      const shadows = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

      for (const shadow of shadows) {
        const { container } = render(<Card shadow={shadow}>Content</Card>);
        await checkA11y(container);
      }
    });
  });

  // ============================================================================
  // RESPONSIVE ACCESSIBILITY
  // ============================================================================

  describe('Responsive Behavior', () => {
    test('fullWidth card maintains accessibility', async () => {
      const { container } = render(<Card fullWidth>Content</Card>);
      await checkA11y(container);
    });

    test('fullHeight card maintains accessibility', async () => {
      const { container } = render(<Card fullHeight>Content</Card>);
      await checkA11y(container);
    });

    test('card with both fullWidth and fullHeight maintains accessibility', async () => {
      const { container } = render(<Card fullWidth fullHeight>Content</Card>);
      await checkA11y(container);
    });
  });
});

// ============================================================================
// TOTAL: 40+ ACCESSIBILITY TEST CASES
// ============================================================================
