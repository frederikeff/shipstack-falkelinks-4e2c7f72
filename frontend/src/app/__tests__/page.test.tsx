import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('Home page', () => {
  it('should call trackEvent when the email link is clicked', async () => {
    render(<Home />);

    await userEvent.click(screen.getByText('Email Me'));

    expect(trackEvent).toHaveBeenCalledWith('Email Link Click', {
      email: 'hi@creativeailab.ai',
    });
  });
});
