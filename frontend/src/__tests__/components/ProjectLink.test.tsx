import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('ProjectLink', () => {
  const projectProps = {
    href: 'https://example.com',
    title: 'Example Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders the project link with the correct attributes', () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', projectProps.href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByText(projectProps.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${projectProps.title} logo`)).toBeInTheDocument();
  });

  it('calls the trackClick function on click', () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ href: projectProps.href }),
    });
  });
});
