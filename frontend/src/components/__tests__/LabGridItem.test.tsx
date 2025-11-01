// frontend/src/components/__tests__/LabGridItem.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should track clicks', async () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(<LabGridItem href="/lab" title="Lab" />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClickSpy).toHaveBeenCalledWith('lab_grid_item_click', {
      href: '/lab',
      title: 'Lab',
    });
  });
});
