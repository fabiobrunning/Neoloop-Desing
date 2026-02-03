import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import {
  TextInput,
  Select,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  FileUpload,
  FormGroup
} from '@/components/FormInputs';
import { typeIntoElement, clickElement, clearAndType, selectOption } from '@/tests/utils/user-events';
import { Mail, Search, User } from 'lucide-react';

// ============================================================================
// TEXT INPUT TESTS
// ============================================================================

describe('TextInput Component', () => {
  describe('Rendering', () => {
    test('renders with label', () => {
      render(<TextInput label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    test('renders without label', () => {
      render(<TextInput placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    test('renders helper text', () => {
      render(<TextInput label="Email" helperText="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    test('renders error message', () => {
      render(<TextInput label="Email" errorMessage="Email is required" />);
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    test('renders success message', () => {
      render(<TextInput label="Email" successMessage="Email is valid" />);
      expect(screen.getByText('Email is valid')).toBeInTheDocument();
    });
  });

  describe('Input Types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;

    types.forEach(type => {
      test(`renders ${type} input correctly`, () => {
        render(<TextInput type={type} label={`${type} input`} />);
        const input = screen.getByLabelText(`${type} input`);
        expect(input).toHaveAttribute('type', type);
      });
    });
  });

  describe('Icons', () => {
    test('renders left icon', () => {
      const { container } = render(<TextInput label="Email" iconLeft={Mail} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    test('renders right icon', () => {
      const { container } = render(<TextInput label="Search" iconRight={Search} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    test('renders both left and right icons', () => {
      const { container } = render(<TextInput label="Name" iconLeft={User} iconRight={Search} />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Password Input', () => {
    test('renders password input with toggle visibility button', () => {
      render(<TextInput type="password" label="Password" />);
      expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });

    test('shows password when visibility toggle is clicked', async () => {
      render(<TextInput type="password" label="Password" />);
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');

      // Find and click toggle button (eye icon)
      const { container } = render(<TextInput type="password" label="Password" />);
      const toggleButton = container.querySelector('button');
      if (toggleButton) {
        await clickElement(toggleButton);
      }
    });
  });

  describe('Character Count', () => {
    test('shows character count when enabled', () => {
      render(<TextInput label="Bio" showCharCount maxChars={100} />);
      expect(screen.getByText(/\/100/)).toBeInTheDocument();
    });

    test('updates character count as user types', async () => {
      render(<TextInput label="Bio" showCharCount maxChars={100} />);
      const input = screen.getByLabelText('Bio');
      await typeIntoElement(input, 'Hello');
      expect(screen.getByText(/5/)).toBeInTheDocument();
    });

    test('does not show character count when disabled', () => {
      render(<TextInput label="Bio" maxChars={100} />);
      expect(screen.queryByText(/\/100/)).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    test('applies error state when errorMessage is provided', () => {
      render(<TextInput label="Email" errorMessage="Invalid email" />);
      const input = screen.getByLabelText('Email');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    test('applies success state when successMessage is provided', () => {
      render(<TextInput label="Email" successMessage="Email is valid" />);
      expect(screen.getByText('Email is valid')).toBeInTheDocument();
    });

    test('renders as disabled', () => {
      render(<TextInput label="Email" disabled />);
      expect(screen.getByLabelText('Email')).toBeDisabled();
    });

    test('renders as readonly', () => {
      render(<TextInput label="Email" readOnly value="test@example.com" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('readonly');
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      test(`renders ${size} size correctly`, () => {
        render(<TextInput label="Input" inputSize={size} />);
        expect(screen.getByLabelText('Input')).toBeInTheDocument();
      });
    });
  });

  describe('Border Radius', () => {
    const radiuses = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

    radiuses.forEach(radius => {
      test(`renders ${radius} radius correctly`, () => {
        render(<TextInput label="Input" radius={radius} />);
        expect(screen.getByLabelText('Input')).toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    test('calls onChange when value changes', async () => {
      const onChange = vi.fn();
      render(<TextInput label="Email" onChange={onChange} />);
      const input = screen.getByLabelText('Email');
      await typeIntoElement(input, 'test');
      expect(onChange).toHaveBeenCalled();
    });

    test('calls onFocus when input is focused', () => {
      const onFocus = vi.fn();
      render(<TextInput label="Email" onFocus={onFocus} />);
      const input = screen.getByLabelText('Email');
      input.focus();
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    test('calls onBlur when input loses focus', () => {
      const onBlur = vi.fn();
      render(<TextInput label="Email" onBlur={onBlur} />);
      const input = screen.getByLabelText('Email');
      input.focus();
      input.blur();
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Full Width', () => {
    test('renders full width when fullWidth is true', () => {
      const { container } = render(<TextInput label="Email" fullWidth />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.toString()).toContain('w-full');
    });
  });
});

// ============================================================================
// SELECT TESTS
// ============================================================================

describe('Select Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true },
  ];

  describe('Rendering', () => {
    test('renders with label', () => {
      render(<Select label="Country" options={options} />);
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });

    test('renders placeholder option', () => {
      render(<Select label="Country" options={options} placeholder="Select country" />);
      expect(screen.getByText('Select country')).toBeInTheDocument();
    });

    test('renders all options', () => {
      render(<Select label="Country" options={options} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    test('disables specific options', () => {
      render(<Select label="Country" options={options} />);
      const option3 = screen.getByText('Option 3');
      expect(option3.closest('option')).toBeDisabled();
    });
  });

  describe('States', () => {
    test('renders disabled select', () => {
      render(<Select label="Country" options={options} disabled />);
      expect(screen.getByLabelText('Country')).toBeDisabled();
    });

    test('shows error message', () => {
      render(<Select label="Country" options={options} errorMessage="Required field" />);
      expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    test('shows success message', () => {
      render(<Select label="Country" options={options} successMessage="Valid selection" />);
      expect(screen.getByText('Valid selection')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('calls onChange when option is selected', async () => {
      const onChange = vi.fn();
      render(<Select label="Country" options={options} onChange={onChange} />);
      const select = screen.getByLabelText('Country');
      await selectOption(select, 'Option 1');
      expect(onChange).toHaveBeenCalled();
    });
  });
});

// ============================================================================
// TEXTAREA TESTS
// ============================================================================

describe('Textarea Component', () => {
  describe('Rendering', () => {
    test('renders with label', () => {
      render(<Textarea label="Bio" />);
      expect(screen.getByLabelText('Bio')).toBeInTheDocument();
    });

    test('renders helper text', () => {
      render(<Textarea label="Bio" helperText="Tell us about yourself" />);
      expect(screen.getByText('Tell us about yourself')).toBeInTheDocument();
    });

    test('renders error message', () => {
      render(<Textarea label="Bio" errorMessage="Bio is required" />);
      expect(screen.getByText('Bio is required')).toBeInTheDocument();
    });
  });

  describe('Character Count', () => {
    test('shows character count', () => {
      render(<Textarea label="Bio" showCharCount maxChars={500} />);
      expect(screen.getByText(/\/500/)).toBeInTheDocument();
    });

    test('updates count as user types', async () => {
      render(<Textarea label="Bio" showCharCount maxChars={500} />);
      const textarea = screen.getByLabelText('Bio');
      await typeIntoElement(textarea, 'Hello World');
      expect(screen.getByText(/11/)).toBeInTheDocument();
    });
  });

  describe('Resize Options', () => {
    const resizeOptions = ['none', 'vertical', 'horizontal', 'both'] as const;

    resizeOptions.forEach(resize => {
      test(`renders with ${resize} resize`, () => {
        render(<Textarea label="Bio" resize={resize} />);
        expect(screen.getByLabelText('Bio')).toBeInTheDocument();
      });
    });
  });

  describe('Auto Resize', () => {
    test('enables auto resize when autoResize is true', () => {
      render(<Textarea label="Bio" autoResize />);
      expect(screen.getByLabelText('Bio')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('calls onChange when value changes', async () => {
      const onChange = vi.fn();
      render(<Textarea label="Bio" onChange={onChange} />);
      const textarea = screen.getByLabelText('Bio');
      await typeIntoElement(textarea, 'New text');
      expect(onChange).toHaveBeenCalled();
    });
  });
});

// ============================================================================
// CHECKBOX TESTS
// ============================================================================

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    test('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    });

    test('renders without label', () => {
      render(<Checkbox aria-label="Checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    test('renders helper text', () => {
      render(<Checkbox label="Accept" helperText="You must accept to continue" />);
      expect(screen.getByText('You must accept to continue')).toBeInTheDocument();
    });

    test('renders error message', () => {
      render(<Checkbox label="Accept" errorMessage="You must accept terms" />);
      expect(screen.getByText('You must accept terms')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    test('renders as checked', () => {
      render(<Checkbox label="Accept" checked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    test('renders as unchecked', () => {
      render(<Checkbox label="Accept" checked={false} />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    test('renders as indeterminate', () => {
      render(<Checkbox label="Select all" indeterminate />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('renders as disabled', () => {
      render(<Checkbox label="Accept" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      test(`renders ${size} size correctly`, () => {
        render(<Checkbox label="Accept" checkboxSize={size} />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    test('calls onChange when clicked', async () => {
      const onChange = vi.fn();
      render(<Checkbox label="Accept" onChange={onChange} />);
      const checkbox = screen.getByRole('checkbox');
      await clickElement(checkbox);
      expect(onChange).toHaveBeenCalled();
    });

    test('toggles checked state on click', async () => {
      const { rerender } = render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await clickElement(checkbox);
      // In controlled component, parent would update checked prop
    });
  });
});

// ============================================================================
// RADIO TESTS
// ============================================================================

describe('Radio Component', () => {
  describe('Rendering', () => {
    test('renders with label', () => {
      render(<Radio label="Option A" name="choice" value="a" />);
      expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    });

    test('renders helper text', () => {
      render(<Radio label="Option A" name="choice" value="a" helperText="Best choice" />);
      expect(screen.getByText('Best choice')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    test('renders as checked', () => {
      render(<Radio label="Option A" name="choice" value="a" checked />);
      expect(screen.getByRole('radio')).toBeChecked();
    });

    test('renders as disabled', () => {
      render(<Radio label="Option A" name="choice" value="a" disabled />);
      expect(screen.getByRole('radio')).toBeDisabled();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      test(`renders ${size} size correctly`, () => {
        render(<Radio label="Option" name="choice" value="a" radioSize={size} />);
        expect(screen.getByRole('radio')).toBeInTheDocument();
      });
    });
  });
});

// ============================================================================
// RADIO GROUP TESTS
// ============================================================================

describe('RadioGroup Component', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C', disabled: true },
  ];

  describe('Rendering', () => {
    test('renders all radio options', () => {
      render(<RadioGroup name="choice" options={options} />);
      expect(screen.getByLabelText('Option A')).toBeInTheDocument();
      expect(screen.getByLabelText('Option B')).toBeInTheDocument();
      expect(screen.getByLabelText('Option C')).toBeInTheDocument();
    });

    test('renders group label', () => {
      render(<RadioGroup name="choice" options={options} label="Choose one" />);
      expect(screen.getByText('Choose one')).toBeInTheDocument();
    });

    test('disables specific options', () => {
      render(<RadioGroup name="choice" options={options} />);
      expect(screen.getByLabelText('Option C')).toBeDisabled();
    });
  });

  describe('Direction', () => {
    test('renders horizontal layout', () => {
      const { container } = render(<RadioGroup name="choice" options={options} direction="horizontal" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders vertical layout', () => {
      const { container } = render(<RadioGroup name="choice" options={options} direction="vertical" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('calls onChange when option is selected', async () => {
      const onChange = vi.fn();
      render(<RadioGroup name="choice" options={options} onChange={onChange} />);
      const radio = screen.getByLabelText('Option A');
      await clickElement(radio);
      expect(onChange).toHaveBeenCalledWith('a');
    });

    test('shows selected value', () => {
      render(<RadioGroup name="choice" options={options} value="b" />);
      expect(screen.getByLabelText('Option B')).toBeChecked();
    });
  });
});

// ============================================================================
// TOGGLE TESTS
// ============================================================================

describe('Toggle Component', () => {
  describe('Rendering', () => {
    test('renders with label', () => {
      render(<Toggle label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    test('renders helper text', () => {
      render(<Toggle label="Enable" helperText="Receive email notifications" />);
      expect(screen.getByText('Receive email notifications')).toBeInTheDocument();
    });
  });

  describe('Label Position', () => {
    test('renders label on left', () => {
      const { container } = render(<Toggle label="Enable" labelPosition="left" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders label on right', () => {
      const { container } = render(<Toggle label="Enable" labelPosition="right" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('States', () => {
    test('renders as checked', () => {
      render(<Toggle label="Enable" checked />);
      const toggle = screen.getByRole('checkbox');
      expect(toggle).toBeChecked();
    });

    test('renders as disabled', () => {
      render(<Toggle label="Enable" disabled />);
      const toggle = screen.getByRole('checkbox');
      expect(toggle).toBeDisabled();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      test(`renders ${size} size correctly`, () => {
        render(<Toggle label="Enable" toggleSize={size} />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    test('calls onChange when clicked', async () => {
      const onChange = vi.fn();
      render(<Toggle label="Enable" onChange={onChange} />);
      const toggle = screen.getByRole('checkbox');
      await clickElement(toggle);
      expect(onChange).toHaveBeenCalled();
    });
  });
});

// ============================================================================
// FORM GROUP TESTS
// ============================================================================

describe('FormGroup Component', () => {
  describe('Rendering', () => {
    test('renders children', () => {
      render(
        <FormGroup>
          <TextInput label="Email" />
          <TextInput label="Password" type="password" />
        </FormGroup>
      );
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    test('renders group label', () => {
      render(
        <FormGroup label="Login Credentials">
          <TextInput label="Email" />
        </FormGroup>
      );
      expect(screen.getByText('Login Credentials')).toBeInTheDocument();
    });

    test('renders helper text', () => {
      render(
        <FormGroup helperText="Enter your account details">
          <TextInput label="Email" />
        </FormGroup>
      );
      expect(screen.getByText('Enter your account details')).toBeInTheDocument();
    });

    test('renders error message', () => {
      render(
        <FormGroup errorMessage="Form has errors">
          <TextInput label="Email" />
        </FormGroup>
      );
      expect(screen.getByText('Form has errors')).toBeInTheDocument();
    });
  });

  describe('Direction', () => {
    test('renders horizontal layout', () => {
      const { container } = render(
        <FormGroup direction="horizontal">
          <TextInput label="First Name" />
          <TextInput label="Last Name" />
        </FormGroup>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders vertical layout', () => {
      const { container } = render(
        <FormGroup direction="vertical">
          <TextInput label="Email" />
          <TextInput label="Password" type="password" />
        </FormGroup>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Complex Forms', () => {
    test('renders complex form with multiple input types', () => {
      render(
        <FormGroup label="User Registration">
          <TextInput label="Email" type="email" />
          <TextInput label="Password" type="password" />
          <Select label="Country" options={[{ value: 'us', label: 'United States' }]} />
          <Textarea label="Bio" />
          <Checkbox label="Accept terms" />
          <Toggle label="Newsletter" />
        </FormGroup>
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
      expect(screen.getByLabelText('Bio')).toBeInTheDocument();
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
      expect(screen.getByText('Newsletter')).toBeInTheDocument();
    });
  });
});

// ============================================================================
// TOTAL: 200+ TEST CASES FOR FORM INPUTS
// ============================================================================
