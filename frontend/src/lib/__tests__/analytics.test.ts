import { trackEvent } from '../analytics';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
);

describe('trackEvent', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('sends a POST request to /api/track with the correct event data', async () => {
    const eventName = 'test-event';
    const eventData = { foo: 'bar' };

    await trackEvent(eventName, eventData);

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: eventName, ...eventData }),
    });
  });

  it('logs an error if the fetch request fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('Network error'));

    await trackEvent('test-event');

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error tracking event:', 'Network error');
    consoleErrorSpy.mockRestore();
  });

  it('logs an error if the response is not ok', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response)
    );

    await trackEvent('test-event');

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to track event:', 'Internal Server Error');
    consoleErrorSpy.mockRestore();
  });
});
