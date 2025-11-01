import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should call trackClick with the correct parameters when clicked', async () => {
    const props = {
      href: 'https://example.com',
      title: 'Example Lab',
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith('Lab Grid Item Click', {
      title: props.title,
      href: props.href,
    });
  });
});
