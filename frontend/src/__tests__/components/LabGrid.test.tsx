import { render, screen } from '@testing-library/react';
import LabGrid from '@/components/LabGrid';

describe('LabGrid', () => {
  it('renders all lab links', () => {
    render(<LabGrid />);

    const labLinks = screen.getAllByRole('link');
    expect(labLinks).toHaveLength(5);

    const labTitles = [
      'Builder Lab',
      'Character Lab',
      'Research Lab',
      'Mind Lab',
      'Creator Lab',
    ];
    labTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
