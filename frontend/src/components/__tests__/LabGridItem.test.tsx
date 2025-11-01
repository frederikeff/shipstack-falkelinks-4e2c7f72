import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabGridItem from "../LabGridItem";
import * as analytics from "@/lib/analytics";

jest.mock("@/lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("LabGridItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should track an event when clicked", async () => {
    const props = {
      href: "/lab",
      title: "Test Lab",
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole("link", { name: /Test Lab/i });

    await userEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith("Lab Link Click", {
      title: props.title,
      href: props.href,
    });
  });
});
