import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct href and title', () => {
    const props = {
      href: '/builder-lab',
      title: 'Builder Lab',
    };
    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link', { name: /Builder Lab/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.href);
  });
});
