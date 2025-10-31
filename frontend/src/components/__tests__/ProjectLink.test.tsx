import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as trackUtils from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('calls trackClick with the correct href on click', () => {
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...props} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(trackUtils.trackClick).toHaveBeenCalledWith(props.href);
  });
});
