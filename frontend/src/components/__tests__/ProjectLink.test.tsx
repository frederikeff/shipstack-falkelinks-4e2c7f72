import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { track } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  track: jest.fn(),
}));

describe('ProjectLink', () => {
  const project = {
    href: 'https://www.example.com',
    title: 'Example Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  it('renders the project link with the correct href and title', () => {
    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', project.href);

    const titleElement = screen.getByText(project.title);
    expect(titleElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src');
  });

  it('calls the track function on click', async () => {
    render(<ProjectLink {...project} />);

    const linkElement = screen.getByRole('link');
    await userEvent.click(linkElement);

    expect(track).toHaveBeenCalledWith('ProjectLink Clicked', {
      href: project.href,
      title: project.title,
    });
  });
});
