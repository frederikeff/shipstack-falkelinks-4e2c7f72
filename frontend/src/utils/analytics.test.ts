
import { trackEvent } from "@/utils/analytics";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe("Analytics utility", () => {
  it("should send a POST request to the track API with the correct data", async () => {
    await trackEvent("Test Event", { data: "test data" });

    expect(fetch).toHaveBeenCalledWith("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventName: "Test Event", data: "test data" }),
    });
  });
});
