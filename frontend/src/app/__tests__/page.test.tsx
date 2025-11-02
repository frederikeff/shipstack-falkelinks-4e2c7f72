
import { render, screen } from '@testing-library/react';
import Home from '../page';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Home page', () => {
  it('renders all project links, lab grid items, and the contact button', () => {
    render(<Home />);

    // Check for profile picture and name
    expect(screen.getByAltText('Frederike Falke profile picture')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frederike Falke' })).toBeInTheDocument();

    // Check for all three project links
    expect(screen.getByRole('link', { name: 'Nxtconnect logo Nxtconnect' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Creative Ai Lab logo Creative Ai Lab' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shaped.ai logo Shaped.ai' })).toBeInTheDocument();

    // Check for all five lab grid items
    expect(screen.getByRole('link', { name: 'Builder Lab' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Character Lab' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Research Lab' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mind Lab' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Creator Lab' })).toBeInTheDocument();

    // Check for the contact button
    expect(screen.getByRole('link', { name: 'Email Me' })).toBeInTheDocument();
  });
});
