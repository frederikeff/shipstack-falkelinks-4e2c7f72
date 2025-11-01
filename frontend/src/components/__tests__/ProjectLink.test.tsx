import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '@/components/ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls the event function on click', async () => {
    const user = userEvent.setup();
    render(
      <ProjectLink
        href="https://example.com"
        title="Test Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    await user.click(screen.getByRole('link'));

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: 'Test Project',
      value: 0,
    });
  });
});
