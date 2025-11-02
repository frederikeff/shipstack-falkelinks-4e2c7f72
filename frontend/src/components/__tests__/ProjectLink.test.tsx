
import { render, screen } from '@testing-library/react';
import ProjectLink from '../ProjectLink';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ProjectLink', () => {
  it('renders a link with the correct href, title, and image', () => {
    const props = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: '/test-image.png',
    };

    render(<ProjectLink {...props} />);

    const link = screen.getByRole('link', { name: 'Test Project logo Test Project' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.href);

    const image = screen.getByAltText('Test Project logo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.imageSrc);
  });
});
