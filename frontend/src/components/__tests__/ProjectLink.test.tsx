import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the project link', () => {
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

  it('tracks the click event', async () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    const link = screen.getByRole('link', { name: /Example Project/i });
    await userEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('ProjectLink Click', {
      href: 'https://example.com',
      title: 'Example Project',
    });
  });
});
