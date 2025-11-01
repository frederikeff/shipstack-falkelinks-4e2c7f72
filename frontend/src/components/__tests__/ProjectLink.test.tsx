import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  it('should call trackEvent on click', async () => {
    const trackEventSpy = jest.spyOn(analytics, 'trackEvent');
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/80',
    };

    render(<ProjectLink {...props} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackEventSpy).toHaveBeenCalledWith('Project Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
