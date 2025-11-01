/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactButton from "@/components/ContactButton";
import * as gtag from "@/lib/gtag";

jest.mock("@/lib/gtag");

describe("ContactButton", () => {
  it("should call gtag event on click", async () => {
    render(<ContactButton />);
    const link = screen.getByRole("link", { name: /Email Me/i });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledWith({
      action: "click",
      category: "Contact",
      label: "Email",
      value: 0,
    });
  });
});
