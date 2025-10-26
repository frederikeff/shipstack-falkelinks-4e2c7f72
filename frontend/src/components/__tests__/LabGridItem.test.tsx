import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct title and href', () => {
    const lab = {
      href: 'https://example.com',
      title: 'Test Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link', { name: /test lab/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', lab.href);
  });
});