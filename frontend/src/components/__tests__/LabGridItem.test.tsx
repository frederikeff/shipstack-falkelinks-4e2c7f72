
import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders a link with the correct href and title', () => {
    const props = {
      href: '/test-lab',
      title: 'Test Lab',
    };

    render(<LabGridItem {...props} />);

    const link = screen.getByRole('link', { name: 'Test Lab' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.href);
  });
});
