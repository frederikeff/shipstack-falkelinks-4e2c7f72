import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('LabGrid', () => {
  it('renders all lab grid items', () => {
    render(<Home />);

    const labTitles = [
      'Builder Lab',
      'Character Lab',
      'Research Lab',
      'Mind Lab',
      'Creator Lab',
    ];

    labTitles.forEach(title => {
      expect(screen.getByRole('link', { name: title })).toBeInTheDocument();
    });
  });
});
