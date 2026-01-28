import { useReducer, useEffect, ReactNode } from 'react';
import { DesignSystemContext } from './DesignSystemContext';
import { designSystemReducer } from './designSystemReducer';
import { initialDesignSystem } from '../../constants';
import type { DesignSystem } from '../types/design-system';

interface DesignSystemProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'neoloop_ds_autosave';

function loadFromStorage(): DesignSystem {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load saved state:', error);
  }
  return initialDesignSystem;
}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  const [state, dispatch] = useReducer(
    designSystemReducer,
    initialDesignSystem,
    loadFromStorage
  );

  useEffect(() => {
    console.log('✅ DesignSystemProvider mounted with state:', state);
  }, []);

  return (
    <DesignSystemContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignSystemContext.Provider>
  );
}
