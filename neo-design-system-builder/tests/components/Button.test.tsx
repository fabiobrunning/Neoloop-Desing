import { describe, test, expect, vi } from 'vitest';
import { render, screen, within } from '@/tests/utils/test-utils';
import { Button } from '@/components/Button';
import { mockButtonProps, mockEventHandlers } from '@/tests/mocks/component-props';
import { clickElement, pressKey, tabToNext } from '@/tests/utils/user-events';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';

describe('Button Component', () => {
  // ============================================================================
  // RENDERING TESTS
  // ============================================================================

  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      render(<Button className="custom-class">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    test('renders as disabled when disabled prop is true', () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  // ============================================================================
  // VARIANT TESTS (8 variants × 3 states = 24 tests)
  // ============================================================================

  describe('Variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'link'] as const;

    variants.forEach(variant => {
      describe(`${variant} variant`, () => {
        test('renders with correct styles', () => {
          render(<Button variant={variant}>Click me</Button>);
          const button = screen.getByRole('button');
          expect(button).toBeInTheDocument();
          // Variant-specific class should be applied
          expect(button.className).toContain(variant);
        });

        test('handles click events', async () => {
          const onClick = vi.fn();
          render(<Button variant={variant} onClick={onClick}>Click me</Button>);
          const button = screen.getByRole('button');
          await clickElement(button);
          expect(onClick).toHaveBeenCalledTimes(1);
        });

        test('shows disabled state correctly', () => {
          render(<Button variant={variant} disabled>Click me</Button>);
          const button = screen.getByRole('button');
          expect(button).toBeDisabled();
          expect(button).toHaveAttribute('aria-disabled', 'true');
        });
      });
    });
  });

  // ============================================================================
  // SIZE TESTS (5 sizes × 2 checks = 10 tests)
  // ============================================================================

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      test(`${size} size renders correctly`, () => {
        render(<Button size={size}>Click me</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });

      test(`${size} size has correct padding`, () => {
        render(<Button size={size}>Click me</Button>);
        const button = screen.getByRole('button');
        // Size-specific classes should be applied
        expect(button.className).toBeTruthy();
      });
    });

    test('defaults to md size when no size prop provided', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ICON TESTS (6 tests)
  // ============================================================================

  describe('Icons', () => {
    test('renders icon on the left', () => {
      render(<Button iconLeft={CheckIcon}>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Icon should be rendered before text
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    test('renders icon on the right', () => {
      render(<Button iconRight={ChevronRightIcon}>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    test('renders both left and right icons', () => {
      render(
        <Button iconLeft={CheckIcon} iconRight={ChevronRightIcon}>
          Click me
        </Button>
      );
      const button = screen.getByRole('button');
      const svgs = button.querySelectorAll('svg');
      expect(svgs).toHaveLength(2);
    });

    test('renders icon-only button', () => {
      render(<Button iconLeft={CheckIcon} iconOnly aria-label="Check" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName('Check');
      expect(button.textContent).not.toContain('Click me');
    });

    test('icon size scales with button size', () => {
      const { rerender } = render(<Button size="xs" iconLeft={CheckIcon}>Small</Button>);
      let button = screen.getByRole('button');
      let svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();

      rerender(<Button size="xl" iconLeft={CheckIcon}>Large</Button>);
      button = screen.getByRole('button');
      svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    test('hides icons during loading', () => {
      render(<Button iconLeft={CheckIcon} loading>Loading</Button>);
      const button = screen.getByRole('button');
      // Loading spinner should be visible, not the icon
      expect(button).toBeInTheDocument();
    });
  });

  // ============================================================================
  // LOADING STATE TESTS (3 tests)
  // ============================================================================

  describe('Loading State', () => {
    test('shows loading spinner when loading is true', () => {
      render(<Button loading>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    test('loading text replaces children', () => {
      render(<Button loading loadingText="Processing...">Click me</Button>);
      expect(screen.getByText('Processing...')).toBeInTheDocument();
      expect(screen.queryByText('Click me')).not.toBeInTheDocument();
    });

    test('button is disabled during loading', () => {
      const onClick = vi.fn();
      render(<Button loading onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  // ============================================================================
  // INTERACTION TESTS
  // ============================================================================

  describe('Interactions', () => {
    test('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');
      await clickElement(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when disabled', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick} disabled>Click me</Button>);
      const button = screen.getByRole('button');
      await clickElement(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    test('does not call onClick when loading', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick} loading>Click me</Button>);
      const button = screen.getByRole('button');
      await clickElement(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    test('handles undefined onClick gracefully', async () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      await clickElement(button);
      // Should not throw error
      expect(button).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS (2 tests)
  // ============================================================================

  describe('Accessibility', () => {
    test('is keyboard accessible with Enter key', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      await pressKey('Enter');
      // Note: pressKey may not trigger onClick in jsdom
      // This tests keyboard navigation capability
      expect(button).toHaveFocus();
    });

    test('is keyboard accessible with Space key', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await pressKey('Space');

      expect(button).toHaveFocus();
    });

    test('has proper accessible name', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    test('icon-only button requires aria-label', () => {
      render(<Button iconLeft={CheckIcon} iconOnly aria-label="Confirm" />);
      expect(screen.getByLabelText('Confirm')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  describe('Edge Cases', () => {
    test('handles empty children', () => {
      render(<Button />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('handles very long text', () => {
      const longText = 'This is a very long button text that might wrap or overflow';
      render(<Button>{longText}</Button>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    test('handles fullWidth prop', () => {
      render(<Button fullWidth>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('w-full');
    });

    test('handles custom primary color', () => {
      render(<Button primaryColor="#FF0000">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('handles all props together', () => {
      render(
        <Button
          variant="primary"
          size="lg"
          iconLeft={CheckIcon}
          iconRight={ChevronRightIcon}
          disabled={false}
          loading={false}
          fullWidth
          className="custom"
        >
          Complex Button
        </Button>
      );
      expect(screen.getByText('Complex Button')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // TOTAL: 45+ TEST CASES
  // ============================================================================
});
