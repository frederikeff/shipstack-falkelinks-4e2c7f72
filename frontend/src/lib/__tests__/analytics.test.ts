import { trackEvent } from '../analytics';

describe('trackEvent', () => {
  const mockSendBeacon = jest.fn();

  beforeEach(() => {
    Object.defineProperty(navigator, 'sendBeacon', {
      value: mockSendBeacon,
      writable: true,
    });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call navigator.sendBeacon with the correct data', () => {
    trackEvent('testEvent', { data: 'test' });
    expect(mockSendBeacon).toHaveBeenCalledWith(
      '/api/track',
      JSON.stringify({ eventName: 'testEvent', data: 'test' })
    );
  });

  it('should fall back to fetch if navigator.sendBeacon is not available', () => {
    Object.defineProperty(navigator, 'sendBeacon', {
      value: undefined,
      writable: true,
    });
    trackEvent('testEvent', { data: 'test' });
    expect(global.fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventName: 'testEvent', data: 'test' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
