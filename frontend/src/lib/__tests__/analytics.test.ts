import { trackEvent } from '../analytics';

describe('trackEvent', () => {
  const sendBeacon = jest.fn();

  beforeAll(() => {
    Object.defineProperty(navigator, 'sendBeacon', {
      value: sendBeacon,
      writable: true,
    });
  });

  beforeEach(() => {
    sendBeacon.mockClear();
  });

  it('sends an analytics event using navigator.sendBeacon', () => {
    trackEvent('test-event', { foo: 'bar' });

    expect(sendBeacon).toHaveBeenCalledTimes(1);
    const [url, blob] = sendBeacon.mock.calls[0];
    expect(url).toBe('/api/track');
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/json');
  });
});
