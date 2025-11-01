// frontend/src/utils/__tests__/analytics.test.ts
import { trackClick } from '../analytics';

describe('analytics', () => {
  it('should log the event to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    trackClick('test_event', { foo: 'bar' });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Analytics event:',
      'test_event',
      { foo: 'bar' }
    );
    consoleSpy.mockRestore();
  });
});
