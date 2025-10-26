import { render, screen } from '@testing-library/react';
import LabGrid from '../LabGrid';
import { labs } from '@/data/labs';

describe('LabGrid', () => {
  it('renders the correct number of lab items', () => {
    render(<LabGrid />);
    const labItems = screen.getAllByRole('link');
    expect(labItems).toHaveLength(labs.length);
  });

  it('renders the lab items with the correct links, titles, and colors', () => {
    render(<LabGrid />);
    const labItems = screen.getAllByRole('link');

    labItems.forEach((item, index) => {
      expect(item).toHaveAttribute('href', labs[index].href);
      expect(item).toHaveTextContent(labs[index].title);
      expect(item).toHaveClass(labs[index].color);
    });
  });
});