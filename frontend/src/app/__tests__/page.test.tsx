import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('Home page', () => {
  it('should call trackEvent on email link click', async () => {
    const trackEventSpy = jest.spyOn(analytics, 'trackEvent');
    render(<Home />);

    await userEvent.click(screen.getByText('Email Me'));

    expect(trackEventSpy).toHaveBeenCalledWith('Email Link Click', {
      email: 'hi@creativeailab.ai',
    });
  });
});
