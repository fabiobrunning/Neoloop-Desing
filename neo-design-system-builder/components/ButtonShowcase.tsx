import React, { useState } from 'react';
import { Button, ButtonGroup, IconButton, ButtonVariant, ButtonSize, ButtonRadius } from './Button';
import {
  Plus, Download, Trash2, Check, ArrowRight, Send,
  ShoppingCart, Heart, Share2, Star, Upload, Copy,
  Settings, ChevronDown, ExternalLink, Play, Pause,
  RefreshCw, Save, Edit, Eye, Mail, Phone, Bell,
  LogIn, LogOut, User, Lock, Search, Filter
} from 'lucide-react';
import type { ColorToken } from '../src/types/design-system';

// ============================================================================
// TYPES
// ============================================================================

interface ButtonShowcaseProps {
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
// BUTTON SHOWCASE COMPONENT
// ============================================================================

const ButtonShowcase: React.FC<ButtonShowcaseProps> = ({ colors }) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  // Get colors from design system
  const primaryColor = colors.find(c => c.id === 'p-500')?.hex || '#2b4bee';
  const successColor = colors.find(c => c.id === 's-500')?.hex || '#22c55e';
  const errorColor = colors.find(c => c.id === 'e-500')?.hex || '#ef4444';

  // Simulate loading
  const handleLoadingClick = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'link'];
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const radii: ButtonRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full'];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* ================================================================== */}
      {/* VARIANTS */}
      {/* ================================================================== */}
      <Section
        title="Button Variants"
        description="All available visual styles for different use cases and contexts."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} primaryColor={variant === 'primary' ? primaryColor : undefined}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SIZES */}
      {/* ================================================================== */}
      <Section
        title="Button Sizes"
        description="From extra small (xs) to extra large (xl) for different contexts."
      >
        <div className="flex items-center gap-4 flex-wrap">
          {sizes.map((size) => (
            <Button key={size} size={size} primaryColor={primaryColor}>
              {size.toUpperCase()} Button
            </Button>
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* BORDER RADIUS */}
      {/* ================================================================== */}
      <Section
        title="Border Radius Options"
        description="Different corner styles from sharp to fully rounded."
      >
        <div className="flex items-center gap-4 flex-wrap">
          {radii.map((radius) => (
            <Button key={radius} radius={radius} primaryColor={primaryColor}>
              {radius}
            </Button>
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* ICONS */}
      {/* ================================================================== */}
      <Section
        title="Buttons with Icons"
        description="Icons can be placed on the left, right, or used alone."
      >
        <div className="space-y-6">
          {/* Icon Left */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Icon Left</p>
            <div className="flex flex-wrap gap-3">
              <Button iconLeft={Plus} primaryColor={primaryColor}>Add New</Button>
              <Button iconLeft={Download} variant="secondary">Download</Button>
              <Button iconLeft={Upload} variant="outline">Upload</Button>
              <Button iconLeft={Trash2} variant="danger">Delete</Button>
            </div>
          </div>

          {/* Icon Right */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Icon Right</p>
            <div className="flex flex-wrap gap-3">
              <Button iconRight={ArrowRight} primaryColor={primaryColor}>Continue</Button>
              <Button iconRight={ExternalLink} variant="secondary">Open Link</Button>
              <Button iconRight={ChevronDown} variant="outline">Dropdown</Button>
              <Button iconRight={Send} variant="success">Submit</Button>
            </div>
          </div>

          {/* Icon Only */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Icon Only</p>
            <div className="flex flex-wrap gap-3">
              <IconButton icon={Plus} aria-label="Add" primaryColor={primaryColor} />
              <IconButton icon={Heart} aria-label="Favorite" variant="secondary" />
              <IconButton icon={Share2} aria-label="Share" variant="outline" />
              <IconButton icon={Settings} aria-label="Settings" variant="ghost" />
              <IconButton icon={Trash2} aria-label="Delete" variant="danger" />
              <IconButton icon={Check} aria-label="Confirm" variant="success" />
            </div>
          </div>

          {/* Icon Only Sizes */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Icon Button Sizes</p>
            <div className="flex items-center gap-3">
              {sizes.map((size) => (
                <IconButton
                  key={size}
                  icon={Star}
                  aria-label={`Star ${size}`}
                  size={size}
                  primaryColor={primaryColor}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* STATES */}
      {/* ================================================================== */}
      <Section
        title="Button States"
        description="Different states: normal, hover, active, loading, and disabled."
      >
        <div className="space-y-6">
          {/* Loading States */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Loading States (click to test)</p>
            <div className="flex flex-wrap gap-3">
              <Button
                loading={loadingStates['load1']}
                onClick={() => handleLoadingClick('load1')}
                primaryColor={primaryColor}
              >
                Save Changes
              </Button>
              <Button
                loading={loadingStates['load2']}
                loadingText="Processing..."
                onClick={() => handleLoadingClick('load2')}
                variant="secondary"
              >
                Process
              </Button>
              <Button
                loading={loadingStates['load3']}
                onClick={() => handleLoadingClick('load3')}
                variant="success"
                iconLeft={Check}
              >
                Submit
              </Button>
              <IconButton
                icon={RefreshCw}
                aria-label="Refresh"
                loading={loadingStates['load4']}
                onClick={() => handleLoadingClick('load4')}
                variant="outline"
              />
            </div>
          </div>

          {/* Disabled States */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Disabled States</p>
            <div className="flex flex-wrap gap-3">
              <Button disabled primaryColor={primaryColor}>Primary Disabled</Button>
              <Button disabled variant="secondary">Secondary Disabled</Button>
              <Button disabled variant="outline">Outline Disabled</Button>
              <Button disabled variant="danger" iconLeft={Trash2}>Delete Disabled</Button>
              <IconButton icon={Settings} aria-label="Settings" disabled variant="ghost" />
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* FULL WIDTH */}
      {/* ================================================================== */}
      <Section
        title="Full Width Buttons"
        description="Buttons that span the full width of their container."
      >
        <div className="space-y-4 max-w-md">
          <Button fullWidth primaryColor={primaryColor} iconRight={ArrowRight}>
            Continue to Checkout
          </Button>
          <Button fullWidth variant="secondary" iconLeft={User}>
            Continue with Google
          </Button>
          <Button fullWidth variant="outline">
            Cancel
          </Button>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* BUTTON GROUPS */}
      {/* ================================================================== */}
      <Section
        title="Button Groups"
        description="Group related buttons together with spacing or attached styles."
      >
        <div className="space-y-6">
          {/* Attached Group */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Attached Group</p>
            <ButtonGroup attached>
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Center</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
          </div>

          {/* Spaced Groups */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Spaced Groups</p>
            <div className="space-y-4">
              <ButtonGroup spacing="sm">
                <Button primaryColor={primaryColor} iconLeft={Save}>Save</Button>
                <Button variant="secondary">Cancel</Button>
              </ButtonGroup>

              <ButtonGroup spacing="md">
                <Button variant="outline" iconLeft={Eye}>Preview</Button>
                <Button variant="outline" iconLeft={Edit}>Edit</Button>
                <Button variant="danger" iconLeft={Trash2}>Delete</Button>
              </ButtonGroup>

              <ButtonGroup spacing="lg">
                <Button primaryColor={primaryColor}>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Icon Button Group */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Icon Button Group</p>
            <ButtonGroup attached>
              <IconButton icon={Play} aria-label="Play" variant="secondary" />
              <IconButton icon={Pause} aria-label="Pause" variant="secondary" />
              <IconButton icon={RefreshCw} aria-label="Refresh" variant="secondary" />
            </ButtonGroup>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* REAL WORLD EXAMPLES */}
      {/* ================================================================== */}
      <Section
        title="Real World Examples"
        description="Common button patterns used in applications."
      >
        <div className="space-y-8">
          {/* Auth Buttons */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Authentication</p>
            <div className="flex flex-wrap gap-3">
              <Button primaryColor={primaryColor} iconLeft={LogIn}>Sign In</Button>
              <Button variant="outline" iconLeft={User}>Create Account</Button>
              <Button variant="ghost" iconLeft={Lock}>Forgot Password</Button>
            </div>
          </div>

          {/* E-commerce */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">E-commerce</p>
            <div className="flex flex-wrap gap-3">
              <Button primaryColor={primaryColor} iconLeft={ShoppingCart} size="lg">
                Add to Cart - $99
              </Button>
              <Button variant="outline" iconLeft={Heart}>Add to Wishlist</Button>
              <Button variant="secondary" iconLeft={Share2}>Share</Button>
            </div>
          </div>

          {/* Form Actions */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Form Actions</p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="success"
                iconLeft={Check}
                loading={loadingStates['form']}
                onClick={() => handleLoadingClick('form')}
              >
                Submit Form
              </Button>
              <Button variant="secondary">Save Draft</Button>
              <Button variant="ghost">Clear Form</Button>
              <Button variant="link">Reset to Defaults</Button>
            </div>
          </div>

          {/* Contact Actions */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Contact Actions</p>
            <div className="flex flex-wrap gap-3">
              <Button primaryColor={primaryColor} iconLeft={Mail}>Send Email</Button>
              <Button variant="secondary" iconLeft={Phone}>Call Now</Button>
              <Button variant="outline" iconLeft={Bell}>Subscribe</Button>
            </div>
          </div>

          {/* Data Actions */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">Data Actions</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" iconLeft={Download}>Export CSV</Button>
              <Button variant="secondary" iconLeft={Copy}>Duplicate</Button>
              <Button variant="secondary" iconLeft={Filter}>Filter</Button>
              <Button variant="secondary" iconLeft={Search}>Search</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CALL TO ACTION */}
      {/* ================================================================== */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Call-to-Action Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            size="lg"
            primaryColor={primaryColor}
            iconRight={ArrowRight}
            className="hover:scale-105 shadow-2xl"
          >
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="secondary"
            iconLeft={ShoppingCart}
            className="hover:scale-105 shadow-xl bg-white"
          >
            Add to Cart
          </Button>
          <Button
            size="lg"
            variant="success"
            iconLeft={Send}
            className="hover:scale-105 shadow-2xl"
          >
            Send Message
          </Button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* API REFERENCE */}
      {/* ================================================================== */}
      <Section
        title="Component API"
        description="Quick reference for Button component props."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-bold text-slate-900">Prop</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Type</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Default</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Description</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">variant</td>
                <td className="py-3 px-4 font-mono text-xs">'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'link'</td>
                <td className="py-3 px-4 font-mono">'primary'</td>
                <td className="py-3 px-4">Visual style variant</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">size</td>
                <td className="py-3 px-4 font-mono text-xs">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="py-3 px-4 font-mono">'md'</td>
                <td className="py-3 px-4">Button size</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">radius</td>
                <td className="py-3 px-4 font-mono text-xs">'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                <td className="py-3 px-4 font-mono">'lg'</td>
                <td className="py-3 px-4">Border radius style</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">iconLeft</td>
                <td className="py-3 px-4 font-mono text-xs">LucideIcon</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4">Icon on the left</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">iconRight</td>
                <td className="py-3 px-4 font-mono text-xs">LucideIcon</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4">Icon on the right</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">iconOnly</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono">false</td>
                <td className="py-3 px-4">Square icon button</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">fullWidth</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono">false</td>
                <td className="py-3 px-4">Take full container width</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">loading</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono">false</td>
                <td className="py-3 px-4">Show loading spinner</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">disabled</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono">false</td>
                <td className="py-3 px-4">Disabled state</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-blue-600">primaryColor</td>
                <td className="py-3 px-4 font-mono text-xs">string (hex)</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4">Override primary color</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

export default ButtonShowcase;
