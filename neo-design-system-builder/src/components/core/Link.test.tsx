import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Link } from './Link';

expect.extend(toHaveNoViolations);

describe('Link', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders link with text', () => {
      render(<Link href="/test">Test Link</Link>);
      expect(screen.getByRole('link', { name: 'Test Link' })).toBeInTheDocument();
    });

    it('renders with href attribute', () => {
      render(<Link href="/about">About</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/about');
    });

    it('renders children correctly', () => {
      render(
        <Link href="/test">
          <span>Child Content</span>
        </Link>
      );
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Link href="/test" className="custom-class">Link</Link>);
      expect(screen.getByRole('link')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(<Link ref={ref} href="/test">Link</Link>);
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  // Variants
  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Link href="/test" variant="default">Default</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-blue-600');
    });

    it('renders underline variant', () => {
      render(<Link href="/test" variant="underline">Underline</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('underline');
    });

    it('renders muted variant', () => {
      render(<Link href="/test" variant="muted">Muted</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-gray-600');
    });

    it('renders inline variant', () => {
      render(<Link href="/test" variant="inline">Inline</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-inherit');
    });
  });

  // Sizes
  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Link href="/test" size="sm">Small</Link>);
      expect(screen.getByRole('link')).toHaveClass('text-sm');
    });

    it('renders medium size (default)', () => {
      render(<Link href="/test" size="md">Medium</Link>);
      expect(screen.getByRole('link')).toHaveClass('text-base');
    });

    it('renders large size', () => {
      render(<Link href="/test" size="lg">Large</Link>);
      expect(screen.getByRole('link')).toHaveClass('text-lg');
    });
  });

  // External links
  describe('External Links', () => {
    it('renders external link with icon', () => {
      render(<Link href="https://example.com" external>External</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('includes external icon in DOM', () => {
      const { container } = render(<Link href="https://example.com" external>External</Link>);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('has proper aria-label for external link', () => {
      render(<Link href="https://example.com" external>External Link</Link>);
      expect(screen.getByLabelText(/opens in new tab/i)).toBeInTheDocument();
    });

    it('does not render external icon for internal links', () => {
      const { container } = render(<Link href="/internal">Internal</Link>);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });
  });

  // Disabled state
  describe('Disabled State', () => {
    it('renders disabled link', () => {
      render(<Link href="/test" disabled>Disabled</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('has aria-disabled when disabled', () => {
      render(<Link href="/test" disabled>Disabled</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
    });

    it('removes href when disabled', () => {
      render(<Link href="/test" disabled>Disabled</Link>);
      expect(screen.getByRole('link')).not.toHaveAttribute('href');
    });

    it('sets tabIndex to -1 when disabled', () => {
      render(<Link href="/test" disabled>Disabled</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('tabIndex', '-1');
    });

    it('prevents pointer events when disabled', () => {
      render(<Link href="/test" disabled>Disabled</Link>);
      expect(screen.getByRole('link')).toHaveClass('pointer-events-none');
    });
  });

  // Interactions
  describe('User Interactions', () => {
    it('is clickable when enabled', async () => {
      const user = userEvent.setup();
      render(<Link href="/test">Click me</Link>);
      const link = screen.getByRole('link');
      await user.click(link);
      // Navigation would happen in a real browser
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Link href="/test">Tab to me</Link>);
      const link = screen.getByRole('link');
      await user.tab();
      expect(link).toHaveFocus();
    });

    it('is not clickable when disabled', async () => {
      const user = userEvent.setup();
      render(<Link href="/test" disabled>Disabled</Link>);
      const link = screen.getByRole('link');
      await user.click(link);
      // Should not navigate
    });
  });

  // Custom props
  describe('Custom Props', () => {
    it('passes through additional HTML attributes', () => {
      render(<Link href="/test" data-testid="custom-link" title="Custom Title">Link</Link>);
      const link = screen.getByTestId('custom-link');
      expect(link).toHaveAttribute('title', 'Custom Title');
    });

    it('handles onClick event', async () => {
      const handleClick = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();
      render(<Link href="/test" onClick={handleClick}>Click</Link>);
      await user.click(screen.getByRole('link'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports custom rel attribute', () => {
      render(<Link href="/test" rel="nofollow">Link</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('rel', 'nofollow');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has no accessibility violations (default)', async () => {
      const { container } = render(<Link href="/test">Link</Link>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations (external)', async () => {
      const { container } = render(<Link href="https://example.com" external>External</Link>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations (disabled)', async () => {
      const { container } = render(<Link href="/test" disabled>Disabled</Link>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper focus styles', () => {
      render(<Link href="/test">Focus me</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles empty href', () => {
      render(<Link href="">Empty href</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '');
    });

    it('handles hash links', () => {
      render(<Link href="#section">Hash link</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '#section');
    });

    it('handles mailto links', () => {
      render(<Link href="mailto:test@example.com">Email</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('handles tel links', () => {
      render(<Link href="tel:+1234567890">Phone</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('href', 'tel:+1234567890');
    });

    it('handles very long text', () => {
      const longText = 'A'.repeat(500);
      render(<Link href="/test">{longText}</Link>);
      expect(screen.getByRole('link')).toHaveTextContent(longText);
    });

    it('renders with multiple children', () => {
      render(
        <Link href="/test">
          <span>Part 1</span>
          <span>Part 2</span>
        </Link>
      );
      expect(screen.getByText('Part 1')).toBeInTheDocument();
      expect(screen.getByText('Part 2')).toBeInTheDocument();
    });
  });
});
