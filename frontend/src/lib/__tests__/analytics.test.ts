import { trackEvent } from "../analytics";

describe("trackEvent", () => {
  const mockSendBeacon = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, "navigator", {
      value: {
        sendBeacon: mockSendBeacon,
      },
      writable: true,
    });
  });

  afterEach(() => {
    mockSendBeacon.mockClear();
  });

  it("should call navigator.sendBeacon with the correct payload", () => {
    const eventName = "Test Event";
    const data = { foo: "bar" };

    trackEvent(eventName, data);

    expect(mockSendBeacon).toHaveBeenCalledWith(
      "/api/track",
      JSON.stringify({ eventName, data })
    );
  });

  it("should handle events with no data", () => {
    const eventName = "Test Event with no data";

    trackEvent(eventName);

    expect(mockSendBeacon).toHaveBeenCalledWith(
      "/api/track",
      JSON.stringify({ eventName, data: undefined })
    );
  });
});
