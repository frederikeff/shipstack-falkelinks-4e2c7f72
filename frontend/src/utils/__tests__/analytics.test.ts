import { track } from '../analytics';

describe('track', () => {
  it('should log the event name and data to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const eventName = 'test_event';
    const eventData = { foo: 'bar' };

    track(eventName, eventData);

    expect(consoleSpy).toHaveBeenCalledWith(
      `[Analytics] Event: ${eventName}`,
      eventData
    );

    consoleSpy.mockRestore();
  });
});
