/**
 * Mock API Error Scenarios
 * Simulates various API error conditions
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Simulate random errors (5% chance)
 */
export const maybeThrowError = (errorRate: number = 0.05): void => {
  if (Math.random() < errorRate) {
    const errors = [
      new ApiError('Network error', 500, 'NETWORK_ERROR'),
      new ApiError('Not found', 404, 'NOT_FOUND'),
      new ApiError('Unauthorized', 401, 'UNAUTHORIZED'),
      new ApiError('Bad request', 400, 'BAD_REQUEST'),
      new ApiError('Rate limit exceeded', 429, 'RATE_LIMIT'),
    ];

    const randomError = errors[Math.floor(Math.random() * errors.length)];
    throw randomError;
  }
};

/**
 * Validation error
 */
export const validationError = (field: string, message: string): ApiError => {
  return new ApiError('Validation failed', 422, 'VALIDATION_ERROR', {
    field,
    message,
  });
};

/**
 * Not found error
 */
export const notFoundError = (resource: string): ApiError => {
  return new ApiError(`${resource} not found`, 404, 'NOT_FOUND');
};

/**
 * Unauthorized error
 */
export const unauthorizedError = (): ApiError => {
  return new ApiError('Unauthorized access', 401, 'UNAUTHORIZED');
};

/**
 * Rate limit error
 */
export const rateLimitError = (): ApiError => {
  return new ApiError('Too many requests', 429, 'RATE_LIMIT', {
    retryAfter: 60,
  });
};
