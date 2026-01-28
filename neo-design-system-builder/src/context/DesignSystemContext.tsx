import { createContext, useContext, Dispatch } from 'react';
import type { DesignSystem, DesignSystemAction } from '../types/design-system';

interface DesignSystemContextType {
  state: DesignSystem;
  dispatch: Dispatch<DesignSystemAction>;
}

export const DesignSystemContext = createContext<DesignSystemContextType | null>(null);

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
}
