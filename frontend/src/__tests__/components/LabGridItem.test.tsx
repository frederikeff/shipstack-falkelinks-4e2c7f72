
import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';
import { trackEvent } from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should render the lab grid item and track clicks', () => {
    render(<LabGridItem href="/lab" title="Test Lab" />);

    const link = screen.getByRole('link', { name: /Test Lab/i });
    fireEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('lab_grid_item_click', {
      href: '/lab',
      title: 'Test Lab',
    });
  });
});
