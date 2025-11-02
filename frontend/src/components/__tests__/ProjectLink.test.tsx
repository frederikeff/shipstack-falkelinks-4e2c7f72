import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  it('should call the event function on click', async () => {
    const user = userEvent.setup();
    const eventSpy = jest.spyOn(gtag, 'event');
    render(
      <ProjectLink
        href="https://example.com"
        title="Test Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    await user.click(screen.getByRole('link'));

    expect(eventSpy).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: 'Test Project',
      value: 0,
    });
  });
});
