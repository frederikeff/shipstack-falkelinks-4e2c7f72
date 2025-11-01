import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home page', () => {
  it('renders the main components', () => {
    render(<Home />);

    // Check for the main heading
    expect(screen.getByRole('heading', { name: /Frederike Falke/i })).toBeInTheDocument();

    // Check for project links
    expect(screen.getByRole('link', { name: /Nxtconnect/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Creative Ai Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Shaped.ai/i })).toBeInTheDocument();

    // Check for lab grid items
    expect(screen.getByRole('link', { name: /Builder Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Character Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Research Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Mind Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Creator Lab/i })).toBeInTheDocument();

    // Check for the email link
    expect(screen.getByRole('link', { name: /Email Me/i })).toBeInTheDocument();
  });
});
