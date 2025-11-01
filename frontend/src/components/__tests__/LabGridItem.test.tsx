import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  it('renders the lab grid item and tracks clicks', async () => {
    const props = {
      href: 'https://example.com/lab',
      title: 'Example Lab',
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link', { name: /Example Lab/i });
    expect(link).toBeInTheDocument();

    await userEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith('Lab Grid Item Click', {
      title: props.title,
      href: props.href,
    });
  });
});
