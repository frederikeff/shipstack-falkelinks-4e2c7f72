import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tracks the click event', async () => {
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    await userEvent.click(screen.getByRole('link', { name: 'Example logo Example' }));

    expect(trackEvent).toHaveBeenCalledWith('Project Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
