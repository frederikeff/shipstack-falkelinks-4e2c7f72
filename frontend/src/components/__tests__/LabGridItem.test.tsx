import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as track from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackEvent: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should call trackEvent on click', () => {
    render(<LabGridItem href="/lab" title="Lab" />);
    const link = screen.getByRole('link');
    link.click();
    expect(track.trackEvent).toHaveBeenCalledWith('Lab Link Click', {
      href: '/lab',
      title: 'Lab',
    });
  });
});