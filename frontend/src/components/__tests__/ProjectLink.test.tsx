import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('calls trackClick with the correct event name', async () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Test Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith(
      'Project Link Clicked: Test Project'
    );
  });
});
