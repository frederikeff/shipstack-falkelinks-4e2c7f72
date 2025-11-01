import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  it('sends a Google Analytics event on click', async () => {
    const user = userEvent.setup();
    render(
      <LabGridItem href="https://www.creativeailab.ai/builder-lab" title="Builder Lab" />
    );

    const link = screen.getByRole('link');
    await user.click(link);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: 'Builder Lab',
      value: 0,
    });
  });
});
