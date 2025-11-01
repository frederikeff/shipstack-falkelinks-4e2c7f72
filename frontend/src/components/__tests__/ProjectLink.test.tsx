import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectLink from "../ProjectLink";
import * as analytics from "@/lib/analytics";

jest.mock("@/lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("ProjectLink", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should track an event when clicked", async () => {
    const props = {
      href: "https://example.com",
      title: "Example",
      imageSrc: "/example.png",
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole("link", { name: /Example/i });

    await userEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith("Project Link Click", {
      title: props.title,
      href: props.href,
    });
  });
});
