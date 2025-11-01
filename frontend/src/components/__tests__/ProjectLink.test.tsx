import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('ProjectLink', () => {
  it('should call trackClick with the correct parameters when clicked', async () => {
    const project = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith('Project Link Clicked', {
      href: project.href,
      title: project.title,
    });
  });
});
