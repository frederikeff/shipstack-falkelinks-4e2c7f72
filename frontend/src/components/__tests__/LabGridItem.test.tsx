import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  it('should call trackEvent on click', async () => {
    const props = {
      href: '/lab',
      title: 'Lab',
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('Lab Link Click', {
      title: props.title,
      href: props.href,
    });
  });
});
