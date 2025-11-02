import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import * as gtag from "@/lib/gtag";

jest.mock("@/lib/gtag", () => ({
  event: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text
  default: () => <img />,
}));

describe("Home", () => {
  it("should call gtag event on email link click", async () => {
    render(<Home />);
    const emailLink = screen.getByRole("link", { name: /Email Me/i });
    await userEvent.click(emailLink);
    expect(gtag.event).toHaveBeenCalledWith({
      action: "click",
      category: "Contact",
      label: "Email",
      value: 1,
    });
  });
});
