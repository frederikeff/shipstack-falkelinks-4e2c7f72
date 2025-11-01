import { trackEvent } from '../analytics';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('trackEvent', () => {
  it('should call the track API with the correct event name', async () => {
    const eventName = 'test-event';
    await trackEvent(eventName);

    expect(global.fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName }),
    });
  });
});
