import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as tracking from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  const projectProps = {
    href: 'https://example.com',
    title: 'Example Project',
    imageSrc: 'https://via.placeholder.com/80',
  };

  it('renders the project link with the correct attributes', () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', projectProps.href);
    expect(screen.getByText(projectProps.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${projectProps.title} logo`)).toBeInTheDocument();
  });

  it('calls trackEvent on click', () => {
    render(<ProjectLink {...projectProps} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(tracking.trackEvent).toHaveBeenCalledWith('Project Link Click', {
      href: projectProps.href,
      title: projectProps.title,
    });
  });
});