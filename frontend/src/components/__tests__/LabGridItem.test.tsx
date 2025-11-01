import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '@/components/LabGridItem';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call trackEvent on click', async () => {
    const lab = {
      href: 'https://example.com',
      title: 'Example Lab',
    };

    render(<LabGridItem {...lab} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackEvent).toHaveBeenCalledWith('LabGridItem Click', lab.href);
  });
});
