import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the ProjectLink component
jest.mock('@/components/ProjectLink', () => ({
  __esModule: true,
  default: ({ href, title }: { href: string; title: string }) => (
    <a href={href}>{title}</a>
  ),
}));

describe('Home Page', () => {
  it('renders all three project links', () => {
    render(<Home />);

    const nxtconnectLink = screen.getByRole('link', { name: 'Nxtconnect' });
    expect(nxtconnectLink).toBeInTheDocument();
    expect(nxtconnectLink).toHaveAttribute('href', 'https://www.nxtconnect.ai');

    const creativeAiLabLink = screen.getByRole('link', { name: 'Creative Ai Lab' });
    expect(creativeAiLabLink).toBeInTheDocument();
    expect(creativeAiLabLink).toHaveAttribute('href', 'https://www.creativeailab.ai');

    const shapedAiLink = screen.getByRole('link', { name: 'Shaped.ai' });
    expect(shapedAiLink).toBeInTheDocument();
    expect(shapedAiLink).toHaveAttribute('href', 'https://www.shaped.ai');
  });
});
