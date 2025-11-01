import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import { track } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  track: jest.fn(),
}));

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /Frederike Falke/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all project links', () => {
    render(<Home />);
    const projectLinks = screen.getAllByRole('link', { name: /Nxtconnect|Creative Ai Lab|Shaped.ai/i });
    expect(projectLinks).toHaveLength(3);
  });

  it('renders all lab grid items', () => {
    render(<Home />);
    const labGridItems = screen.getAllByRole('link', { name: /Builder Lab|Character Lab|Research Lab|Mind Lab|Creator Lab/i });
    expect(labGridItems).toHaveLength(5);
  });

  it('renders the email link', () => {
    render(<Home />);
    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toBeInTheDocument();
  });

  it('calls the track function on email link click', async () => {
    render(<Home />);
    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    await userEvent.click(emailLink);
    expect(track).toHaveBeenCalledWith('EmailLink Clicked', {
      href: 'mailto:hi@creativeailab.ai',
    });
  });
});
