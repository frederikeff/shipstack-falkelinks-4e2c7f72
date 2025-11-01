import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should call trackEvent on click', () => {
    const trackEventSpy = jest.spyOn(analytics, 'trackEvent');
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(trackEventSpy).toHaveBeenCalledWith('Project Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
