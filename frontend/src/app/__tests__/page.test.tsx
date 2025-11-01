import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls the event function on email link click', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole('link', { name: 'Email Me' }));

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email Me',
      value: 0,
    });
  });
});
