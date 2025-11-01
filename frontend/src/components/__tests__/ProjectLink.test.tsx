import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  it('should call trackEvent on click', async () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(analytics.trackEvent).toHaveBeenCalledWith('Project link clicked: Test Project');
  });
});
