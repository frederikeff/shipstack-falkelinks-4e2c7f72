import { trackClick } from '../analytics';

describe('trackClick', () => {
  it('logs the event name and properties to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const eventName = 'Test Event';
    const eventProperties = { foo: 'bar' };

    trackClick(eventName, eventProperties);

    expect(consoleSpy).toHaveBeenCalledWith(`[Analytics] Event: ${eventName}`, eventProperties);

    consoleSpy.mockRestore();
  });
});
