import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders a link with the correct href and title', () => {
    const href = '/test-lab';
    const title = 'Test Lab';

    render(<LabGridItem href={href} title={title} />);

    const linkElement = screen.getByRole('link', { name: title });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', href);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
