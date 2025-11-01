import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should call trackEvent on click', () => {
    const trackEventSpy = jest.spyOn(analytics, 'trackEvent');
    const props = {
      href: 'https://example.com',
      title: 'Example',
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(trackEventSpy).toHaveBeenCalledWith('Lab Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
