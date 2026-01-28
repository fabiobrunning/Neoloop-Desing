
import { DesignSystem } from './types';

export const initialDesignSystem: DesignSystem = {
  name: "Neo Design System",
  version: "1.0.0",
  colors: [
    { id: 'p-500', name: 'Primary 500', hex: '#2b4bee', group: 'Primary' },
    { id: 'p-600', name: 'Primary 600', hex: '#1e3a8a', group: 'Primary' },
    { id: 'n-100', name: 'Neutral 100', hex: '#f1f5f9', group: 'Neutral' },
    { id: 'n-900', name: 'Neutral 900', hex: '#0f172a', group: 'Neutral' },
    { id: 's-500', name: 'Success 500', hex: '#22c55e', group: 'Success' },
    { id: 'w-500', name: 'Warning 500', hex: '#f59e0b', group: 'Warning' },
    { id: 'e-500', name: 'Error 500', hex: '#ef4444', group: 'Error' },
  ],
  typography: [
    { id: 'h1', name: 'Display H1', size: '48px', weight: '700', lineHeight: '1.2' },
    { id: 'h2', name: 'Display H2', size: '36px', weight: '700', lineHeight: '1.2' },
    { id: 'p-lg', name: 'Body Large', size: '18px', weight: '400', lineHeight: '1.5' },
    { id: 'p-md', name: 'Body Medium', size: '16px', weight: '400', lineHeight: '1.5' },
    { id: 'label', name: 'Label Small', size: '12px', weight: '600', lineHeight: '1' },
  ],
  spacing: [
    { id: 'xs', name: 'Space 4', value: 4 },
    { id: 'sm', name: 'Space 8', value: 8 },
    { id: 'md', name: 'Space 16', value: 16 },
    { id: 'lg', name: 'Space 24', value: 24 },
    { id: 'xl', name: 'Space 32', value: 32 },
  ],
  shadows: [
    { id: 'sm', name: 'Shadow Small', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    { id: 'md', name: 'Shadow Medium', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
    { id: 'lg', name: 'Shadow Large', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
    { id: 'xl', name: 'Shadow Extra Large', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
  ],
  borderRadius: [4, 8, 12, 16, 999],
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};
