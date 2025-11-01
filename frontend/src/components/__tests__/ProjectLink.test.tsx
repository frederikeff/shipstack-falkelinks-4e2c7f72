import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';

describe('ProjectLink', () => {
  it('renders the project link with the correct href, title, and image', () => {
    const project = {
      href: 'https://www.example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const link = screen.getByRole('link', { name: /Example Project/i });
    expect(link).toHaveAttribute('href', project.href);

    const title = screen.getByText(project.title);
    expect(title).toBeInTheDocument();

    const image = screen.getByAltText(`${project.title} logo`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});
