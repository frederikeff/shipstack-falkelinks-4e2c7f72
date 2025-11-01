
import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct href and title', () => {
    const lab = {
      href: 'https://www.example.com/lab',
      title: 'Example Lab',
    };

    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', lab.href);
    expect(link).toHaveTextContent(lab.title);
  });

  it('calls trackEvent on click', () => {
    const lab = {
      href: 'https://www.example.com/lab',
      title: 'Example Lab',
    };

    render(<LabGridItem {...lab} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(analytics.trackEvent).toHaveBeenCalledWith('Lab Grid Item Click', {
      title: lab.title,
      href: lab.href,
    });
  });
});
