import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";
import * as gtag from "@/lib/gtag";

jest.mock("@/lib/gtag");

describe("Home", () => {
  it("should log an event when the email link is clicked", async () => {
    const user = userEvent.setup();
    const logEventSpy = jest.spyOn(gtag, "logEvent");

    render(<Home />);

    const link = screen.getByRole("link", { name: "Email Me" });
    await user.click(link);

    expect(logEventSpy).toHaveBeenCalledWith(
      "Link Click",
      "Email Link",
      "hi@creativeailab.ai"
    );
  });
});
