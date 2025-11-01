
import { render, screen } from '@testing-library/react';
import LabGridItem from './LabGridItem';

describe('LabGridItem', () => {
  it('renders a link with the correct href and title', () => {
    const lab = {
      href: 'https://example.com/lab',
      title: 'Test Lab',
    };
    render(<LabGridItem {...lab} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', lab.href);
    expect(screen.getByText(lab.title)).toBeInTheDocument();
  });
});
