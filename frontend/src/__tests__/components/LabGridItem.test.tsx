import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('LabGridItem', () => {
  const labProps = {
    href: 'https://example.com/lab',
    title: 'Example Lab',
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders the lab grid item with the correct attributes', () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', labProps.href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByText(labProps.title)).toBeInTheDocument();
  });

  it('calls the trackClick function on click', () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ href: labProps.href }),
    });
  });
});
