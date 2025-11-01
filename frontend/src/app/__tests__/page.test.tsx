import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('Home page', () => {
  it('should call trackClick with the correct mailto link on email button click', async () => {
    render(<Home />);

    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    await userEvent.click(emailLink);

    expect(trackClick).toHaveBeenCalledWith('mailto:hi@creativeailab.ai');
  });
});
