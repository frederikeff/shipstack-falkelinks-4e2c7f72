
import { trackEvent } from '../analytics';

global.fetch = jest.fn();

describe('trackEvent', () => {
  it('sends a POST request to the analytics API with the correct data', () => {
    const eventName = 'Test Event';
    const data = { foo: 'bar' };

    trackEvent(eventName, data);

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName, ...data }),
    });
  });
});
