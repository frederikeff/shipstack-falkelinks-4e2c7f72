import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '@/components/ProjectLink';
import { trackEvent } from '@/lib/analytics';

// Mock the analytics module
jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  it('calls trackEvent on click', async () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link', { name: 'Test Project logo Test Project' });
    await userEvent.click(linkElement);

    expect(trackEvent).toHaveBeenCalledWith('Project Link Click', {
      href: project.href,
      title: project.title,
    });
  });
});
