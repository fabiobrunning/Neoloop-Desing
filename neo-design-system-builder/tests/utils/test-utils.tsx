import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { DesignSystemProvider } from '@/src/context/DesignSystemProvider';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: any;
}

/**
 * Custom render function that wraps components with necessary providers
 *
 * @example
 * const { getByRole } = renderWithProviders(<Button>Click me</Button>);
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { initialState, ...renderOptions } = options || {};

  function Wrapper({ children }: { children: ReactNode }) {
    if (initialState) {
      return (
        <DesignSystemProvider initialState={initialState}>
          {children}
        </DesignSystemProvider>
      );
    }
    return <DesignSystemProvider>{children}</DesignSystemProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from Testing Library
export * from '@testing-library/react';

// Override render with our custom version
export { renderWithProviders as render };
