import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  it('should call trackEvent on click', () => {
    const trackEventSpy = jest.spyOn(analytics, 'trackEvent');
    render(
      <ProjectLink
        href="/test"
        title="Test"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    fireEvent.click(screen.getByText('Test'));

    expect(trackEventSpy).toHaveBeenCalledWith('project_link_click', { href: '/test', title: 'Test' });
  });
});
