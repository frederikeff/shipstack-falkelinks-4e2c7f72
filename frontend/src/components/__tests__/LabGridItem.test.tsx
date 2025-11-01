import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders a link with the correct href and title', () => {
    const href = '/test-lab';
    const title = 'Test Lab';
    render(<LabGridItem href={href} title={title} />);

    const link = screen.getByRole('link', { name: title });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', href);
  });
});
