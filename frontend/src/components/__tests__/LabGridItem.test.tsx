import { render, screen } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import '@testing-library/jest-dom';

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct href and title', () => {
    const lab = {
      href: 'https://example.com/lab',
      title: 'Test Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link', { name: 'Test Lab' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', lab.href);

    const titleElement = screen.getByText(lab.title);
    expect(titleElement).toBeInTheDocument();
  });
});
