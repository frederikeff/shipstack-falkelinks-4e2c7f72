import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  it('should call the event function on click', async () => {
    const user = userEvent.setup();
    const eventSpy = jest.spyOn(gtag, 'event');
    render(<LabGridItem href="/test" title="Test Lab" />);

    await user.click(screen.getByRole('link'));

    expect(eventSpy).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: 'Test Lab',
      value: 0,
    });
  });
});
