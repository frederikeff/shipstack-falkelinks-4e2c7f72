import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '@/components/ProjectLink';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  it('should call trackEvent on click', async () => {
    const project = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/80',
    };

    render(<ProjectLink {...project} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackEvent).toHaveBeenCalledWith('Project Link Click', {
      url: project.href,
      title: project.title,
    });
  });
});
