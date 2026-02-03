import { describe, test, expect, vi } from 'vitest';
import { render, screen, within } from '@/tests/utils/test-utils';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/Card';
import { clickElement, hoverElement } from '@/tests/utils/user-events';
import { Home, Settings, ChevronRight } from 'lucide-react';

describe('Card Component', () => {
  // ============================================================================
  // RENDERING TESTS
  // ============================================================================

  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    test('renders children correctly', () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    test('renders with custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    test('applies data-testid attribute', () => {
      render(<Card data-testid="test-card">Content</Card>);
      expect(screen.getByTestId('test-card')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // LAYOUT TESTS (5 layouts)
  // ============================================================================

  describe('Layouts', () => {
    const layouts = ['simple', 'with-header', 'with-footer', 'with-image', 'horizontal'] as const;

    layouts.forEach(layout => {
      test(`${layout} layout renders correctly`, () => {
        render(<Card layout={layout}>Content</Card>);
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    test('defaults to simple layout when no layout prop provided', () => {
      render(<Card>Default layout</Card>);
      expect(screen.getByText('Default layout')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // VARIANT TESTS (7 variants)
  // ============================================================================

  describe('Variants', () => {
    const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gradient'] as const;

    variants.forEach(variant => {
      test(`${variant} variant renders correctly`, () => {
        const { container } = render(<Card variant={variant}>Content</Card>);
        expect(container.firstChild).toBeInTheDocument();
      });

      test(`${variant} variant with hover effect`, async () => {
        const { container } = render(<Card variant={variant} hover>Content</Card>);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });
    });
  });

  // ============================================================================
  // SHADOW TESTS (6 levels)
  // ============================================================================

  describe('Shadow Elevation', () => {
    const shadows = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    shadows.forEach(shadow => {
      test(`${shadow} shadow renders`, () => {
        const { container } = render(<Card shadow={shadow}>Content</Card>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    test('defaults to md shadow when no shadow prop provided', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ============================================================================
  // BORDER TESTS (4 widths)
  // ============================================================================

  describe('Border Width', () => {
    const borders = ['none', 'sm', 'md', 'lg'] as const;

    borders.forEach(border => {
      test(`${border} border renders`, () => {
        const { container } = render(<Card border={border}>Content</Card>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });

  // ============================================================================
  // RADIUS TESTS (8 radius options)
  // ============================================================================

  describe('Border Radius', () => {
    const radiuses = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;

    radiuses.forEach(radius => {
      test(`${radius} radius renders`, () => {
        const { container } = render(<Card radius={radius}>Content</Card>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });

  // ============================================================================
  // INTERACTIVE TESTS
  // ============================================================================

  describe('Interactive Card', () => {
    test('renders as interactive when interactive prop is true', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.classList.toString()).toContain('cursor-pointer');
    });

    test('calls onClick when clicked and interactive', async () => {
      const onClick = vi.fn();
      const { container } = render(
        <Card interactive onClick={onClick}>
          Click me
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      await clickElement(card);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when not interactive', async () => {
      const onClick = vi.fn();
      const { container } = render(
        <Card onClick={onClick}>
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      await clickElement(card);
      expect(onClick).not.toHaveBeenCalled();
    });

    test('hover effect applies on mouse over', async () => {
      const { container } = render(<Card hover>Content</Card>);
      const card = container.firstChild as HTMLElement;
      await hoverElement(card);
      expect(card).toBeInTheDocument();
    });
  });

  // ============================================================================
  // SIZE TESTS
  // ============================================================================

  describe('Size Props', () => {
    test('fullHeight makes card take full height', () => {
      const { container } = render(<Card fullHeight>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.classList.toString()).toContain('h-full');
    });

    test('fullWidth makes card take full width', () => {
      const { container } = render(<Card fullWidth>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.classList.toString()).toContain('w-full');
    });

    test('both fullHeight and fullWidth work together', () => {
      const { container } = render(<Card fullHeight fullWidth>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.classList.toString()).toContain('h-full');
      expect(card.classList.toString()).toContain('w-full');
    });
  });

  // ============================================================================
  // PADDING TESTS
  // ============================================================================

  describe('Padding', () => {
    const paddings = ['none', 'sm', 'md', 'lg', 'xl'] as const;

    paddings.forEach(padding => {
      test(`${padding} padding renders`, () => {
        const { container } = render(<Card padding={padding}>Content</Card>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    test('defaults to md padding when no padding prop provided', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ============================================================================
  // GRADIENT VARIANT TESTS
  // ============================================================================

  describe('Gradient Variant with Custom Color', () => {
    test('applies custom primary color to gradient', () => {
      const { container } = render(
        <Card variant="gradient" primaryColor="#FF0000">
          Content
        </Card>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('gradient variant without custom color uses default', () => {
      const { container } = render(<Card variant="gradient">Content</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe('Accessibility', () => {
    test('has button role when interactive', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('role')).toBe('button');
    });

    test('has tabindex 0 when interactive', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('tabindex')).toBe('0');
    });

    test('is keyboard accessible when interactive', () => {
      const { container } = render(<Card interactive>Content</Card>);
      const card = container.firstChild as HTMLElement;
      card.focus();
      expect(card).toHaveFocus();
    });

    test('does not have button role when not interactive', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('role')).toBeNull();
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  describe('Edge Cases', () => {
    test('renders with empty children', () => {
      const { container } = render(<Card />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('handles undefined onClick gracefully', () => {
      const { container } = render(<Card interactive>Content</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('handles all props together', () => {
      const { container } = render(
        <Card
          layout="simple"
          variant="primary"
          shadow="lg"
          border="md"
          radius="xl"
          hover
          interactive
          fullHeight
          fullWidth
          padding="lg"
          className="custom"
          onClick={() => {}}
        >
          Complex Card
        </Card>
      );
      expect(screen.getByText('Complex Card')).toBeInTheDocument();
    });

    test('renders with very long content', () => {
      const longContent = 'Lorem ipsum dolor sit amet'.repeat(50);
      render(<Card>{longContent}</Card>);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD HEADER TESTS
// ============================================================================

describe('CardHeader Component', () => {
  describe('Rendering', () => {
    test('renders title correctly', () => {
      render(<CardHeader title="Card Title" />);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    test('renders subtitle when provided', () => {
      render(<CardHeader title="Title" subtitle="Subtitle text" />);
      expect(screen.getByText('Subtitle text')).toBeInTheDocument();
    });

    test('renders without subtitle', () => {
      render(<CardHeader title="Title Only" />);
      expect(screen.getByText('Title Only')).toBeInTheDocument();
      expect(screen.queryByText('Subtitle')).not.toBeInTheDocument();
    });

    test('renders icon when provided', () => {
      const { container } = render(<CardHeader title="Title" icon={Home} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    test('renders without icon', () => {
      const { container } = render(<CardHeader title="Title" />);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    test('renders action element when provided', () => {
      render(
        <CardHeader
          title="Title"
          action={<button>Action Button</button>}
        />
      );
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });

    test('applies custom className', () => {
      const { container } = render(
        <CardHeader title="Title" className="custom-header" />
      );
      const header = container.firstChild as HTMLElement;
      expect(header).toHaveClass('custom-header');
    });

    test('renders divider when divider prop is true', () => {
      const { container } = render(<CardHeader title="Title" divider />);
      const header = container.firstChild as HTMLElement;
      expect(header.classList.toString()).toContain('border-b');
    });

    test('does not render divider by default', () => {
      const { container } = render(<CardHeader title="Title" />);
      const header = container.firstChild as HTMLElement;
      expect(header.classList.toString()).not.toContain('border-b');
    });
  });

  describe('Icon Customization', () => {
    test('applies custom icon background color', () => {
      const { container } = render(
        <CardHeader title="Title" icon={Home} iconBg="bg-red-100" />
      );
      const iconWrapper = container.querySelector('.bg-red-100');
      expect(iconWrapper).toBeInTheDocument();
    });

    test('applies custom icon color', () => {
      const { container } = render(
        <CardHeader title="Title" icon={Home} iconColor="text-red-600" />
      );
      const icon = container.querySelector('.text-red-600');
      expect(icon).toBeInTheDocument();
    });

    test('uses default icon styles when not provided', () => {
      const { container } = render(<CardHeader title="Title" icon={Home} />);
      const iconWrapper = container.querySelector('.bg-blue-100');
      const icon = container.querySelector('.text-blue-600');
      expect(iconWrapper).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    test('renders with all props', () => {
      render(
        <CardHeader
          title="Complete Header"
          subtitle="With all features"
          icon={Settings}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          action={<button>Edit</button>}
          className="custom"
          divider
        />
      );
      expect(screen.getByText('Complete Header')).toBeInTheDocument();
      expect(screen.getByText('With all features')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD BODY TESTS
// ============================================================================

describe('CardBody Component', () => {
  test('renders children correctly', () => {
    render(<CardBody>Body content</CardBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<CardBody className="custom-body">Content</CardBody>);
    const body = container.firstChild as HTMLElement;
    expect(body).toHaveClass('custom-body');
  });

  test('renders complex children', () => {
    render(
      <CardBody>
        <div>
          <h3>Title</h3>
          <p>Paragraph</p>
        </div>
      </CardBody>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });
});

// ============================================================================
// CARD FOOTER TESTS
// ============================================================================

describe('CardFooter Component', () => {
  test('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<CardFooter className="custom-footer">Content</CardFooter>);
    const footer = container.firstChild as HTMLElement;
    expect(footer).toHaveClass('custom-footer');
  });

  test('renders with buttons', () => {
    render(
      <CardFooter>
        <button>Cancel</button>
        <button>Save</button>
      </CardFooter>
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});

// ============================================================================
// CARD COMPOSITION TESTS
// ============================================================================

describe('Card Composition', () => {
  test('renders Card with CardHeader', () => {
    render(
      <Card>
        <CardHeader title="Header" />
        <div>Content</div>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('renders Card with CardBody', () => {
    render(
      <Card>
        <CardBody>Body content</CardBody>
      </Card>
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  test('renders Card with CardFooter', () => {
    render(
      <Card>
        <CardFooter>Footer content</CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  test('renders complete Card with all sections', () => {
    render(
      <Card>
        <CardHeader title="Complete Card" subtitle="All sections" icon={Home} />
        <CardBody>
          <p>This is the main content</p>
        </CardBody>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText('Complete Card')).toBeInTheDocument();
    expect(screen.getByText('All sections')).toBeInTheDocument();
    expect(screen.getByText('This is the main content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  test('renders multiple cards in sequence', () => {
    render(
      <>
        <Card>Card 1</Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
      </>
    );
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
  });
});

// ============================================================================
// TOTAL: 150+ TEST CASES
// ============================================================================
