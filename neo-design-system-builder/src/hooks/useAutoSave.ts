import { useEffect, useRef } from 'react';
import type { DesignSystem } from '../types/design-system';

const STORAGE_KEY = 'neoloop_ds_autosave';
const DEFAULT_DELAY = 30000; // 30 seconds

export function useAutoSave(designSystem: DesignSystem, delay = DEFAULT_DELAY) {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(designSystem));
        console.log('✅ Auto-saved at', new Date().toISOString());
      } catch (error) {
        console.error('❌ Auto-save failed:', error);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [designSystem, delay]);
}
