
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectLink from "@/components/ProjectLink";
import * as analytics from "@/utils/analytics";

jest.mock("@/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("ProjectLink", () => {
  it("should call the trackEvent function on click", () => {
    const trackEventSpy = jest.spyOn(analytics, "trackEvent");
    render(
      <ProjectLink
        href="https://example.com"
        title="Example"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    fireEvent.click(screen.getByText("Example"));

    expect(trackEventSpy).toHaveBeenCalledWith("ProjectLink Click", {
      href: "https://example.com",
      title: "Example",
    });
  });
});
