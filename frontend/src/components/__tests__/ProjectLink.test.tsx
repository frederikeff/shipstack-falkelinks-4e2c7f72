import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '@/components/ProjectLink';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call trackEvent on click', async () => {
    const project = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...project} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackEvent).toHaveBeenCalledWith('ProjectLink Click', project.href);
  });
});
