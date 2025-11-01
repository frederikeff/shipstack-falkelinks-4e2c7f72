import { render, screen, fireEvent } from "@testing-library/react";
import ProjectLink from "@/components/ProjectLink";
import fetchMock from "jest-fetch-mock";

describe("ProjectLink", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should send a POST request to /api/track on click", () => {
    const project = {
      href: "https://example.com",
      title: "Example",
      imageSrc: "https://via.placeholder.com/150",
    };

    render(<ProjectLink {...project} />);

    fireEvent.click(screen.getByText("Example"));

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual("/api/track");
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "projectLinkClick",
        title: project.title,
        href: project.href,
      }),
    });
  });
});
