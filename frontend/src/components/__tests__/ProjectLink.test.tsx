import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ProjectLink', () => {
  const mockProps = {
    href: 'https://example.com',
    title: 'Test Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  it('renders the link with the correct href', () => {
    render(<ProjectLink {...mockProps} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockProps.href);
  });

  it('renders the project title', () => {
    render(<ProjectLink {...mockProps} />);
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the image with the correct src and alt text', () => {
    render(<ProjectLink {...mockProps} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', mockProps.imageSrc);
    expect(imageElement).toHaveAttribute('alt', `${mockProps.title} logo`);
  });
});
