/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectLink from "@/components/ProjectLink";
import * as gtag from "@/lib/gtag";

jest.mock("@/lib/gtag");

describe("ProjectLink", () => {
  const project = {
    href: "https://www.nxtconnect.ai",
    title: "Nxtconnect",
    imageSrc: "https://ui-avatars.com/api/?name=NxtConnect&size=400&background=6366f1&color=fff&bold=true",
  };

  it("should call gtag event on click", async () => {
    render(<ProjectLink {...project} />);
    const link = screen.getByRole("link", { name: /Nxtconnect/i });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledWith({
      action: "click",
      category: "Project Link",
      label: "Nxtconnect",
      value: 0,
    });
  });
});
