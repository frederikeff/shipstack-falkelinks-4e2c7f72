import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('Home', () => {
  it('should call the event function on email link click', async () => {
    const user = userEvent.setup();
    const eventSpy = jest.spyOn(gtag, 'event');
    render(<Home />);

    await user.click(screen.getByRole('link', { name: 'Email Me' }));

    expect(eventSpy).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email',
      value: 0,
    });
  });
});
