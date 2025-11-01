import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectLink from "../ProjectLink";
import * as gtag from "@/lib/gtag";

jest.mock("@/lib/gtag");

describe("ProjectLink", () => {
  it("should log an event when the link is clicked", async () => {
    const user = userEvent.setup();
    const logEventSpy = jest.spyOn(gtag, "logEvent");

    render(
      <ProjectLink
        href="https://www.nxtconnect.ai"
        title="Nxtconnect"
        imageSrc="https://ui-avatars.com/api/?name=NxtConnect&size=400&background=6366f1&color=fff&bold=true"
      />
    );

    const link = screen.getByRole("link", { name: "Nxtconnect logo Nxtconnect" });
    await user.click(link);

    expect(logEventSpy).toHaveBeenCalledWith(
      "Link Click",
      "Project Link",
      "Nxtconnect"
    );
  });
});
