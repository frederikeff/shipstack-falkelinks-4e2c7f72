import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as tracking from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  const labProps = {
    href: '/lab/example',
    title: 'Example Lab',
  };

  it('renders the lab grid item with the correct attributes', () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', labProps.href);
    expect(screen.getByText(labProps.title)).toBeInTheDocument();
  });

  it('calls trackEvent on click', () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(tracking.trackEvent).toHaveBeenCalledWith('Lab Link Click', {
      href: labProps.href,
      title: labProps.title,
    });
  });
});