// src/utils/__tests__/analytics.test.ts
import { track } from '../analytics';

describe('analytics', () => {
  it('should log the event to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const event = { eventName: 'testEvent', data: 'testData' };
    track(event);
    expect(consoleSpy).toHaveBeenCalledWith('Analytics Event:', event);
    consoleSpy.mockRestore();
  });
});
