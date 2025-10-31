import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from './ProjectLink';
import { useAnalytics } from '@/hooks/useAnalytics';

const mockTrack = jest.fn();
jest.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    track: mockTrack,
  }),
}));

describe('ProjectLink', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  it('should call the track function on click', async () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Test Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    await userEvent.click(screen.getByRole('link'));
    expect(mockTrack).toHaveBeenCalledWith('ProjectLink Click', {
      href: 'https://example.com',
      title: 'Test Project',
    });
  });
});
