import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('renders the project link with the correct href and title', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link', { name: /Example Project/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('calls trackClick with the correct href when clicked', async () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link', { name: /Example Project/i });
    await userEvent.click(link);

    expect(trackClickSpy).toHaveBeenCalledWith('https://example.com');
  });
});
