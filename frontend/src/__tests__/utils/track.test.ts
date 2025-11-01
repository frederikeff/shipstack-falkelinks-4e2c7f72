import { trackLinkClick } from '@/utils/track';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('trackLinkClick', () => {
  it('should send a POST request to /api/track with the correct URL', async () => {
    const url = 'https://example.com';
    await trackLinkClick(url);

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
  });
});
