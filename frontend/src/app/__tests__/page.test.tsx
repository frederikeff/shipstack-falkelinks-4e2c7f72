import { render, screen } from '@testing-library/react';
import Home from '../page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Home', () => {
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
    const labLinks = screen.getAllByRole('link', { name: /Lab/i });
    // This will also include the "Creative AI Lab" project link, so we expect 6
    expect(labLinks).toHaveLength(6);
  });

  it('renders the email link', () => {
    render(<Home />);
    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toBeInTheDocument();
  });
});