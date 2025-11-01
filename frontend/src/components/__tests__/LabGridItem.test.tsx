import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call trackEvent on click', async () => {
    const lab = {
      href: 'https://www.example.com',
      title: 'Example Lab',
    };

    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link', { name: /Example Lab/i });
    await userEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('LabGridItem Click', {
      href: lab.href,
      title: lab.title,
    });
  });
});
