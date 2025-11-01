
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Frederike Falke/i })).toBeInTheDocument();
  });

  it('renders all project links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Nxtconnect/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Creative Ai Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Shaped.ai/i })).toBeInTheDocument();
  });

  it('renders all lab grid items', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Builder Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Character Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Research Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Mind Lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Creator Lab/i })).toBeInTheDocument();
  });

  it('renders the email me button', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Email Me/i })).toBeInTheDocument();
  });
});
