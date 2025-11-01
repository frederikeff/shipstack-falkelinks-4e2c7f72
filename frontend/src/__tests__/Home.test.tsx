import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home page', () => {
  it('renders the main heading, project links, lab grid, and email link', () => {
    render(<Home />);

    const headingElement = screen.getByRole('heading', { name: /Frederike Falke/i });
    expect(headingElement).toBeInTheDocument();

    const projectLinks = screen.getAllByRole('link', { name: /Nxtconnect|Creative Ai Lab|Shaped.ai/i });
    expect(projectLinks).toHaveLength(3);

    const labGridItems = screen.getAllByRole('link', { name: /Builder Lab|Character Lab|Research Lab|Mind Lab|Creator Lab/i });
    expect(labGridItems).toHaveLength(5);

    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toBeInTheDocument();
  });
});
