import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('LabGridItem', () => {
  const props = {
    href: '/test-lab',
    title: 'Test Lab',
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders the lab grid item with the correct href and title', () => {
    render(<LabGridItem {...props} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', props.href);

    const titleElement = screen.getByText(props.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('calls the analytics endpoint on click', () => {
    render(<LabGridItem {...props} />);

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

    expect(fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ href: props.href }),
    });
  });
});
