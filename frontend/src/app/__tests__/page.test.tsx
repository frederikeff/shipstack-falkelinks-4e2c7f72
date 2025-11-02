import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Home page', () => {
  it('renders all three project links', () => {
    render(<Home />);

    const nxtconnectLink = screen.getByRole('link', { name: /Nxtconnect logo Nxtconnect/i });
    expect(nxtconnectLink).toBeInTheDocument();
    expect(nxtconnectLink).toHaveAttribute('href', 'https://www.nxtconnect.ai');

    const creativeAiLabLink = screen.getByRole('link', { name: /Creative Ai Lab logo Creative Ai Lab/i });
    expect(creativeAiLabLink).toBeInTheDocument();
    expect(creativeAiLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai');

    const shapedAiLink = screen.getByRole('link', { name: /Shaped.ai logo Shaped.ai/i });
    expect(shapedAiLink).toBeInTheDocument();
    expect(shapedAiLink).toHaveAttribute('href', 'https://www.shaped.ai');
  });
});
