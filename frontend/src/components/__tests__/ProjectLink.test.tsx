// src/components/__tests__/ProjectLink.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/utils/analytics';

describe('ProjectLink', () => {
  it('should call the track function on click', async () => {
    const trackSpy = jest.spyOn(analytics, 'track');
    const project = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...project} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackSpy).toHaveBeenCalledWith({
      eventName: 'projectLinkClicked',
      title: project.title,
      href: project.href,
    });
    trackSpy.mockRestore();
  });
});
