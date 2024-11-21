import { isDefined, wait } from '../utils/testUtils';

describe('Utility Function Testing Examples', () => {
  describe('Type Checking', () => {
    it('should validate defined values', () => {
      expect(isDefined('')).toBe(true);
      expect(isDefined(0)).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined({})).toBe(true);
    });

    it('should identify undefined values', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('Async Operations', () => {
    it('should wait for specified time', async () => {
      const startTime = Date.now();
      await wait(100);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    });

    it('should handle multiple async operations', async () => {
      const results: number[] = [];
      
      await Promise.all([
        wait(100).then(() => results.push(1)),
        wait(50).then(() => results.push(2))
      ]);

      expect(results).toEqual([2, 1]);
    });
  });

  describe('Error Handling', () => {
    const throwError = () => {
      throw new Error('Test error');
    };

    it('should catch synchronous errors', () => {
      expect(throwError).toThrow('Test error');
    });

    it('should catch async errors', async () => {
      const asyncThrow = async () => {
        await wait(50);
        throwError();
      };

      await expect(asyncThrow()).rejects.toThrow('Test error');
    });
  });

  describe('Test Organization', () => {
    let testValue: number;

    beforeAll(() => {
      // Setup that runs once before all tests
      testValue = 1;
    });

    beforeEach(() => {
      // Setup that runs before each test
      testValue++;
    });

    afterEach(() => {
      // Cleanup that runs after each test
      jest.clearAllMocks();
    });

    afterAll(() => {
      // Cleanup that runs once after all tests
      testValue = 0;
    });

    it('should demonstrate test lifecycle', () => {
      expect(testValue).toBe(2);
    });

    it('should maintain isolated test state', () => {
      expect(testValue).toBe(3);
    });
  });
});
