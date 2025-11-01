import { trackEvent } from '../analytics';

global.fetch = jest.fn();

describe('trackEvent', () => {
  it('sends a POST request to /api/track with the correct event data', () => {
    const eventName = 'Test Event';
    const eventData = { foo: 'bar' };
    trackEvent(eventName, eventData);
    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName, eventData }),
    });
  });
});
