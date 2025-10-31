import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';

describe('ProjectLink', () => {
  it('renders the project link with the correct href, title, and image', () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', project.href);

    const headingElement = screen.getByRole('heading', { name: project.title });
    expect(headingElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(project.imageSrc)));
  });
});
