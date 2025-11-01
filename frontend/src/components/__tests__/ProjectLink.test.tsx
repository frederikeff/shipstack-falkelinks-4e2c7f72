import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';

describe('ProjectLink', () => {
  it('renders the project link with the correct title and href', () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link', { name: /Test Project/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', project.href);
  });
});
