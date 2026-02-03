/**
 * Mock data factories for component props
 * Use these to generate test props with sensible defaults
 */

// Button props factory
export interface MockButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const mockButtonProps = (overrides?: Partial<MockButtonProps>): MockButtonProps => ({
  variant: 'primary',
  size: 'md',
  children: 'Click me',
  disabled: false,
  loading: false,
  onClick: () => {},
  ...overrides
});

// Input props factory
export interface MockInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time';
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const mockInputProps = (overrides?: Partial<MockInputProps>): MockInputProps => ({
  type: 'text',
  label: 'Test Input',
  placeholder: 'Enter text',
  value: '',
  disabled: false,
  required: false,
  onChange: () => {},
  ...overrides
});

// Select props factory
export interface SelectOption {
  value: string;
  label: string;
}

export interface MockSelectProps {
  label?: string;
  options?: SelectOption[];
  value?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  onChange?: (value: string | string[]) => void;
}

export const mockSelectProps = (overrides?: Partial<MockSelectProps>): MockSelectProps => ({
  label: 'Test Select',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ],
  value: '',
  disabled: false,
  multiple: false,
  searchable: false,
  placeholder: 'Select an option',
  onChange: () => {},
  ...overrides
});

// Card props factory
export interface MockCardProps {
  layout?: 'default' | 'horizontal' | 'minimal' | 'product' | 'feature';
  variant?: 'elevated' | 'outlined' | 'filled' | 'flat';
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}

export const mockCardProps = (overrides?: Partial<MockCardProps>): MockCardProps => ({
  layout: 'default',
  variant: 'elevated',
  children: 'Card content',
  ...overrides
});

// Checkbox props factory
export interface MockCheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (checked: boolean) => void;
}

export const mockCheckboxProps = (overrides?: Partial<MockCheckboxProps>): MockCheckboxProps => ({
  label: 'Test Checkbox',
  checked: false,
  indeterminate: false,
  disabled: false,
  onChange: () => {},
  ...overrides
});

// Design System context mock
export const mockDesignSystemState = {
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1'
    },
    secondary: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0',
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A',
      900: '#4A148C'
    }
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'Fira Code, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem'
  }
};

// Mock file for upload tests
export const mockFile = (overrides?: Partial<File>): File => {
  const blob = new Blob(['test content'], { type: 'text/plain' });
  return new File([blob], 'test.txt', {
    type: 'text/plain',
    lastModified: Date.now(),
    ...overrides
  });
};

// Mock image file
export const mockImageFile = (overrides?: Partial<File>): File => {
  const blob = new Blob([''], { type: 'image/png' });
  return new File([blob], 'test.png', {
    type: 'image/png',
    lastModified: Date.now(),
    ...overrides
  });
};

// Mock multiple select options
export const mockLargeSelectOptions = (count: number = 100): SelectOption[] => {
  return Array.from({ length: count }, (_, i) => ({
    value: `${i + 1}`,
    label: `Option ${i + 1}`
  }));
};

// Mock event handlers with spy
export const mockEventHandlers = () => ({
  onClick: vi.fn(),
  onChange: vi.fn(),
  onFocus: vi.fn(),
  onBlur: vi.fn(),
  onSubmit: vi.fn(),
  onKeyDown: vi.fn(),
  onKeyUp: vi.fn(),
  onMouseEnter: vi.fn(),
  onMouseLeave: vi.fn()
});
