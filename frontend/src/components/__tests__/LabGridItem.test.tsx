import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as track from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should call trackClick on click', async () => {
    const user = userEvent.setup();
    render(<LabGridItem href="/lab" title="Lab" />);

    await user.click(screen.getByRole('link'));

    expect(track.trackClick).toHaveBeenCalledWith('/lab');
  });
});
