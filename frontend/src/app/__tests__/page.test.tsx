import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /Frederike Falke/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all project links', () => {
    render(<Home />);
    const projectLinks = screen.getAllByRole('link', { name: /logo/i });
    expect(projectLinks).toHaveLength(3);
  });

  it('renders all lab grid items', () => {
    render(<Home />);
    const labGridItems = screen.getAllByRole('link', { name: /(Builder|Character|Research|Mind|Creator) Lab/i });
    expect(labGridItems).toHaveLength(5);
  });

  it('renders the email link', () => {
    render(<Home />);
    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toBeInTheDocument();
  });
});
