import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import { event } from '@/lib/gtag';

// Mock the gtag module
jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}));

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls the event tracker on email link click', async () => {
    render(<Home />);
    const emailLink = screen.getByRole('link', { name: /email me/i });
    await userEvent.click(emailLink);

    expect(event).toHaveBeenCalledTimes(1);
    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email',
      value: 1,
    });
  });
});
