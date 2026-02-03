// Example test file to validate test setup
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Simple component for testing
function TestComponent({ message }: { message: string }) {
  return <div data-testid="test-component">{message}</div>;
}

describe('Test Setup Validation', () => {
  it('should render a component', () => {
    render(<TestComponent message="Hello, World!" />);
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });

  it('should display the correct message', () => {
    render(<TestComponent message="Test Message" />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should pass basic assertions', () => {
    expect(1 + 1).toBe(2);
    expect(true).toBeTruthy();
    expect([1, 2, 3]).toHaveLength(3);
  });
});
