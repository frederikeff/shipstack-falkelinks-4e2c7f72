import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  it('renders all three project links', () => {
    render(<Home />);

    const nxtconnectLink = screen.getByRole('link', { name: /Nxtconnect/i });
    expect(nxtconnectLink).toBeInTheDocument();

    const creativeAiLabLink = screen.getByRole('link', { name: /Creative Ai Lab/i });
    expect(creativeAiLabLink).toBeInTheDocument();

    const shapedAiLink = screen.getByRole('link', { name: /Shaped.ai/i });
    expect(shapedAiLink).toBeInTheDocument();
  });
});
