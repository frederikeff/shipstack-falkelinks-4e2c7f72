import { trackClick } from "../analytics";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

describe("trackClick", () => {
  it("sends a POST request to /api/track with the correct body", async () => {
    await trackClick("https://example.com", "Example");
    expect(fetch).toHaveBeenCalledWith("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        href: "https://example.com",
        title: "Example",
      }),
    });
  });
});
