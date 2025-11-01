import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('ProjectLink', () => {
  it('should call trackEvent on click', async () => {
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackEvent).toHaveBeenCalledWith('Project Link Click', {
      title: props.title,
      href: props.href,
    });
  });
});
