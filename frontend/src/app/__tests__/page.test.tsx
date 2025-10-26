import { render, screen } from '@testing-library/react';
import Home from '../page';

jest.mock('@/data/projects', () => ({
  projects: [
    {
      href: 'https://www.nxtconnect.ai',
      title: 'Nxtconnect',
      imageSrc: 'https://ui-avatars.com/api/?name=NxtConnect&size=400&background=6366f1&color=fff&bold=true',
    },
  ],
}));

jest.mock('@/data/labs', () => ({
  labs: [
    { href: 'https://www.creativeailab.ai/builder-lab', title: 'Builder Lab' },
  ],
}));

describe('Home page', () => {
  it('renders the profile information', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /frederike falke/i })).toBeInTheDocument();
    expect(screen.getByAltText(/frederike falke profile picture/i)).toBeInTheDocument();
  });

  it('renders the project links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /nxtconnect/i })).toBeInTheDocument();
  });

  it('renders the lab grid items', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /builder lab/i })).toBeInTheDocument();
  });

  it('renders the email link', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /email me/i })).toBeInTheDocument();
  });
});