import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';

describe('ProjectLink', () => {
  it('renders the project link with the correct href, title, and image', () => {
    const props = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link', { name: /Example Project/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.href);

    const image = screen.getByAltText(`${props.title} logo`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(props.imageSrc)));
  });
});
