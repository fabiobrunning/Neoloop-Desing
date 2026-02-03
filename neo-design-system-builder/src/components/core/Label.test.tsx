import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Label } from './Label';

expect.extend(toHaveNoViolations);

describe('Label', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders label with text', () => {
      render(<Label>Email</Label>);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders with htmlFor attribute', () => {
      render(<Label htmlFor="email-input">Email</Label>);
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    it('renders children correctly', () => {
      render(<Label><span>Custom Content</span></Label>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Label className="custom-class">Label</Label>);
      expect(screen.getByText('Label')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLabelElement>();
      render(<Label ref={ref}>Label</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    });
  });

  // Required indicator
  describe('Required Indicator', () => {
    it('shows asterisk when required', () => {
      render(<Label required>Name</Label>);
      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveClass('text-red-500');
    });

    it('has aria-label for required indicator', () => {
      render(<Label required>Name</Label>);
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });

    it('has title attribute for required indicator', () => {
      render(<Label required>Name</Label>);
      const asterisk = screen.getByText('*');
      expect(asterisk).toHaveAttribute('title', 'Required field');
    });

    it('does not show asterisk when not required', () => {
      render(<Label>Name</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  // Optional indicator
  describe('Optional Indicator', () => {
    it('shows (optional) when optional is true', () => {
      render(<Label optional>Phone</Label>);
      expect(screen.getByText('(optional)')).toBeInTheDocument();
    });

    it('has aria-label for optional indicator', () => {
      render(<Label optional>Phone</Label>);
      expect(screen.getByLabelText('optional')).toBeInTheDocument();
    });

    it('does not show (optional) when not optional', () => {
      render(<Label>Phone</Label>);
      expect(screen.queryByText('(optional)')).not.toBeInTheDocument();
    });

    it('does not show (optional) when required is true', () => {
      render(<Label required optional>Name</Label>);
      expect(screen.queryByText('(optional)')).not.toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('styles optional text correctly', () => {
      render(<Label optional>Phone</Label>);
      const optionalText = screen.getByText('(optional)');
      expect(optionalText).toHaveClass('text-gray-400', 'text-xs', 'font-normal');
    });
  });

  // Sizes
  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Label size="sm">Small</Label>);
      expect(screen.getByText('Small')).toHaveClass('text-xs');
    });

    it('renders medium size (default)', () => {
      render(<Label size="md">Medium</Label>);
      expect(screen.getByText('Medium')).toHaveClass('text-sm');
    });

    it('renders large size', () => {
      render(<Label size="lg">Large</Label>);
      expect(screen.getByText('Large')).toHaveClass('text-base');
    });
  });

  // Disabled state
  describe('Disabled State', () => {
    it('applies disabled styles', () => {
      render(<Label disabled>Disabled</Label>);
      const label = screen.getByText('Disabled');
      expect(label).toHaveClass('text-gray-400', 'cursor-not-allowed');
    });

    it('shows required indicator when disabled', () => {
      render(<Label disabled required>Name</Label>);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('has cursor-pointer when not disabled', () => {
      render(<Label>Enabled</Label>);
      expect(screen.getByText('Enabled')).toHaveClass('cursor-pointer');
    });
  });

  // Interactions
  describe('User Interactions', () => {
    it('clicking label focuses associated input', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Label htmlFor="test-input">Click me</Label>
          <input id="test-input" type="text" />
        </div>
      );

      const label = screen.getByText('Click me');
      const input = screen.getByRole('textbox');

      await user.click(label);
      expect(input).toHaveFocus();
    });

    it('disabled label still triggers focus on input', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Label htmlFor="test-input" disabled>Click me</Label>
          <input id="test-input" type="text" />
        </div>
      );

      const label = screen.getByText('Click me');
      const input = screen.getByRole('textbox');

      await user.click(label);
      expect(input).toHaveFocus();
    });
  });

  // Custom props
  describe('Custom Props', () => {
    it('passes through additional HTML attributes', () => {
      render(<Label data-testid="custom-label" title="Custom Title">Label</Label>);
      const label = screen.getByTestId('custom-label');
      expect(label).toHaveAttribute('title', 'Custom Title');
    });

    it('supports onClick event', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Label onClick={handleClick}>Click</Label>);
      await user.click(screen.getByText('Click'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports custom aria attributes', () => {
      render(<Label aria-describedby="description">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('aria-describedby', 'description');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has no accessibility violations (default)', async () => {
      const { container } = render(<Label htmlFor="input">Label</Label>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations (required)', async () => {
      const { container } = render(<Label htmlFor="input" required>Label</Label>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations (optional)', async () => {
      const { container } = render(<Label htmlFor="input" optional>Label</Label>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations (disabled)', async () => {
      const { container } = render(<Label htmlFor="input" disabled>Label</Label>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('properly associates with form control', () => {
      render(
        <div>
          <Label htmlFor="email">Email</Label>
          <input id="email" type="email" />
        </div>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAccessibleName('Email');
    });
  });

  // Combined states
  describe('Combined States', () => {
    it('handles required + disabled', () => {
      render(<Label required disabled>Field</Label>);
      const label = screen.getByText('Field');
      expect(label).toHaveClass('cursor-not-allowed');
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('handles required + small size', () => {
      render(<Label required size="sm">Field</Label>);
      const label = screen.getByText('Field');
      expect(label).toHaveClass('text-xs');
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('handles optional + large size', () => {
      render(<Label optional size="lg">Field</Label>);
      const label = screen.getByText('Field');
      expect(label).toHaveClass('text-base');
      expect(screen.getByText('(optional)')).toBeInTheDocument();
    });

    it('handles disabled + optional (optional shown)', () => {
      render(<Label disabled optional>Field</Label>);
      expect(screen.getByText('(optional)')).toBeInTheDocument();
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles very long label text', () => {
      const longText = 'A'.repeat(200);
      render(<Label>{longText}</Label>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles label with no htmlFor', () => {
      render(<Label>No association</Label>);
      const label = screen.getByText('No association');
      expect(label).not.toHaveAttribute('for');
    });

    it('renders with complex children', () => {
      render(
        <Label htmlFor="test">
          <span>Part 1</span>
          <strong>Part 2</strong>
        </Label>
      );
      expect(screen.getByText('Part 1')).toBeInTheDocument();
      expect(screen.getByText('Part 2')).toBeInTheDocument();
    });

    it('handles empty string htmlFor', () => {
      render(<Label htmlFor="">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('for', '');
    });
  });

  // Dark mode
  describe('Dark Mode', () => {
    it('applies dark mode classes when not disabled', () => {
      const { container } = render(
        <div className="dark">
          <Label>Label</Label>
        </div>
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('dark:text-gray-300');
    });

    it('applies dark mode asterisk color', () => {
      const { container } = render(
        <div className="dark">
          <Label required>Label</Label>
        </div>
      );
      const asterisk = screen.getByText('*');
      expect(asterisk).toHaveClass('dark:text-red-400');
    });
  });
});
