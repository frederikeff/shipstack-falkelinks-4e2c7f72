import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the project link with the correct href, title, and image', () => {
    const project = {
      href: 'https://www.example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link', { name: 'Test Project logo Test Project' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', project.href);

    const imageElement = screen.getByAltText('Test Project logo');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', project.imageSrc);
  });

  it('calls the event function on click', async () => {
    const project = {
      href: 'https://www.example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    await userEvent.click(linkElement);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: 'Test Project',
      value: 1,
    });
  });
});
