import { trackEvent } from '../analytics';

describe('trackEvent', () => {
  it('should log the event and properties to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const event = 'Test Event';
    const properties = { foo: 'bar' };

    trackEvent(event, properties);

    expect(consoleSpy).toHaveBeenCalledWith(`[Analytics Event] ${event}`, properties);

    consoleSpy.mockRestore();
  });
});
