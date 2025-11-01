
import { trackEvent } from '@/utils/track';

global.fetch = jest.fn();

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('trackEvent', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    (fetch as jest.Mock).mockClear();
  });

  it('should generate a new client ID if one does not exist', async () => {
    await trackEvent('test_event', { foo: 'bar' });

    expect(localStorage.getItem('clientId')).not.toBeNull();
  });

  it('should reuse an existing client ID', async () => {
    localStorage.setItem('clientId', 'existing-client-id');
    await trackEvent('test_event', { foo: 'bar' });

    expect(localStorage.getItem('clientId')).toBe('existing-client-id');
  });

  it('should send the client ID in the request body', async () => {
    await trackEvent('test_event', { foo: 'bar' });
    const clientId = localStorage.getItem('clientId');

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: 'test_event',
        clientId,
        foo: 'bar',
      }),
    });
  });
});
