import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('Home page', () => {
  it('should call trackEvent when the contact button is clicked', async () => {
    render(<Home />);

    const contactButton = screen.getByText('Email Me');
    await userEvent.click(contactButton);

    expect(analytics.trackEvent).toHaveBeenCalledWith('Contact button clicked');
  });
});
