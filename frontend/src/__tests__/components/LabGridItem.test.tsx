
import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';
import { trackClick } from '@/utils/track';

jest.mock('@/utils/track', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('should render the lab grid item and track clicks', () => {
    render(
      <LabGridItem
        href="https://example.com"
        title="Example"
      />
    );

    const link = screen.getByRole('link', { name: /Example/i });
    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith('https://example.com', 'Example');
  });
});
