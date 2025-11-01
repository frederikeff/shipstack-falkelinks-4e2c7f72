import { render, screen, fireEvent } from "@testing-library/react";
import ProjectLink from "../ProjectLink";
import { event } from "@/lib/gtag";

jest.mock("@/lib/gtag", () => ({
  event: jest.fn(),
}));

describe("ProjectLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the project link with the correct href and title", () => {
    const project = {
      href: "https://example.com",
      title: "My Project",
      imageSrc: "https://via.placeholder.com/150",
    };
    render(<ProjectLink {...project} />);

    const link = screen.getByRole("link", { name: /my project/i });
    expect(link).toHaveAttribute("href", project.href);

    const image = screen.getByAltText("My Project logo");
    expect(image).toBeInTheDocument();
  });

  it("calls the event function on click", () => {
    const project = {
      href: "https://example.com",
      title: "My Project",
      imageSrc: "https://via.placeholder.com/150",
    };
    render(<ProjectLink {...project} />);

    const link = screen.getByRole("link", { name: /my project/i });
    fireEvent.click(link);

    expect(event).toHaveBeenCalledWith({
      action: "click",
      category: "Project Link",
      label: "My Project",
      value: 1,
    });
  });
});
