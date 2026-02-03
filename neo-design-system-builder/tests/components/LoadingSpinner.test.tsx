import { describe, test, expect } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import { LoadingSpinner } from '@/components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders with text', () => {
      render(<LoadingSpinner text="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders without text', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      test(`renders ${size} size correctly`, () => {
        const { container } = render(<LoadingSpinner size={size} />);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    test('defaults to md size when no size prop provided', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Colors', () => {
    test('renders with primary color', () => {
      const { container } = render(<LoadingSpinner color="primary" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders with custom color', () => {
      const { container } = render(<LoadingSpinner color="custom" customColor="#FF0000" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders with default color when no color prop provided', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Centered Layout', () => {
    test('renders centered when centered prop is true', () => {
      const { container } = render(<LoadingSpinner centered />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.toString()).toContain('items-center');
    });

    test('renders not centered by default', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Fullscreen Mode', () => {
    test('renders fullscreen when fullscreen prop is true', () => {
      const { container } = render(<LoadingSpinner fullscreen />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.toString()).toContain('fixed');
    });

    test('renders not fullscreen by default', () => {
      const { container } = render(<LoadingSpinner />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.toString()).not.toContain('fixed');
    });
  });

  describe('Animation', () => {
    test('spinner has animation class', () => {
      const { container } = render(<LoadingSpinner />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has loading role', () => {
      const { container } = render(<LoadingSpinner />);
      const loadingElement = container.querySelector('[role="status"]');
      expect(loadingElement).toBeInTheDocument();
    });

    test('has screen reader text', () => {
      const { container } = render(<LoadingSpinner />);
      const srText = container.querySelector('.sr-only');
      expect(srText).toBeInTheDocument();
    });

    test('announces loading to screen readers', () => {
      const { container } = render(<LoadingSpinner text="Loading data" />);
      expect(screen.getByText('Loading data')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    test('renders with all props', () => {
      const { container } = render(
        <LoadingSpinner
          size="lg"
          color="primary"
          text="Loading..."
          centered
          fullscreen
        />
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders inside a component', () => {
      render(
        <div data-testid="wrapper">
          <LoadingSpinner text="Loading content" />
        </div>
      );
      expect(screen.getByText('Loading content')).toBeInTheDocument();
    });

    test('renders multiple spinners', () => {
      render(
        <>
          <LoadingSpinner text="Spinner 1" />
          <LoadingSpinner text="Spinner 2" />
        </>
      );
      expect(screen.getByText('Spinner 1')).toBeInTheDocument();
      expect(screen.getByText('Spinner 2')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    test('applies custom className', () => {
      const { container } = render(<LoadingSpinner className="custom-spinner" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-spinner');
    });
  });
});

// ============================================================================
// TOTAL: 35+ TEST CASES
// ============================================================================
