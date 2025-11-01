import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call trackEvent on click', async () => {
    const project = {
      href: 'https://www.example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    const link = screen.getByRole('link', { name: /Example logo/i });
    await userEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('ProjectLink Click', {
      href: project.href,
      title: project.title,
    });
  });
});
