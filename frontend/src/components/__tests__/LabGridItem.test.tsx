import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '@/components/LabGridItem';
import * as gtag from '@/lib/gtag';

// Mock the gtag module
jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  const labProps = {
    href: 'https://www.example.com',
    title: 'Example Lab',
  };

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  it('renders the lab grid item with the correct attributes', () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link', { name: 'Example Lab' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', labProps.href);
  });

  it('calls the gtag event function on click', async () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link', { name: 'Example Lab' });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledTimes(1);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: labProps.title,
      value: 1,
    });
  });
});
