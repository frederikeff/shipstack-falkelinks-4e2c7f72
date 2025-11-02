import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

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

    const titleElement = screen.getByText(project.title);
    expect(titleElement).toBeInTheDocument();

    const imageElement = screen.getByAltText(`${project.title} logo`);
    expect(imageElement).toHaveAttribute('src', project.imageSrc);
  });
});
