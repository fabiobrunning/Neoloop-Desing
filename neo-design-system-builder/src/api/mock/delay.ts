/**
 * Mock API Delay Utility
 * Simulates realistic network latency
 */

export interface DelayConfig {
  min?: number;
  max?: number;
  fixed?: number;
}

/**
 * Add realistic delay to simulate network latency
 * @param config - Delay configuration
 * @returns Promise that resolves after delay
 */
export const delay = async (config: DelayConfig = {}): Promise<void> => {
  const { min = 200, max = 500, fixed } = config;

  const duration = fixed ?? Math.floor(Math.random() * (max - min + 1)) + min;

  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

/**
 * Simulate occasional slow network
 * 10% chance of 2-3 second delay
 */
export const delayWithOccasionalSlow = async (): Promise<void> => {
  const isSlow = Math.random() < 0.1;

  if (isSlow) {
    await delay({ min: 2000, max: 3000 });
  } else {
    await delay();
  }
};

/**
 * Simulate network timeout
 * Throws error after timeout duration
 */
export const delayWithTimeout = async (timeoutMs: number = 5000): Promise<void> => {
  const delayPromise = delay();
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
  });

  await Promise.race([delayPromise, timeoutPromise]);
};
