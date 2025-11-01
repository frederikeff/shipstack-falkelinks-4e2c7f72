import { trackEvent } from "../analytics";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Event tracked" }),
  } as Response),
);

describe("trackEvent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send a POST request to /api/track with the correct data", async () => {
    const event = "Test Event";
    const data = { foo: "bar" };

    await trackEvent(event, data);

    expect(global.fetch).toHaveBeenCalledWith("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event, ...data }),
    });
  });

  it("should log an error if the request fails", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Error",
      } as Response),
    );
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const event = "Test Event";
    const data = { foo: "bar" };

    await trackEvent(event, data);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to track event:",
      "Error",
    );

    consoleErrorSpy.mockRestore();
  });
});
