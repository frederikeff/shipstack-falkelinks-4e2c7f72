
import { render, screen } from '@testing-library/react';
import ProjectLink from './ProjectLink';

describe('ProjectLink', () => {
  it('renders a link with the correct href and title', () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...project} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', project.href);
    expect(screen.getByText(project.title)).toBeInTheDocument();
  });
});
