import React, { useState } from 'react';
import {
  TextInput,
  Select,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Toggle,
  FormGroup,
  InputSize,
  InputRadius,
} from './FormInputs';
import { Button } from './Button';
import {
  Mail, Lock, User, Phone, Search, Link, CreditCard,
  DollarSign, Calendar, Globe, Send, Check
} from 'lucide-react';
import type { ColorToken } from '../src/types/design-system';

// ============================================================================
// TYPES
// ============================================================================

interface FormShowcaseProps {
  colors: ColorToken[];
}

// ============================================================================
// SECTION COMPONENT
// ============================================================================

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    {description && (
      <p className="text-sm text-slate-500 mb-6">{description}</p>
    )}
    {children}
  </div>
);

// ============================================================================
// FORM SHOWCASE COMPONENT
// ============================================================================

const FormShowcase: React.FC<FormShowcaseProps> = ({ colors }) => {
  // Form state
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: 'John Doe',
    phone: '',
    search: '',
    url: '',
    amount: '',
    message: '',
    plan: 'pro',
    country: '',
    newsletter: false,
    terms: true,
    marketing: false,
    billing: 'monthly',
    features: ['feature1', 'feature3'],
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Get colors from design system
  const primaryColor = colors.find(c => c.id === 'p-500')?.hex || '#2b4bee';

  // Handlers
  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormValues(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCheckboxChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [field]: e.target.checked }));
  };

  const handleRadioChange = (field: string) => (value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxGroupChange = (field: string) => (values: string[]) => {
    setFormValues(prev => ({ ...prev, [field]: values }));
  };

  const handleToggleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = () => {
    setLoadingSubmit(true);
    setTimeout(() => setLoadingSubmit(false), 2000);
  };

  // Options
  const planOptions = [
    { value: 'basic', label: 'Basic Plan - $9/mo' },
    { value: 'pro', label: 'Pro Plan - $29/mo' },
    { value: 'enterprise', label: 'Enterprise - $99/mo' },
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'br', label: 'Brazil' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
  ];

  const billingOptions = [
    { value: 'monthly', label: 'Monthly billing' },
    { value: 'yearly', label: 'Yearly billing (save 20%)' },
    { value: 'lifetime', label: 'Lifetime access' },
  ];

  const featureOptions = [
    { value: 'feature1', label: 'Email notifications' },
    { value: 'feature2', label: 'SMS alerts' },
    { value: 'feature3', label: 'Push notifications' },
    { value: 'feature4', label: 'Slack integration', disabled: true },
  ];

  const sizes: InputSize[] = ['sm', 'md', 'lg'];
  const radii: InputRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full'];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* ================================================================== */}
      {/* TEXT INPUTS - ALL TYPES */}
      {/* ================================================================== */}
      <Section
        title="Text Inputs"
        description="Different input types for various data collection needs."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            type="email"
            label="Email Address"
            placeholder="your@email.com"
            helperText="We'll never share your email"
            iconLeft={Mail}
            value={formValues.email}
            onChange={handleInputChange('email')}
          />

          <TextInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            helperText="Must be at least 8 characters"
            iconLeft={Lock}
            value={formValues.password}
            onChange={handleInputChange('password')}
          />

          <TextInput
            type="text"
            label="Full Name"
            placeholder="John Doe"
            iconLeft={User}
            value={formValues.name}
            onChange={handleInputChange('name')}
            successMessage="Name is valid"
          />

          <TextInput
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            iconLeft={Phone}
            value={formValues.phone}
            onChange={handleInputChange('phone')}
          />

          <TextInput
            type="search"
            label="Search"
            placeholder="Search anything..."
            iconLeft={Search}
            value={formValues.search}
            onChange={handleInputChange('search')}
          />

          <TextInput
            type="url"
            label="Website URL"
            placeholder="https://example.com"
            iconLeft={Globe}
            value={formValues.url}
            onChange={handleInputChange('url')}
            errorMessage="Please enter a valid URL"
          />

          <TextInput
            type="number"
            label="Amount"
            placeholder="0.00"
            iconLeft={DollarSign}
            value={formValues.amount}
            onChange={handleInputChange('amount')}
          />

          <TextInput
            type="text"
            label="Disabled Input"
            placeholder="Cannot edit"
            disabled
            value="Disabled value"
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* INPUT STATES */}
      {/* ================================================================== */}
      <Section
        title="Input States"
        description="Visual feedback for different states: default, focus, error, success, and disabled."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TextInput
            label="Default State"
            placeholder="Type something..."
          />

          <TextInput
            label="Success State"
            value="Valid input"
            successMessage="Looks good!"
          />

          <TextInput
            label="Error State"
            value="Invalid"
            errorMessage="This field is required"
          />

          <TextInput
            label="Disabled State"
            value="Cannot edit"
            disabled
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* INPUT SIZES */}
      {/* ================================================================== */}
      <Section
        title="Input Sizes"
        description="Three sizes available: small (sm), medium (md), and large (lg)."
      >
        <div className="space-y-4 max-w-md">
          {sizes.map((size) => (
            <TextInput
              key={size}
              inputSize={size}
              label={`${size.toUpperCase()} Size`}
              placeholder={`Input with ${size} size`}
              iconLeft={User}
            />
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* INPUT RADIUS */}
      {/* ================================================================== */}
      <Section
        title="Border Radius Options"
        description="Different corner styles from sharp to fully rounded."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {radii.map((radius) => (
            <TextInput
              key={radius}
              radius={radius}
              placeholder={`radius: ${radius}`}
            />
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHARACTER COUNT */}
      {/* ================================================================== */}
      <Section
        title="Character Count"
        description="Show character count with optional max limit."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Username"
            placeholder="Enter username"
            showCharCount
            maxChars={20}
            helperText="Choose a unique username"
          />

          <TextInput
            label="Bio (no limit)"
            placeholder="Tell us about yourself"
            showCharCount
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SELECT */}
      {/* ================================================================== */}
      <Section
        title="Select / Dropdown"
        description="Dropdown menus for selecting from predefined options."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Select Plan"
            placeholder="Choose a plan..."
            options={planOptions}
            value={formValues.plan}
            onChange={handleInputChange('plan')}
            helperText="You can change this later"
          />

          <Select
            label="Country"
            placeholder="Select your country..."
            options={countryOptions}
            value={formValues.country}
            onChange={handleInputChange('country')}
          />

          <Select
            label="Success State"
            options={planOptions}
            value="pro"
            successMessage="Great choice!"
          />

          <Select
            label="Error State"
            options={planOptions}
            placeholder="Select..."
            errorMessage="Please select an option"
          />

          <Select
            label="Disabled State"
            options={planOptions}
            value="basic"
            disabled
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* TEXTAREA */}
      {/* ================================================================== */}
      <Section
        title="Textarea"
        description="Multi-line text input with various options."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textarea
            label="Message"
            placeholder="Write your message here..."
            helperText="Be descriptive"
            value={formValues.message}
            onChange={handleInputChange('message')}
            rows={4}
          />

          <Textarea
            label="With Character Count"
            placeholder="Limited to 200 characters..."
            showCharCount
            maxChars={200}
            rows={4}
          />

          <Textarea
            label="Auto-resize"
            placeholder="This textarea grows as you type..."
            autoResize
            rows={2}
          />

          <Textarea
            label="Error State"
            placeholder="Message..."
            errorMessage="Message is required"
            rows={4}
          />

          <Textarea
            label="No Resize"
            placeholder="Cannot be resized..."
            resize="none"
            rows={4}
          />

          <Textarea
            label="Disabled"
            value="Cannot edit this content"
            disabled
            rows={4}
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHECKBOX */}
      {/* ================================================================== */}
      <Section
        title="Checkboxes"
        description="For multiple selections and boolean options."
      >
        <div className="space-y-6">
          {/* Single Checkboxes */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Single Checkboxes</p>
            <div className="space-y-3">
              <Checkbox
                label="Subscribe to newsletter"
                helperText="Get weekly updates"
                checked={formValues.newsletter}
                onChange={handleCheckboxChange('newsletter')}
              />

              <Checkbox
                label="I agree to terms and conditions"
                checked={formValues.terms}
                onChange={handleCheckboxChange('terms')}
              />

              <Checkbox
                label="Marketing communications"
                checked={formValues.marketing}
                onChange={handleCheckboxChange('marketing')}
              />
            </div>
          </div>

          {/* Checkbox States */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Checkbox States</p>
            <div className="flex flex-wrap gap-6">
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" checked />
              <Checkbox label="Indeterminate" indeterminate />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled Checked" disabled checked />
            </div>
          </div>

          {/* Checkbox Sizes */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Checkbox Sizes</p>
            <div className="flex flex-wrap gap-6">
              {sizes.map((size) => (
                <Checkbox
                  key={size}
                  checkboxSize={size}
                  label={`${size.toUpperCase()} size`}
                  checked
                />
              ))}
            </div>
          </div>

          {/* Checkbox with Error */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Checkbox with Error</p>
            <Checkbox
              label="Accept privacy policy"
              errorMessage="You must accept the privacy policy"
            />
          </div>

          {/* Checkbox Group */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Checkbox Group</p>
            <CheckboxGroup
              label="Notification Preferences"
              options={featureOptions}
              values={formValues.features}
              onChange={handleCheckboxGroupChange('features')}
            />
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* RADIO BUTTONS */}
      {/* ================================================================== */}
      <Section
        title="Radio Buttons"
        description="For single selection from multiple options."
      >
        <div className="space-y-6">
          {/* Single Radios */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Single Radio Buttons</p>
            <div className="space-y-3">
              <Radio name="single-demo" label="Option A" value="a" />
              <Radio name="single-demo" label="Option B" value="b" />
              <Radio name="single-demo" label="Option C (disabled)" value="c" disabled />
            </div>
          </div>

          {/* Radio Group - Vertical */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Radio Group (Vertical)</p>
            <RadioGroup
              name="billing"
              label="Billing Cycle"
              options={billingOptions}
              value={formValues.billing}
              onChange={handleRadioChange('billing')}
            />
          </div>

          {/* Radio Group - Horizontal */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Radio Group (Horizontal)</p>
            <RadioGroup
              name="plan-horizontal"
              options={[
                { value: 'basic', label: 'Basic' },
                { value: 'pro', label: 'Pro' },
                { value: 'enterprise', label: 'Enterprise' },
              ]}
              direction="horizontal"
            />
          </div>

          {/* Radio Sizes */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Radio Sizes</p>
            <div className="flex flex-wrap gap-6">
              {sizes.map((size) => (
                <Radio
                  key={size}
                  name={`radio-size-${size}`}
                  radioSize={size}
                  label={`${size.toUpperCase()} size`}
                  checked
                />
              ))}
            </div>
          </div>

          {/* Radio Group with Error */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Radio Group with Error</p>
            <RadioGroup
              name="required-choice"
              label="Required Selection"
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              errorMessage="Please make a selection"
            />
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* TOGGLE / SWITCH */}
      {/* ================================================================== */}
      <Section
        title="Toggle / Switch"
        description="Binary on/off switches for settings and preferences."
      >
        <div className="space-y-6">
          {/* Basic Toggles */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Basic Toggles</p>
            <div className="space-y-4">
              <Toggle
                label="Enable notifications"
                helperText="Receive push notifications"
                checked={formValues.notifications}
                onChange={handleToggleChange('notifications')}
              />

              <Toggle
                label="Dark mode"
                checked={formValues.darkMode}
                onChange={handleToggleChange('darkMode')}
              />

              <Toggle
                label="Auto-save"
                helperText="Automatically save changes"
                checked={formValues.autoSave}
                onChange={handleToggleChange('autoSave')}
              />
            </div>
          </div>

          {/* Toggle States */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Toggle States</p>
            <div className="flex flex-wrap gap-6">
              <Toggle label="Off" />
              <Toggle label="On" checked />
              <Toggle label="Disabled Off" disabled />
              <Toggle label="Disabled On" disabled checked />
            </div>
          </div>

          {/* Toggle Sizes */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Toggle Sizes</p>
            <div className="flex flex-wrap items-center gap-6">
              {sizes.map((size) => (
                <Toggle
                  key={size}
                  toggleSize={size}
                  label={`${size.toUpperCase()} size`}
                  checked
                />
              ))}
            </div>
          </div>

          {/* Label Position */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Label Position</p>
            <div className="flex flex-wrap gap-8">
              <Toggle
                label="Label on right"
                labelPosition="right"
                checked
              />
              <Toggle
                label="Label on left"
                labelPosition="left"
                checked
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* FORM GROUP */}
      {/* ================================================================== */}
      <Section
        title="Form Group"
        description="Container for organizing and spacing form elements."
      >
        <div className="space-y-8">
          {/* Vertical Form Group */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Vertical Layout (default)</p>
            <FormGroup spacing="md" className="max-w-md">
              <TextInput label="First Name" placeholder="John" />
              <TextInput label="Last Name" placeholder="Doe" />
              <TextInput type="email" label="Email" placeholder="john@example.com" />
            </FormGroup>
          </div>

          {/* Horizontal Form Group */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Horizontal Layout</p>
            <FormGroup direction="horizontal" spacing="md" align="end">
              <TextInput label="City" placeholder="New York" fullWidth={false} wrapperClassName="flex-1" />
              <TextInput label="State" placeholder="NY" fullWidth={false} wrapperClassName="w-24" />
              <TextInput label="ZIP" placeholder="10001" fullWidth={false} wrapperClassName="w-32" />
            </FormGroup>
          </div>

          {/* Different Spacing */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Different Spacing Options</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-400 mb-2">spacing="sm"</p>
                <FormGroup spacing="sm">
                  <TextInput placeholder="Field 1" />
                  <TextInput placeholder="Field 2" />
                </FormGroup>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">spacing="md"</p>
                <FormGroup spacing="md">
                  <TextInput placeholder="Field 1" />
                  <TextInput placeholder="Field 2" />
                </FormGroup>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">spacing="lg"</p>
                <FormGroup spacing="lg">
                  <TextInput placeholder="Field 1" />
                  <TextInput placeholder="Field 2" />
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* COMPLETE FORM EXAMPLE */}
      {/* ================================================================== */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Complete Form Example</h3>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
          <FormGroup spacing="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                placeholder="John"
                iconLeft={User}
              />
              <TextInput
                label="Last Name"
                placeholder="Doe"
                iconLeft={User}
              />
            </div>

            <TextInput
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              iconLeft={Mail}
              helperText="We'll send confirmation here"
            />

            <TextInput
              type="tel"
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              iconLeft={Phone}
            />

            <Select
              label="Select Plan"
              placeholder="Choose your plan..."
              options={planOptions}
            />

            <Textarea
              label="Message"
              placeholder="Tell us how we can help..."
              showCharCount
              maxChars={500}
              rows={4}
            />

            <RadioGroup
              name="contact-method"
              label="Preferred Contact Method"
              options={[
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
                { value: 'both', label: 'Both' },
              ]}
              direction="horizontal"
            />

            <div className="space-y-3 pt-2">
              <Checkbox
                label="Subscribe to our newsletter"
                helperText="Get updates about new features and promotions"
              />
              <Checkbox
                label="I agree to the terms and conditions"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                fullWidth
                primaryColor={primaryColor}
                iconRight={Send}
                loading={loadingSubmit}
                onClick={handleSubmit}
              >
                Submit Form
              </Button>
              <Button variant="outline" fullWidth>
                Cancel
              </Button>
            </div>
          </FormGroup>
        </div>
      </div>

      {/* ================================================================== */}
      {/* API REFERENCE */}
      {/* ================================================================== */}
      <Section
        title="Component API"
        description="Quick reference for Form components props."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-bold text-slate-900">Component</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Key Props</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">States</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">TextInput</td>
                <td className="py-3 px-4 font-mono text-xs">type, label, helperText, errorMessage, successMessage, iconLeft, iconRight, inputSize, radius, showCharCount, maxChars</td>
                <td className="py-3 px-4">default, focus, error, success, disabled</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">Select</td>
                <td className="py-3 px-4 font-mono text-xs">options, placeholder, label, helperText, errorMessage, successMessage, inputSize, radius</td>
                <td className="py-3 px-4">default, focus, error, success, disabled</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">Textarea</td>
                <td className="py-3 px-4 font-mono text-xs">label, helperText, errorMessage, rows, autoResize, resize, showCharCount, maxChars</td>
                <td className="py-3 px-4">default, focus, error, success, disabled</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">Checkbox</td>
                <td className="py-3 px-4 font-mono text-xs">label, helperText, errorMessage, indeterminate, checkboxSize</td>
                <td className="py-3 px-4">unchecked, checked, indeterminate, disabled</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">Radio</td>
                <td className="py-3 px-4 font-mono text-xs">label, helperText, radioSize, name, value</td>
                <td className="py-3 px-4">unchecked, checked, disabled</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">RadioGroup</td>
                <td className="py-3 px-4 font-mono text-xs">name, options, value, onChange, direction, label, errorMessage</td>
                <td className="py-3 px-4">horizontal, vertical</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">Toggle</td>
                <td className="py-3 px-4 font-mono text-xs">label, helperText, toggleSize, labelPosition, checked</td>
                <td className="py-3 px-4">off, on, disabled</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">CheckboxGroup</td>
                <td className="py-3 px-4 font-mono text-xs">label, options, values, onChange, direction, errorMessage</td>
                <td className="py-3 px-4">horizontal, vertical</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-blue-600">FormGroup</td>
                <td className="py-3 px-4 font-mono text-xs">spacing (sm|md|lg), direction (horizontal|vertical), align (start|center|end)</td>
                <td className="py-3 px-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

export default FormShowcase;
