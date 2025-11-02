import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '@/components/ProjectLink';
import * as gtag from '@/lib/gtag';

// Mock the gtag module
jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  const projectProps = {
    href: 'https://www.example.com',
    title: 'Example Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  it('renders the project link with the correct attributes', () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link', { name: 'Example Project logo Example Project' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', projectProps.href);
    expect(screen.getByAltText('Example Project logo')).toBeInTheDocument();
  });

  it('calls the gtag event function on click', async () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link', { name: 'Example Project logo Example Project' });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledTimes(1);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: projectProps.title,
      value: 1,
    });
  });
});
