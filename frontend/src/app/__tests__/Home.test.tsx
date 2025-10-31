import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  it('renders the home page with all expected elements', () => {
    render(<Home />);

    // Check for the profile picture
    const profilePicture = screen.getByAltText('Frederike Falke profile picture');
    expect(profilePicture).toBeInTheDocument();

    // Check for the name
    const nameElement = screen.getByRole('heading', { name: 'Frederike Falke' });
    expect(nameElement).toBeInTheDocument();

    // Check for the project links
    const projectLinks = screen.getAllByRole('link', { name: /Nxtconnect|Creative Ai Lab|Shaped.ai/i });
    expect(projectLinks).toHaveLength(3);


    // Check for the lab grid items
    const labGridItems = screen.getAllByRole('link', { name: /Builder Lab|Character Lab|Research Lab|Mind Lab|Creator Lab/i });
    expect(labGridItems).toHaveLength(5);


    // Check for the email button
    const emailButton = screen.getByRole('link', { name: 'Email Me' });
    expect(emailButton).toBeInTheDocument();
  });
});
