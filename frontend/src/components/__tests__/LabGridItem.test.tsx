import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  track: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should call the track function with the correct data on click', async () => {
    const trackSpy = jest.spyOn(analytics, 'track');
    const props = {
      href: 'https://example.com',
      title: 'Example',
    };

    render(<LabGridItem {...props} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackSpy).toHaveBeenCalledWith('LabGridItem Click', {
      href: props.href,
      title: props.title,
    });
  });
});
