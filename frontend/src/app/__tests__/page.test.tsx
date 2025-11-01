import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('Home', () => {
  it('should call trackClick with the correct parameters when the email link is clicked', async () => {
    render(<Home />);

    const emailLink = screen.getByText('Email Me');
    await userEvent.click(emailLink);

    expect(trackClick).toHaveBeenCalledWith('Email Link Clicked', {
      href: 'mailto:hi@creativeailab.ai',
    });
  });
});
