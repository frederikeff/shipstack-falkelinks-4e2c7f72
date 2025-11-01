import { render, screen } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';

describe('ProjectLink', () => {
  const project = {
    href: 'https://www.example.com',
    title: 'Test Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  it('renders a link with the correct href', () => {
    render(<ProjectLink {...project} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', project.href);
  });

  it('renders the project title', () => {
    render(<ProjectLink {...project} />);
    const title = screen.getByText(project.title);
    expect(title).toBeInTheDocument();
  });

  it('renders the project image with the correct alt text', () => {
    render(<ProjectLink {...project} />);
    const image = screen.getByAltText(`${project.title} logo`);
    expect(image).toBeInTheDocument();
  });
});
