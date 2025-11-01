import { render, screen } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';

describe('LabGridItem', () => {
  const lab = {
    href: 'https://www.example.com',
    title: 'Test Lab',
  };

  it('renders a link with the correct href', () => {
    render(<LabGridItem {...lab} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', lab.href);
  });

  it('renders the lab title', () => {
    render(<LabGridItem {...lab} />);
    const title = screen.getByText(lab.title);
    expect(title).toBeInTheDocument();
  });
});
