import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('ProjectLink', () => {
  it('should call trackClick with the correct href on click', async () => {
    const project = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link', { name: /Example Project/i });
    await userEvent.click(linkElement);

    expect(trackClick).toHaveBeenCalledWith(project.href);
  });
});
