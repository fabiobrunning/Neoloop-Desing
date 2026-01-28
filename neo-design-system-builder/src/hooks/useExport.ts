import { useCallback } from 'react';
import { exportJSON } from '../utils/exportJSON';
import { exportCSS } from '../utils/exportCSS';
import type { DesignSystem } from '../types/design-system';

export function useExport(designSystem: DesignSystem) {
  const handleExportJSON = useCallback(() => {
    exportJSON(designSystem);
  }, [designSystem]);

  const handleExportCSS = useCallback(() => {
    exportCSS(designSystem);
  }, [designSystem]);

  const handleExportBoth = useCallback(() => {
    exportJSON(designSystem);
    exportCSS(designSystem);
  }, [designSystem]);

  return {
    exportJSON: handleExportJSON,
    exportCSS: handleExportCSS,
    exportBoth: handleExportBoth,
  };
}
