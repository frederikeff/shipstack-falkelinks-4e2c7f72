// src/app/__tests__/page.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import * as analytics from '@/utils/analytics';

describe('Home', () => {
  it('should call the track function on email link click', async () => {
    const trackSpy = jest.spyOn(analytics, 'track');
    render(<Home />);

    await userEvent.click(screen.getByText('Email Me'));

    expect(trackSpy).toHaveBeenCalledWith({
      eventName: 'emailLinkClicked',
      email: 'hi@creativeailab.ai',
    });
    trackSpy.mockRestore();
  });
});
