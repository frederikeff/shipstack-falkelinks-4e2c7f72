import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Frederike Falke/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('calls logEvent with the correct parameters when the email link is clicked', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    await user.click(emailLink);

    expect(gtag.logEvent).toHaveBeenCalledWith('click', 'Contact Button', 'hi@creativeailab.ai');
  });
});
