import { trackClick } from '../analytics';

describe('analytics', () => {
  it('logs the event to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    trackClick('Test Event');
    expect(consoleSpy).toHaveBeenCalledWith('Analytics event: Test Event');
  });
});
