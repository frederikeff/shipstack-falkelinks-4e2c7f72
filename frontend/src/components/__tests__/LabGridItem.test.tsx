import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct href and title', () => {
    const lab = {
      href: '/test-lab',
      title: 'Test Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', lab.href);

    const titleElement = screen.getByText(lab.title);
    expect(titleElement).toBeInTheDocument();
  });
});
