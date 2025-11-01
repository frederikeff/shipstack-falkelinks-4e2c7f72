import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  it('should call trackEvent on click', async () => {
    const lab = {
      href: 'https://example.com',
      title: 'Test Lab',
    };

    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith('Lab link clicked: Test Lab');
  });
});
