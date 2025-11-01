import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('Home page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'Frederike Falke' })).toBeInTheDocument();
  });

  it('should render all project links', () => {
    render(<Home />);
    expect(screen.getByText('Nxtconnect')).toBeInTheDocument();
    expect(screen.getByText('Creative Ai Lab')).toBeInTheDocument();
    expect(screen.getByText('Shaped.ai')).toBeInTheDocument();
  });

  it('should render all lab grid items', () => {
    render(<Home />);
    expect(screen.getByText('Builder Lab')).toBeInTheDocument();
    expect(screen.getByText('Character Lab')).toBeInTheDocument();
    expect(screen.getByText('Research Lab')).toBeInTheDocument();
    expect(screen.getByText('Mind Lab')).toBeInTheDocument();
    expect(screen.getByText('Creator Lab')).toBeInTheDocument();
  });

  it('should render the email link', () => {
    render(<Home />);
    expect(screen.getByText('Email Me')).toBeInTheDocument();
  });

  it('should call trackClick with the correct URL when the email link is clicked', () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(<Home />);
    fireEvent.click(screen.getByText('Email Me'));
    expect(trackClickSpy).toHaveBeenCalledWith('mailto:hi@creativeailab.ai');
  });
});
