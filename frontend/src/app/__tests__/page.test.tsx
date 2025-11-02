import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends an analytics event on email link click', () => {
    const eventSpy = jest.spyOn(gtag, 'event');
    render(<Home />);

    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    fireEvent.click(emailLink);

    expect(eventSpy).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email',
      value: 1,
    });
  });
});
