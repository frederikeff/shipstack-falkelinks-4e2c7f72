import { trackEvent } from '../analytics';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('trackEvent', () => {
  it('should send a POST request to /api/track with the correct data', async () => {
    await trackEvent('test_event', { data: 'test_data' });

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: 'test_event', data: 'test_data' }),
    });
  });
});
