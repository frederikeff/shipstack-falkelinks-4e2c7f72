import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));


describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Frederike Falke/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('fires a GA event when the email link is clicked', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    await user.click(emailLink);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email Me',
      value: 0,
    });
  });
});
