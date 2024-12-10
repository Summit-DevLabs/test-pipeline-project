/**
 * Common test utilities and helper functions
 */

/**
 * Type-check if a value is defined (not null or undefined)
 */
export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

/**
 * Mock response generator for API tests
 */
export const createMockResponse = (data: any, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => data,
  text: async () => JSON.stringify(data),
  headers: new Headers(),
});

/**
 * Wait for a specified time (useful for async tests)
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Create a mock event object
 */
export const createMockEvent = (overrides = {}) => ({
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  ...overrides,
});

/**
 * Generate random test data
 */
export const generateTestData = {
  string: (length = 10): string => {
    return Array.from({ length }, () => 
      String.fromCharCode(97 + Math.floor(Math.random() * 26))
    ).join('');
  },
  number: (min = 0, max = 100): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  boolean: (): boolean => {
    return Math.random() > 0.5;
  },
  array: <T>(generator: () => T, length = 5): T[] => {
    return Array.from({ length }, () => generator());
  },
  email: (): string => {
    return `${generateTestData.string(8)}@${generateTestData.string(6)}.com`;
  }
};
