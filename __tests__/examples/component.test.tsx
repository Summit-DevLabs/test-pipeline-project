import { createMockEvent, generateTestData } from '../utils/testUtils';

// Example component props type
interface ButtonProps {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

describe('Component Testing Examples', () => {
  describe('Event Handling', () => {
    it('should handle click events', () => {
      const mockClick = jest.fn();
      const mockEvent = createMockEvent();

      // Example of testing event handler
      mockClick(mockEvent);
      
      expect(mockClick).toHaveBeenCalledTimes(1);
      expect(mockClick).toHaveBeenCalledWith(mockEvent);
    });

    it('should prevent default behavior', () => {
      const mockEvent = createMockEvent();
      const handler = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
      };

      handler(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('Props Validation', () => {
    it('should validate required props', () => {
      const props: ButtonProps = {
        onClick: jest.fn(),
        children: 'Click me'
      };

      expect(props).toHaveProperty('onClick');
      expect(props).toHaveProperty('children');
    });

    it('should handle optional props', () => {
      const props: ButtonProps = {
        onClick: jest.fn(),
        children: 'Click me',
        disabled: true
      };

      expect(props.disabled).toBeDefined();
      expect(typeof props.disabled).toBe('boolean');
    });
  });

  describe('Data Generation', () => {
    it('should generate test data', () => {
      const testUser = {
        id: generateTestData.number(),
        name: generateTestData.string(),
        email: generateTestData.email(),
        isActive: generateTestData.boolean(),
        tags: generateTestData.array(() => generateTestData.string())
      };

      expect(testUser.id).toBeGreaterThanOrEqual(0);
      expect(testUser.name).toHaveLength(10);
      expect(testUser.email).toMatch(/@.*\.com$/);
      expect(typeof testUser.isActive).toBe('boolean');
      expect(testUser.tags).toHaveLength(5);
    });
  });
});
