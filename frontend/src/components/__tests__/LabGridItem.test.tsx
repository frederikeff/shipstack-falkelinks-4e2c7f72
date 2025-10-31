import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as trackUtils from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('calls trackClick with the correct href on click', () => {
    const props = {
      href: 'https://example.com/lab',
      title: 'Example Lab',
    };
    render(<LabGridItem {...props} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(trackUtils.trackClick).toHaveBeenCalledWith(props.href);
  });
});
