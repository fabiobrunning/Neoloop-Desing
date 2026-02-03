import { describe, test, expect } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import { checkA11y, assertAriaAttributes } from '@/tests/utils/a11y';
import { Button } from '@/components/Button';
import { CheckIcon } from 'lucide-react';

describe('Button Accessibility', () => {
  test('has no axe violations - default button', async () => {
    const { container } = render(<Button>Click me</Button>);
    await checkA11y(container);
  });

  test('has no axe violations - all variants', async () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'link'] as const;

    for (const variant of variants) {
      const { container } = render(<Button variant={variant}>Click me</Button>);
      await checkA11y(container);
    }
  });

  test('has no axe violations - disabled state', async () => {
    const { container } = render(<Button disabled>Click me</Button>);
    await checkA11y(container);
  });

  test('has no axe violations - loading state', async () => {
    const { container } = render(<Button loading>Click me</Button>);
    await checkA11y(container);
  });

  test('has no axe violations - icon-only button with aria-label', async () => {
    const { container } = render(
      <Button iconLeft={CheckIcon} iconOnly aria-label="Confirm action" />
    );
    await checkA11y(container);
  });

  test('has proper role attribute', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
  });

  test('disabled state sets aria-disabled', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    assertAriaAttributes(button, {
      'aria-disabled': 'true'
    });
  });

  test('loading state is announced to screen readers', () => {
    render(<Button loading loadingText="Loading...">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.textContent).toContain('Loading');
  });

  test('icon-only button must have accessible name', () => {
    render(<Button iconLeft={CheckIcon} iconOnly aria-label="Save changes" />);
    expect(screen.getByLabelText('Save changes')).toBeInTheDocument();
  });

  test('button with children has accessible name from text content', () => {
    render(<Button>Submit form</Button>);
    expect(screen.getByRole('button', { name: 'Submit form' })).toBeInTheDocument();
  });

  test('maintains focus visibility', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  test('all sizes maintain accessibility', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    for (const size of sizes) {
      const { container } = render(<Button size={size}>Click me</Button>);
      await checkA11y(container);
    }
  });
});
