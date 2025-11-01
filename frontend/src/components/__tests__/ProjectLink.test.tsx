import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  const project = {
    href: 'https://example.com',
    title: 'Example Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  it('renders the project link with the correct title, href, and image', () => {
    render(<ProjectLink {...project} />);

    const link = screen.getByRole('link', { name: /Example Project/i });
    expect(link).toHaveAttribute('href', project.href);

    const image = screen.getByAltText('Example Project logo');
    expect(image).toBeInTheDocument();
  });

  it('calls logEvent with the correct parameters when clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectLink {...project} />);

    const link = screen.getByRole('link', { name: /Example Project/i });
    await user.click(link);

    expect(gtag.logEvent).toHaveBeenCalledWith('click', 'Project Link', project.title);
  });
});
