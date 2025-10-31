import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from './LabGridItem';
import { useAnalytics } from '@/hooks/useAnalytics';

const mockTrack = jest.fn();
jest.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    track: mockTrack,
  }),
}));

describe('LabGridItem', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  it('should call the track function on click', async () => {
    render(<LabGridItem href="/test-lab" title="Test Lab" />);

    await userEvent.click(screen.getByRole('link'));
    expect(mockTrack).toHaveBeenCalledWith('LabGridItem Click', {
      href: '/test-lab',
      title: 'Test Lab',
    });
  });
});
