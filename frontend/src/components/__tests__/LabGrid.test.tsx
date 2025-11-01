import { render, screen } from "@testing-library/react";
import LabGrid from "../LabGrid";

describe("LabGrid", () => {
  it("renders all lab links", () => {
    render(<LabGrid />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
    expect(screen.getByText("Builder Lab")).toBeInTheDocument();
    expect(screen.getByText("Character Lab")).toBeInTheDocument();
    expect(screen.getByText("Research Lab")).toBeInTheDocument();
    expect(screen.getByText("Mind Lab")).toBeInTheDocument();
    expect(screen.getByText("Creator Lab")).toBeInTheDocument();
  });
});
