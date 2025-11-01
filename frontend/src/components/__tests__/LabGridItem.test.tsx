import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '@/components/LabGridItem';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  it('should call trackEvent on click', async () => {
    const lab = {
      href: 'https://example.com/lab',
      title: 'Example Lab',
    };

    render(<LabGridItem {...lab} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackEvent).toHaveBeenCalledWith('Lab Link Click', {
      url: lab.href,
      title: lab.title,
    });
  });
});
