
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';
import { trackClick } from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should render the project link and track clicks', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link', { name: /Example/i });
    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith('https://example.com', 'Example');
  });
});
