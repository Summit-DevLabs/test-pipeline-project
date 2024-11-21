import { createMockResponse, wait, generateTestData } from '../utils/testUtils';

// Example API client function to test
const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

describe('API Testing Examples', () => {
  // Example of mocking fetch
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should handle successful API calls', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as jest.Mock).mockResolvedValue(createMockResponse(mockData));

    const result = await fetchData('/api/test');
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/test');
  });

  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(createMockResponse({ error: 'Not found' }, 404));

    await expect(fetchData('/api/test')).rejects.toThrow('Network response was not ok');
  });

  it('should handle timeout scenarios', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => wait(1000));

    const promise = fetchData('/api/test');
    await expect(promise).rejects.toThrow();
  });
});
