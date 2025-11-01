import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should call trackClick with the correct parameters when clicked', async () => {
    const props = {
      href: 'https://example.com',
      title: 'Example Project',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith('Project Link Click', {
      title: props.title,
      href: props.href,
    });
  });
});
