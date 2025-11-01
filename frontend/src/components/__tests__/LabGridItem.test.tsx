import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct href and title', () => {
    const lab = {
      href: 'https://www.example.com',
      title: 'Test Lab',
    };

    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link', { name: /Test Lab/i });
    expect(link).toHaveAttribute('href', lab.href);
  });
});
