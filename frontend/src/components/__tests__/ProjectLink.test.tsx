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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the project link with the correct href and title', () => {
    render(<ProjectLink {...project} />);
    const link = screen.getByRole('link', { name: /Example Project/i });
    expect(link).toHaveAttribute('href', project.href);
  });

  it('calls the event tracking function on click', async () => {
    render(<ProjectLink {...project} />);
    const link = screen.getByRole('link', { name: /Example Project/i });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: project.title,
      value: 0,
    });
  });
});
