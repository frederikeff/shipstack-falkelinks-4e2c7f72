import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';
import * as tracking from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackEvent: jest.fn(),
}));

describe('Home Page', () => {
  it('calls trackEvent on email link click', () => {
    render(<Home />);
    const emailLink = screen.getByText('Email Me');
    fireEvent.click(emailLink);
    expect(tracking.trackEvent).toHaveBeenCalledWith('Email Link Click', {
      href: 'mailto:hi@creativeailab.ai',
    });
  });
});