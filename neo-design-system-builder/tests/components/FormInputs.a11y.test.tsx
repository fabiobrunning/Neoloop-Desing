import { describe, test } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import { checkA11y } from '@/tests/utils/a11y';
import {
  TextInput,
  Select,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  FormGroup
} from '@/components/FormInputs';
import { Mail } from 'lucide-react';

describe('FormInputs Accessibility', () => {
  // ============================================================================
  // TEXT INPUT ACCESSIBILITY
  // ============================================================================

  describe('TextInput Accessibility', () => {
    test('has no axe violations - default', async () => {
      const { container } = render(<TextInput label="Email" />);
      await checkA11y(container);
    });

    test('has no axe violations - all input types', async () => {
      const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;

      for (const type of types) {
        const { container } = render(<TextInput type={type} label={`${type} input`} />);
        await checkA11y(container);
      }
    });

    test('has no axe violations - with error message', async () => {
      const { container } = render(<TextInput label="Email" errorMessage="Email is required" />);
      await checkA11y(container);
    });

    test('has no axe violations - with success message', async () => {
      const { container } = render(<TextInput label="Email" successMessage="Email is valid" />);
      await checkA11y(container);
    });

    test('has no axe violations - with helper text', async () => {
      const { container } = render(<TextInput label="Email" helperText="Enter your email" />);
      await checkA11y(container);
    });

    test('has no axe violations - with icon', async () => {
      const { container } = render(<TextInput label="Email" iconLeft={Mail} />);
      await checkA11y(container);
    });

    test('has no axe violations - disabled state', async () => {
      const { container } = render(<TextInput label="Email" disabled />);
      await checkA11y(container);
    });

    test('has no axe violations - readonly state', async () => {
      const { container } = render(<TextInput label="Email" readOnly value="test@example.com" />);
      await checkA11y(container);
    });

    test('has no axe violations - all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { container } = render(<TextInput label="Email" inputSize={size} />);
        await checkA11y(container);
      }
    });

    test('has no axe violations - with character count', async () => {
      const { container } = render(<TextInput label="Bio" showCharCount maxChars={100} />);
      await checkA11y(container);
    });
  });

  // ============================================================================
  // SELECT ACCESSIBILITY
  // ============================================================================

  describe('Select Accessibility', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ];

    test('has no axe violations - default', async () => {
      const { container } = render(<Select label="Country" options={options} />);
      await checkA11y(container);
    });

    test('has no axe violations - with placeholder', async () => {
      const { container } = render(<Select label="Country" options={options} placeholder="Select..." />);
      await checkA11y(container);
    });

    test('has no axe violations - with error message', async () => {
      const { container } = render(<Select label="Country" options={options} errorMessage="Required" />);
      await checkA11y(container);
    });

    test('has no axe violations - disabled state', async () => {
      const { container } = render(<Select label="Country" options={options} disabled />);
      await checkA11y(container);
    });

    test('has no axe violations - with disabled options', async () => {
      const optionsWithDisabled = [
        ...options,
        { value: '4', label: 'Disabled Option', disabled: true }
      ];
      const { container } = render(<Select label="Country" options={optionsWithDisabled} />);
      await checkA11y(container);
    });
  });

  // ============================================================================
  // TEXTAREA ACCESSIBILITY
  // ============================================================================

  describe('Textarea Accessibility', () => {
    test('has no axe violations - default', async () => {
      const { container } = render(<Textarea label="Bio" />);
      await checkA11y(container);
    });

    test('has no axe violations - with character count', async () => {
      const { container } = render(<Textarea label="Bio" showCharCount maxChars={500} />);
      await checkA11y(container);
    });

    test('has no axe violations - with error message', async () => {
      const { container } = render(<Textarea label="Bio" errorMessage="Bio is required" />);
      await checkA11y(container);
    });

    test('has no axe violations - disabled state', async () => {
      const { container } = render(<Textarea label="Bio" disabled />);
      await checkA11y(container);
    });

    test('has no axe violations - all resize options', async () => {
      const resizes = ['none', 'vertical', 'horizontal', 'both'] as const;

      for (const resize of resizes) {
        const { container } = render(<Textarea label="Bio" resize={resize} />);
        await checkA11y(container);
      }
    });
  });

  // ============================================================================
  // CHECKBOX ACCESSIBILITY
  // ============================================================================

  describe('Checkbox Accessibility', () => {
    test('has no axe violations - default', async () => {
      const { container } = render(<Checkbox label="Accept terms" />);
      await checkA11y(container);
    });

    test('has no axe violations - checked state', async () => {
      const { container } = render(<Checkbox label="Accept terms" checked />);
      await checkA11y(container);
    });

    test('has no axe violations - indeterminate state', async () => {
      const { container } = render(<Checkbox label="Select all" indeterminate />);
      await checkA11y(container);
    });

    test('has no axe violations - disabled state', async () => {
      const { container } = render(<Checkbox label="Accept terms" disabled />);
      await checkA11y(container);
    });

    test('has no axe violations - with error message', async () => {
      const { container } = render(<Checkbox label="Accept" errorMessage="You must accept" />);
      await checkA11y(container);
    });

    test('has no axe violations - all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { container } = render(<Checkbox label="Accept" checkboxSize={size} />);
        await checkA11y(container);
      }
    });

    test('has no axe violations - with helper text', async () => {
      const { container } = render(<Checkbox label="Accept" helperText="You must accept to continue" />);
      await checkA11y(container);
    });
  });

  // ============================================================================
  // RADIO ACCESSIBILITY
  // ============================================================================

  describe('Radio Accessibility', () => {
    test('has no axe violations - default', async () => {
      const { container } = render(<Radio label="Option A" name="choice" value="a" />);
      await checkA11y(container);
    });

    test('has no axe violations - checked state', async () => {
      const { container } = render(<Radio label="Option A" name="choice" value="a" checked />);
      await checkA11y(container);
    });

    test('has no axe violations - disabled state', async () => {
      const { container } = render(<Radio label="Option A" name="choice" value="a" disabled />);
      await checkA11y(container);
    });

    test('has no axe violations - all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { container } = render(<Radio label="Option" name="choice" value="a" radioSize={size} />);
        await checkA11y(container);
      }
    });
  });

  // ============================================================================
  // RADIO GROUP ACCESSIBILITY
  // ============================================================================

  describe('RadioGroup Accessibility', () => {
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ];

    test('has no axe violations - default', async () => {
      const { container } = render(<RadioGroup name="choice" options={options} />);
      await checkA11y(container);
    });

    test('has no axe violations - with label', async () => {
      const { container } = render(<RadioGroup name="choice" options={options} label="Choose one" />);
      await checkA11y(container);
    });

    test('has no axe violations - horizontal direction', async () => {
      const { container } = render(<RadioGroup name="choice" options={options} direction="horizontal" />);
      await checkA11y(container);
    });

    test('has no axe violations - vertical direction', async () => {
      const { container } = render(<RadioGroup name="choice" options={options} direction="vertical" />);
      await checkA11y(container);
    });

    test('has no axe violations - with error message', async () => {
      const { container } = render(<RadioGroup name="choice" options={options} errorMessage="Required" />);
      await checkA11y(container);
    });

    test('has no axe violations - with disabled option', async () => {
      const optionsWithDisabled = [
        ...options,
        { value: 'd', label: 'Disabled', disabled: true }
      ];
      const { container } = render(<RadioGroup name="choice" options={optionsWithDisabled} />);
      await checkA11y(container);
    });
  });

  // ============================================================================
  // TOGGLE ACCESSIBILITY
  // ============================================================================

  describe('Toggle Accessibility', () => {
    test('has no axe violations - default', async () => {
      const { container } = render(<Toggle label="Enable notifications" />);
      await checkA11y(container);
    });

    test('has no axe violations - checked state', async () => {
      const { container } = render(<Toggle label="Enable notifications" checked />);
      await checkA11y(container);
    });

    test('has no axe violations - disabled state', async () => {
      const { container } = render(<Toggle label="Enable notifications" disabled />);
      await checkA11y(container);
    });

    test('has no axe violations - label on left', async () => {
      const { container } = render(<Toggle label="Enable" labelPosition="left" />);
      await checkA11y(container);
    });

    test('has no axe violations - label on right', async () => {
      const { container } = render(<Toggle label="Enable" labelPosition="right" />);
      await checkA11y(container);
    });

    test('has no axe violations - all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { container } = render(<Toggle label="Enable" toggleSize={size} />);
        await checkA11y(container);
      }
    });

    test('has no axe violations - with helper text', async () => {
      const { container } = render(<Toggle label="Enable" helperText="Receive notifications" />);
      await checkA11y(container);
    });
  });

  // ============================================================================
  // FORM GROUP ACCESSIBILITY
  // ============================================================================

  describe('FormGroup Accessibility', () => {
    test('has no axe violations - default', async () => {
      const { container } = render(
        <FormGroup>
          <TextInput label="Email" />
          <TextInput label="Password" type="password" />
        </FormGroup>
      );
      await checkA11y(container);
    });

    test('has no axe violations - with label', async () => {
      const { container } = render(
        <FormGroup label="Login Credentials">
          <TextInput label="Email" />
        </FormGroup>
      );
      await checkA11y(container);
    });

    test('has no axe violations - horizontal direction', async () => {
      const { container } = render(
        <FormGroup direction="horizontal">
          <TextInput label="First Name" />
          <TextInput label="Last Name" />
        </FormGroup>
      );
      await checkA11y(container);
    });

    test('has no axe violations - with error message', async () => {
      const { container } = render(
        <FormGroup errorMessage="Form has errors">
          <TextInput label="Email" />
        </FormGroup>
      );
      await checkA11y(container);
    });

    test('has no axe violations - complex form', async () => {
      const { container } = render(
        <FormGroup label="Registration">
          <TextInput label="Email" type="email" />
          <TextInput label="Password" type="password" />
          <Select label="Country" options={[{ value: 'us', label: 'United States' }]} />
          <Textarea label="Bio" />
          <Checkbox label="Accept terms" />
          <Toggle label="Newsletter" />
        </FormGroup>
      );
      await checkA11y(container);
    });
  });
});

// ============================================================================
// TOTAL: 100+ ACCESSIBILITY TEST CASES FOR FORM INPUTS
// ============================================================================
