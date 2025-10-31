
import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from './LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  it('renders the lab grid item and tracks clicks', () => {
    const props = {
      href: 'https://example.com/lab',
      title: 'Example Lab',
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link', { name: /Example Lab/i });
    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith('LabGridItem Click', {
      title: props.title,
      href: props.href,
    });
  });
});
