import { render, screen } from '@testing-library/react';
import Home from '../page';
import '@testing-library/jest-dom';

// Mock the next/image component as we did in the component test
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Home page', () => {
  it('renders the project showcase with three project links', () => {
    render(<Home />);

    const nxtconnectLink = screen.getByRole('link', { name: /Nxtconnect/i });
    const creativeAiLabLink = screen.getByRole('link', { name: /Creative Ai Lab/i });
    const shapedAiLink = screen.getByRole('link', { name: /Shaped.ai/i });

    expect(nxtconnectLink).toBeInTheDocument();
    expect(nxtconnectLink).toHaveAttribute('href', 'https://www.nxtconnect.ai');

    expect(creativeAiLabLink).toBeInTheDocument();
    expect(creativeAiLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai');

    expect(shapedAiLink).toBeInTheDocument();
    expect(shapedAiLink).toHaveAttribute('href', 'https://www.shaped.ai');
  });

  it('renders the lab grid with five lab links', () => {
    render(<Home />);

    const builderLabLink = screen.getByRole('link', { name: /Builder Lab/i });
    const characterLabLink = screen.getByRole('link', { name: /Character Lab/i });
    const researchLabLink = screen.getByRole('link', { name: /Research Lab/i });
    const mindLabLink = screen.getByRole('link', { name: /Mind Lab/i });
    const creatorLabLink = screen.getByRole('link', { name: /Creator Lab/i });

    expect(builderLabLink).toBeInTheDocument();
    expect(builderLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai/builder-lab');

    expect(characterLabLink).toBeInTheDocument();
    expect(characterLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai/character-lab');

    expect(researchLabLink).toBeInTheDocument();
    expect(researchLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai/research-lab');

    expect(mindLabLink).toBeInTheDocument();
    expect(mindLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai/mind-lab');

    expect(creatorLabLink).toBeInTheDocument();
    expect(creatorLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai/creator-lab');
  });
});
