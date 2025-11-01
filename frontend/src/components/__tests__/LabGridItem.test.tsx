import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabGridItem from "../LabGridItem";
import * as gtag from "@/lib/gtag";

jest.mock("@/lib/gtag");

describe("LabGridItem", () => {
  it("should log an event when the link is clicked", async () => {
    const user = userEvent.setup();
    const logEventSpy = jest.spyOn(gtag, "logEvent");

    render(
      <LabGridItem
        href="https://www.creativeailab.ai/builder-lab"
        title="Builder Lab"
      />
    );

    const link = screen.getByRole("link", { name: "Builder Lab" });
    await user.click(link);

    expect(logEventSpy).toHaveBeenCalledWith(
      "Link Click",
      "Lab Grid Link",
      "Builder Lab"
    );
  });
});
