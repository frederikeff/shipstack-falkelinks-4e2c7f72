import { trackEvent } from '../analytics';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  } as Response)
);

describe('trackEvent', () => {
  it('should send a POST request to /api/track with the event data', async () => {
    await trackEvent('Test Event', { foo: 'bar' });

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName: 'Test Event', foo: 'bar' }),
    });
  });
});
