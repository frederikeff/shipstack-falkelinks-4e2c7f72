
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('Home page', () => {
  it('renders the email link and tracks clicks', () => {
    render(<Home />);

    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toBeInTheDocument();

    fireEvent.click(emailLink);

    expect(analytics.trackEvent).toHaveBeenCalledWith('EmailLink Click', {
      href: 'mailto:hi@creativeailab.ai',
    });
  });
});
