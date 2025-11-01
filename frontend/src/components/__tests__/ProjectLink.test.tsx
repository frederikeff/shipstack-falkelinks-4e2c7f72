
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  it('renders the project link with the correct href and title', () => {
    const project = {
      href: 'https://www.example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', project.href);
    expect(link).toHaveTextContent(project.title);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(project.imageSrc)));
    expect(image).toHaveAttribute('alt', `${project.title} logo`);
  });

  it('calls trackEvent on click', () => {
    const project = {
      href: 'https://www.example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(analytics.trackEvent).toHaveBeenCalledWith('Project Link Click', {
      title: project.title,
      href: project.href,
    });
  });
});
