import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from './ProjectLink';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('calls trackClick on click', () => {
    const props = {
      href: 'https://example.com',
      title: 'Example',
      imageSrc: 'https://via.placeholder.com/150',
    };
    render(<ProjectLink {...props} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(analytics.trackClick).toHaveBeenCalledWith(props.href, props.title);
  });
});