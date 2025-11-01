import { trackEvent } from '../analytics';

global.fetch = jest.fn();

describe('trackEvent', () => {
  it('sends a POST request to /api/track with the correct data', () => {
    trackEvent('test_event', { foo: 'bar' });

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: 'test_event', foo: 'bar' }),
    });
  });
});
