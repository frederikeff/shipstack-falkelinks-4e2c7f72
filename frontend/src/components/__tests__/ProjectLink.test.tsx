import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { event } from '@/lib/gtag';

jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}));

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const projectProps = {
    href: 'https://example.com',
    title: 'Example Project',
    imageSrc: 'https://example.com/image.png',
  };

  it('renders a link with the correct href', () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', projectProps.href);
  });

  it('renders an image with the correct src and alt text', () => {
    render(<ProjectLink {...projectProps} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(projectProps.imageSrc)));
    expect(image).toHaveAttribute('alt', `${projectProps.title} logo`);
  });

  it('renders the project title', () => {
    render(<ProjectLink {...projectProps} />);
    const title = screen.getByText(projectProps.title);
    expect(title).toBeInTheDocument();
  });

  it('calls the event function on click', async () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link');
    await userEvent.click(link);
    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: projectProps.title,
    });
  });
});
