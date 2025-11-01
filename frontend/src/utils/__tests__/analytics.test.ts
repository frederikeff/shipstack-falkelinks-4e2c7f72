import { trackClick } from '../analytics';

describe('trackClick', () => {
  it('should log the clicked URL to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const testUrl = 'https://example.com';
    trackClick(testUrl);
    expect(consoleSpy).toHaveBeenCalledWith(`Link clicked: ${testUrl}`);
    consoleSpy.mockRestore();
  });
});
