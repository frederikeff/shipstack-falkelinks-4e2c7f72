import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactButton from '../ContactButton';
import { event } from '@/lib/gtag';

jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}));

describe('ContactButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a link with the correct href', () => {
    render(<ContactButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:hi@creativeailab.ai');
  });

  it('calls the event function on click', async () => {
    render(<ContactButton />);
    const link = screen.getByRole('link');
    await userEvent.click(link);
    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email',
    });
  });
});
