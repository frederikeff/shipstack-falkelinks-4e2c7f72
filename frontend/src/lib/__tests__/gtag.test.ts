describe("gtag", () => {
  const mockGtag = jest.fn();
  const GA_ID = "GA-TEST-ID";

  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_GA_ID = GA_ID;
    window.gtag = mockGtag;
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_GA_ID;
  });

  describe("pageview", () => {
    it("should call gtag with the correct parameters", () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { pageview } = require("@/lib/gtag");
      const url = new URL("https://example.com");
      pageview(url);
      expect(mockGtag).toHaveBeenCalledWith("config", GA_ID, {
        page_path: url,
      });
    });

    it("should not call gtag if GA_TRACKING_ID is not set", () => {
      delete process.env.NEXT_PUBLIC_GA_ID;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { pageview } = require("@/lib/gtag");
      const url = new URL("https://example.com");
      pageview(url);
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe("event", () => {
    it("should call gtag with the correct parameters", () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { event } = require("@/lib/gtag");
      const action = "click";
      const category = "Project Link";
      const label = "Nxtconnect";
      const value = 1;
      event({ action, category, label, value });
      expect(mockGtag).toHaveBeenCalledWith("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    });

    it("should not call gtag if GA_TRACKING_ID is not set", () => {
      delete process.env.NEXT_PUBLIC_GA_ID;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { event } = require("@/lib/gtag");
      const action = "click";
      const category = "Project Link";
      const label = "Nxtconnect";
      const value = 1;
      event({ action, category, label, value });
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });
});
