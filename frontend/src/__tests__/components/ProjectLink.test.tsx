import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink component', () => {
  const project = {
    href: 'https://example.com',
    title: 'Example Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  it('should render the project title and image', () => {
    render(<ProjectLink {...project} />);
    expect(screen.getByText('Example Project')).toBeInTheDocument();
    expect(screen.getByAltText('Example Project logo')).toBeInTheDocument();
  });

  it('should call trackClick with the correct URL when clicked', () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(<ProjectLink {...project} />);
    fireEvent.click(screen.getByText('Example Project'));
    expect(trackClickSpy).toHaveBeenCalledWith('https://example.com');
  });
});
