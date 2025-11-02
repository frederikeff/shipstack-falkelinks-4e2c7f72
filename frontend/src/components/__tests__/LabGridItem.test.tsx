import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  const mockProps = {
    href: 'https://example.com/lab',
    title: 'Test Lab',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the lab link with the correct href', () => {
    render(<LabGridItem {...mockProps} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockProps.href);
  });

  it('renders the lab title', () => {
    render(<LabGridItem {...mockProps} />);
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('calls the analytics event function on click', () => {
    render(<LabGridItem {...mockProps} />);
    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: mockProps.title,
      value: 1,
    });
  });
});
