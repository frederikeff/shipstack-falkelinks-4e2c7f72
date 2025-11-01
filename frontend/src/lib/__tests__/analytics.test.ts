import { trackEvent } from '@/lib/analytics';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('trackEvent', () => {
  it('should send a POST request to /api/track with the correct data', async () => {
    const eventName = 'test_event';
    const properties = { foo: 'bar' };

    await trackEvent(eventName, properties);

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: eventName, ...properties }),
    });
  });
});
