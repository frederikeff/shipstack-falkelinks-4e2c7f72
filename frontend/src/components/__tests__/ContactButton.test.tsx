import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactButton from '../ContactButton';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ContactButton', () => {
  const contact = {
    href: 'mailto:test@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the contact button with the correct href', () => {
    render(<ContactButton {...contact} />);
    const link = screen.getByRole('link', { name: /Email Me/i });
    expect(link).toHaveAttribute('href', contact.href);
  });

  it('calls the event tracking function on click', async () => {
    render(<ContactButton {...contact} />);
    const link = screen.getByRole('link', { name: /Email Me/i });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact Button',
      label: contact.href,
      value: 0,
    });
  });
});
