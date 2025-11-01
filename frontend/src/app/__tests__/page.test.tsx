// frontend/src/app/__tests__/page.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('Home page', () => {
  it('should track clicks on the email link', async () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(<Home />);

    const emailLink = screen.getByText('Email Me');
    await userEvent.click(emailLink);

    expect(trackClickSpy).toHaveBeenCalledWith('email_link_click', {
      href: 'mailto:hi@creativeailab.ai',
    });
  });
});
