import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  track: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should call the track function with the correct data on click', async () => {
    const trackSpy = jest.spyOn(analytics, 'track');
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackSpy).toHaveBeenCalledWith('ProjectLink Click', {
      href: props.href,
      title: props.title,
    });
  });
});
