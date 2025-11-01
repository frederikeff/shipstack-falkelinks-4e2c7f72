import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('calls trackClick with the correct event name', async () => {
    render(<LabGridItem href="/test" title="Test Lab" />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith('Lab Grid Item Clicked: Test Lab');
  });
});
