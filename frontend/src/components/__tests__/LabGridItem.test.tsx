import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  it('should call trackEvent on click', async () => {
    const trackEventSpy = jest.spyOn(analytics, 'trackEvent');
    const props = {
      href: 'https://example.com',
      title: 'Example',
    };

    render(<LabGridItem {...props} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackEventSpy).toHaveBeenCalledWith('Lab Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
