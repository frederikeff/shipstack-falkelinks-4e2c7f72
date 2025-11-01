import { trackEvent } from '../analytics';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('trackEvent', () => {
  it('should send a POST request to /api/track with the correct data', async () => {
    await trackEvent('test_event', { foo: 'bar' });

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName: 'test_event', foo: 'bar' }),
    });
  });
});
