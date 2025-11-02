import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders the link with the correct href and title', () => {
    const href = 'https://www.creativeailab.ai/builder-lab';
    const title = 'Builder Lab';

    render(<LabGridItem href={href} title={title} />);

    const link = screen.getByRole('link', { name: title });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', href);
  });
});
