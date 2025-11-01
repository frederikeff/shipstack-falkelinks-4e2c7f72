import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home page', () => {
  it('renders the Project Showcase section with three project links', () => {
    render(<Home />);

    const projectLinks = screen.getAllByRole('link', { name: /logo/i });
    expect(projectLinks).toHaveLength(3);
  });

  it('renders the Lab Grid section with five lab links', () => {
    render(<Home />);

    const labLinks = screen.getAllByRole('link', {
      name: /Builder Lab|Character Lab|Research Lab|Mind Lab|Creator Lab/i,
    });
    expect(labLinks).toHaveLength(5);
  });
});
