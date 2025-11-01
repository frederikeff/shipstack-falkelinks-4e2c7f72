import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

describe("Home", () => {
  it("renders the main page with all the components", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /frederike falke/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /nxtconnect/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /creative ai lab/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shaped.ai/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /builder lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /character lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /research lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /mind lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /creator lab/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /email me/i })).toBeInTheDocument();
  });
});
