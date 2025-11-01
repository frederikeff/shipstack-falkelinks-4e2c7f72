import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('Home', () => {
  it('sends a Google Analytics event on email link click', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const emailLink = screen.getByRole('link', { name: /email me/i });
    await user.click(emailLink);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email',
      value: 0,
    });
  });
});
