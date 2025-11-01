
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('LabGridItem', () => {
  it('should call trackClick with the correct arguments when clicked', async () => {
    const props = {
      href: '/lab',
      title: 'Lab',
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(analytics.trackClick).toHaveBeenCalledWith('Lab Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
