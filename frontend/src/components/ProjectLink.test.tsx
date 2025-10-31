
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from './ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  it('renders the project link and tracks clicks', () => {
    const props = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link', { name: /Example Project/i });
    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith('ProjectLink Click', {
      title: props.title,
      href: props.href,
    });
  });
});
