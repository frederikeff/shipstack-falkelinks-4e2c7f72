import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  it('fires a GA event on click', async () => {
    const user = userEvent.setup();
    render(
      <ProjectLink
        href="https://www.example.com"
        title="Test Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link');
    await user.click(link);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: 'Test Project',
      value: 0,
    });
  });
});
