
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should call trackClick with the correct arguments when clicked', async () => {
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(analytics.trackClick).toHaveBeenCalledWith('Project Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
