import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  it('renders a link with the correct href, title, and alt text', () => {
    const props = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...props} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', props.href);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', `${props.title} logo`);
  });

  it('calls trackEvent with the correct parameters when clicked', async () => {
    const props = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...props} />);
    const link = screen.getByRole('link');
    await userEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith('Project Link Click', {
      title: props.title,
      href: props.href,
    });
  });
});
