import ReactGA from "react-ga4";
import { initGA, logEvent } from "@/lib/gtag";

jest.mock("react-ga4");

describe("gtag", () => {
  const GA_TRACKING_ID = "G-XXXXXXXXXX";

  beforeEach(() => {
    process.env.NEXT_PUBLIC_GA_ID = GA_TRACKING_ID;
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_GA_ID;
  });

  describe("initGA", () => {
    it("should initialize ReactGA with the tracking ID", () => {
      initGA();
      expect(ReactGA.initialize).toHaveBeenCalledWith(GA_TRACKING_ID);
    });

    it("should not initialize ReactGA if the tracking ID is not set", () => {
      delete process.env.NEXT_PUBLIC_GA_ID;
      initGA();
      expect(ReactGA.initialize).not.toHaveBeenCalled();
    });
  });

  describe("logEvent", () => {
    it("should log the event with the correct parameters", () => {
      logEvent("Link Click", "Project Link", "Nxtconnect");
      expect(ReactGA.event).toHaveBeenCalledWith({
        category: "Link Click",
        action: "Project Link",
        label: "Nxtconnect",
      });
    });

    it("should not log the event if the tracking ID is not set", () => {
      delete process.env.NEXT_PUBLIC_GA_ID;
      logEvent("Link Click", "Project Link", "Nxtconnect");
      expect(ReactGA.event).not.toHaveBeenCalled();
    });
  });
});
