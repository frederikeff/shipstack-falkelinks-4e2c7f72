import { render, screen } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';

// Mock the Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ProjectLink', () => {
  const projectProps = {
    href: 'https://example.com',
    title: 'Test Project',
    imageSrc: 'https://via.placeholder.com/80',
  };

  it('renders the link with the correct href', () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', projectProps.href);
  });

  it('renders the project title', () => {
    render(<ProjectLink {...projectProps} />);
    expect(screen.getByText(projectProps.title)).toBeInTheDocument();
  });

  it('renders the image with the correct alt text', () => {
    render(<ProjectLink {...projectProps} />);
    const image = screen.getByAltText(`${projectProps.title} logo`);
    expect(image).toBeInTheDocument();
  });

  it('has the correct accessible name', () => {
    render(<ProjectLink {...projectProps} />);
    // The accessible name is a combination of the image alt text and the link text
    const link = screen.getByRole('link', { name: `${projectProps.title} logo ${projectProps.title}` });
    expect(link).toBeInTheDocument();
  });
});
