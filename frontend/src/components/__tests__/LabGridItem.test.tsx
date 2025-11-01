import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '@/components/LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls the event function on click', async () => {
    const user = userEvent.setup();
    render(<LabGridItem href="/test-lab" title="Test Lab" />);

    await user.click(screen.getByRole('link'));

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: 'Test Lab',
      value: 0,
    });
  });
});
