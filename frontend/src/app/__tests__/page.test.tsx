import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('Home', () => {
  it('renders the heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /Frederike Falke/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('calls trackClick when the email link is clicked', async () => {
    render(<Home />);

    const emailLink = screen.getByText('Email Me');
    await userEvent.click(emailLink);

    expect(trackClick).toHaveBeenCalledWith('Email Link Clicked');
  });
});
