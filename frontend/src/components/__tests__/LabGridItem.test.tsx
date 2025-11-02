import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  it('fires a GA event on click', async () => {
    const user = userEvent.setup();
    render(<LabGridItem href="/test-lab" title="Test Lab" />);

    const link = screen.getByRole('link');
    await user.click(link);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: 'Test Lab',
      value: 0,
    });
  });
});
