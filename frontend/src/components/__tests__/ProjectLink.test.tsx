import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  const project = {
    href: 'https://example.com',
    title: 'Test Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  it('renders the project link with the correct href, title, and image', () => {
    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', project.href);

    const titleElement = screen.getByText(project.title);
    expect(titleElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent(project.imageSrc)),
    );
  });

  it('calls trackClick with the correct parameters when clicked', () => {
    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

    expect(trackClick).toHaveBeenCalledWith('Project Link Click', {
      title: project.title,
      href: project.href,
    });
  });
});
