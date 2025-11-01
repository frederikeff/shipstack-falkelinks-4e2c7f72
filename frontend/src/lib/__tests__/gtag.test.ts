/**
 * @jest-environment jsdom
 */

import { pageview, event } from "@/lib/gtag";

declare global {
  interface Window {
    gtag: any;
  }
}

describe("gtag", () => {
  beforeEach(() => {
    window.gtag = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("pageview", () => {
    it("should call window.gtag with the correct arguments", () => {
      const url = new URL("http://localhost:3000");
      pageview(url);
      expect(window.gtag).toHaveBeenCalledWith("config", "", {
        page_path: url,
      });
    });
  });

  describe("event", () => {
    it("should call window.gtag with the correct arguments", () => {
      const action = "click";
      const category = "Project Link";
      const label = "Nxtconnect";
      const value = 0;
      event({ action, category, label, value });
      expect(window.gtag).toHaveBeenCalledWith("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    });
  });
});
