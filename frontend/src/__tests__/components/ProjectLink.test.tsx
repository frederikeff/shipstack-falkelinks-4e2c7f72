
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';
import { trackEvent } from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should render the project link and track clicks', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link', { name: /Example Project/i });
    fireEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('project_link_click', {
      href: 'https://example.com',
      title: 'Example Project',
    });
  });
});
