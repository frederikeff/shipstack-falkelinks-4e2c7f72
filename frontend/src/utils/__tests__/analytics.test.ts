import { track } from '../analytics';

describe('track', () => {
  it('should log the event to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    track('TestEvent', { foo: 'bar' });
    expect(consoleSpy).toHaveBeenCalledWith('Analytics event: TestEvent', {
      foo: 'bar',
    });
  });
});
