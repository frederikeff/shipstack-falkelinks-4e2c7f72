
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('Home', () => {
  it('renders the main page with all expected elements', () => {
    render(<Home />);

    expect(screen.getByAltText('Frederike Falke profile picture')).toBeInTheDocument();
    expect(screen.getByText('Frederike Falke')).toBeInTheDocument();

    expect(screen.getByText('Nxtconnect')).toBeInTheDocument();
    expect(screen.getByText('Creative Ai Lab')).toBeInTheDocument();
    expect(screen.getByText('Shaped.ai')).toBeInTheDocument();

    expect(screen.getByText('Builder Lab')).toBeInTheDocument();
    expect(screen.getByText('Character Lab')).toBeInTheDocument();
    expect(screen.getByText('Research Lab')).toBeInTheDocument();
    expect(screen.getByText('Mind Lab')).toBeInTheDocument();
    expect(screen.getByText('Creator Lab')).toBeInTheDocument();

    expect(screen.getByText('Email Me')).toBeInTheDocument();
  });

  it('calls trackEvent on email link click', () => {
    render(<Home />);
    const emailLink = screen.getByText('Email Me');
    fireEvent.click(emailLink);
    expect(analytics.trackEvent).toHaveBeenCalledWith('Email Link Click', {
      href: 'mailto:hi@creativeailab.ai',
    });
  });
});
