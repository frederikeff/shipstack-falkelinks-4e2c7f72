import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('ProjectLink', () => {
  it('should call trackClick with the correct parameters when clicked', async () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    await userEvent.click(screen.getByRole('link'));

    expect(trackClick).toHaveBeenCalledWith('project_click', {
      href: 'https://example.com',
      title: 'Example Project',
    });
  });
});
