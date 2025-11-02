import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import * as gtag from '@/lib/gtag';

// Mock the gtag module
jest.mock('@/lib/gtag');

describe('Home page', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  it('calls the gtag event function on email link click', async () => {
    render(<Home />);
    const emailLink = screen.getByRole('link', { name: 'Email Me' });
    await userEvent.click(emailLink);
    expect(gtag.event).toHaveBeenCalledTimes(1);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email Me',
      value: 1,
    });
  });
});
