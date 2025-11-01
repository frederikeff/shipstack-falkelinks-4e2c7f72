import { trackEvent } from '../analytics';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('trackEvent', () => {
  it('sends a POST request to /api/track with the correct data', async () => {
    await trackEvent('Test Event', { foo: 'bar' });

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: 'Test Event', foo: 'bar' }),
    });
  });
});
