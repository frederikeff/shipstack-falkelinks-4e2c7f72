import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  it('renders the project link and tracks clicks', async () => {
    const props = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link', { name: /Example Project/i });
    expect(link).toBeInTheDocument();

    await userEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith('Project Link Click', {
      title: props.title,
      href: props.href,
    });
  });
});
