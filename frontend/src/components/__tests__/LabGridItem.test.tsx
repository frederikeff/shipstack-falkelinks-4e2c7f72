import { render, screen, fireEvent } from "@testing-library/react";
import LabGridItem from "../LabGridItem";
import { event } from "@/lib/gtag";

jest.mock("@/lib/gtag", () => ({
  event: jest.fn(),
}));

describe("LabGridItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the lab grid item with the correct href and title", () => {
    const lab = {
      href: "/lab/builder",
      title: "Builder Lab",
    };
    render(<LabGridItem {...lab} />);

    const link = screen.getByRole("link", { name: /builder lab/i });
    expect(link).toHaveAttribute("href", lab.href);
  });

  it("calls the event function on click", () => {
    const lab = {
      href: "/lab/builder",
      title: "Builder Lab",
    };
    render(<LabGridItem {...lab} />);

    const link = screen.getByRole("link", { name: /builder lab/i });
    fireEvent.click(link);

    expect(event).toHaveBeenCalledWith({
      action: "click",
      category: "Lab Grid Item",
      label: "Builder Lab",
      value: 1,
    });
  });
});
