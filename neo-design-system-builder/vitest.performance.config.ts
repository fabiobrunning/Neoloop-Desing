import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'performance',
      include: ['**/*.performance.test.{ts,tsx}'],
      testTimeout: 30000,
      hookTimeout: 30000,
      coverage: {
        enabled: false
      },
      // Run performance tests sequentially to avoid interference
      poolOptions: {
        threads: {
          singleThread: true
        }
      }
    }
  })
);
