import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('Home Page', () => {
  it('renders the email link and tracks clicks', async () => {
    render(<Home />);

    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toBeInTheDocument();

    await userEvent.click(emailLink);

    expect(analytics.trackEvent).toHaveBeenCalledWith('Email Link Click', {
      email: 'hi@creativeailab.ai',
    });
  });
});
