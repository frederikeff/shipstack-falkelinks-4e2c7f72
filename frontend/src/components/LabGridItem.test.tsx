
import { render, screen, fireEvent } from "@testing-library/react";
import LabGridItem from "@/components/LabGridItem";
import * as analytics from "@/utils/analytics";

jest.mock("@/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("LabGridItem", () => {
  it("should call the trackEvent function on click", () => {
    const trackEventSpy = jest.spyOn(analytics, "trackEvent");
    render(<LabGridItem href="/lab" title="Lab" />);

    fireEvent.click(screen.getByText("Lab"));

    expect(trackEventSpy).toHaveBeenCalledWith("LabGridItem Click", {
      href: "/lab",
      title: "Lab",
    });
  });
});
