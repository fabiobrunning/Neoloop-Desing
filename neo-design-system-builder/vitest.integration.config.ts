import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'integration',
      include: ['**/*.integration.test.{ts,tsx}'],
      coverage: {
        thresholds: {
          lines: 90,
          functions: 90,
          branches: 85,
          statements: 90
        }
      },
      testTimeout: 15000,
      hookTimeout: 15000
    }
  })
);
