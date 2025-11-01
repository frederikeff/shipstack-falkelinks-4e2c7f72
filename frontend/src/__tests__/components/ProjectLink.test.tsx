import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;


describe('ProjectLink', () => {
  const props = {
    href: 'https://example.com',
    title: 'Test Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders the project link with the correct href, title, and image', () => {
    render(<ProjectLink {...props} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', props.href);

    const headingElement = screen.getByRole('heading', { name: props.title });
    expect(headingElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    // The src will be transformed by Next.js Image optimization
    // We check if the original src is part of the new src
    expect(imageElement.getAttribute('src')).toContain(
      encodeURIComponent(props.imageSrc)
    );
  });

  it('calls the analytics endpoint on click', () => {
    render(<ProjectLink {...props} />);

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ href: props.href }),
    });
  });
});
