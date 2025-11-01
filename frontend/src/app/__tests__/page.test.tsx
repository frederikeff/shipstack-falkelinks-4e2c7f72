import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home page', () => {
  it('renders the lab grid with all five lab items', () => {
    render(<Home />);

    const labTitles = [
      'Builder Lab',
      'Character Lab',
      'Research Lab',
      'Mind Lab',
      'Creator Lab',
    ];

    labTitles.forEach(title => {
      const linkElement = screen.getByRole('link', { name: title });
      expect(linkElement).toBeInTheDocument();
    });
  });
});
