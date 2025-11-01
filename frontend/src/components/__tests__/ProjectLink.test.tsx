// frontend/src/components/__tests__/ProjectLink.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should track clicks', async () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(
      <ProjectLink
        href="https://example.com"
        title="Example"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClickSpy).toHaveBeenCalledWith('project_link_click', {
      href: 'https://example.com',
      title: 'Example',
    });
  });
});
