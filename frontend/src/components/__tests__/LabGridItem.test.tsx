import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct title and href', () => {
    const lab = {
      href: '/builder-lab',
      title: 'Builder Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link', { name: /Builder Lab/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', lab.href);
  });
});
