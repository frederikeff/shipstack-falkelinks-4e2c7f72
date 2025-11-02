import { render, screen, within } from '@testing-library/react';
import Home from '../page';

describe('Home page', () => {
  it('renders the lab grid with 5 items', () => {
    render(<Home />);

    const labGrid = screen.getByTestId('lab-grid');
    const labGridItems = within(labGrid).getAllByRole('link');
    expect(labGridItems).toHaveLength(5);
  });
});
