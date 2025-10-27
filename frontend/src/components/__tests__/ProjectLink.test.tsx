import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as track from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should call trackEvent on click', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example"
        imageSrc="https://via.placeholder.com/150"
      />
    );
    const link = screen.getByRole('link');
    link.click();
    expect(track.trackEvent).toHaveBeenCalledWith('Project Link Click', {
      href: 'https://example.com',
      title: 'Example',
    });
  });
});