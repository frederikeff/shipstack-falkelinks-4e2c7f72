import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ProjectLink', () => {
  it('renders the project link with the correct href and title', () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link', { name: /Test Project/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', project.href);

    const titleElement = screen.getByText(project.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the project image with the correct alt text', () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const imageElement = screen.getByAltText('Test Project logo');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', project.imageSrc);
  });
});
