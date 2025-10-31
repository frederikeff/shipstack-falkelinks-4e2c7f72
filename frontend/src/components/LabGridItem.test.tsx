import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from './LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('calls trackClick on click', () => {
    const props = {
      href: 'https://example.com',
      title: 'Example',
    };
    render(<LabGridItem {...props} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(analytics.trackClick).toHaveBeenCalledWith(props.href, props.title);
  });
});