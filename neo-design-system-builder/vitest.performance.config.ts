import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'performance',
      include: ['**/*.performance.test.{ts,tsx}'],
      testTimeout: 30000,
      hookTimeout: 30000
    }
  })
);
