import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as track from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should call trackClick on click', async () => {
    const user = userEvent.setup();
    render(
      <ProjectLink
        href="https://example.com"
        title="Example"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    await user.click(screen.getByRole('link'));

    expect(track.trackClick).toHaveBeenCalledWith('https://example.com');
  });
});
