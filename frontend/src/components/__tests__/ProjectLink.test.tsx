import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  it('sends a Google Analytics event on click', async () => {
    const user = userEvent.setup();
    render(
      <ProjectLink
        href="https://www.nxtconnect.ai"
        title="Nxtconnect"
        imageSrc="https://ui-avatars.com/api/?name=NxtConnect&size=400&background=6366f1&color=fff&bold=true"
      />
    );

    const link = screen.getByRole('link');
    await user.click(link);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: 'Nxtconnect',
      value: 0,
    });
  });
});
