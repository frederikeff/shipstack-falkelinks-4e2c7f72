import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  it('should call trackEvent on click', () => {
    const trackEventSpy = jest.spyOn(analytics, 'trackEvent');
    render(<LabGridItem href="/test" title="Test" />);

    fireEvent.click(screen.getByText('Test'));

    expect(trackEventSpy).toHaveBeenCalledWith('lab_grid_item_click', { href: '/test', title: 'Test' });
  });
});
