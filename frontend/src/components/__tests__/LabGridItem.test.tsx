import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the lab grid item', () => {
    render(<LabGridItem href="/builder-lab" title="Builder Lab" />);

    const link = screen.getByRole('link', { name: /Builder Lab/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/builder-lab');
  });

  it('tracks the click event', async () => {
    render(<LabGridItem href="/builder-lab" title="Builder Lab" />);

    const link = screen.getByRole('link', { name: /Builder Lab/i });
    await userEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('LabGridItem Click', {
      href: '/builder-lab',
      title: 'Builder Lab',
    });
  });
});
