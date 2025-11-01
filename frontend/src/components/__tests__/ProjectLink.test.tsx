import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  it('renders the project link with the correct href', () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', project.href);
  });

  it('calls trackClick with the correct arguments when clicked', async () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    await userEvent.click(linkElement);

    expect(analytics.trackClick).toHaveBeenCalledWith('Project Link Click', {
      title: project.title,
    });
  });
});
