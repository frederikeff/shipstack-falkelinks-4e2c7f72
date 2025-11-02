import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabGridItem from "@/components/LabGridItem";
import * as gtag from "@/lib/gtag";

jest.mock("@/lib/gtag", () => ({
  event: jest.fn(),
}));

describe("LabGridItem", () => {
  const lab = {
    href: "https://www.creativeailab.ai/builder-lab",
    title: "Builder Lab",
  };

  it("should call gtag event on click", async () => {
    render(<LabGridItem {...lab} />);
    const link = screen.getByRole("link", { name: /Builder Lab/i });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledWith({
      action: "click",
      category: "Lab Grid Item",
      label: "Builder Lab",
      value: 1,
    });
  });
});
