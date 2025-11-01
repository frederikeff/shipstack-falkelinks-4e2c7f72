import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { event } from '@/lib/gtag';

// Mock the gtag module
jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}));

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const lab = {
    href: 'https://www.example.com/lab',
    title: 'My Lab',
  };

  it('renders a link with the correct href and title', () => {
    render(<LabGridItem {...lab} />);
    const link = screen.getByRole('link', { name: /my lab/i });
    expect(link).toHaveAttribute('href', lab.href);
    expect(screen.getByText(lab.title)).toBeInTheDocument();
  });

  it('calls the event tracker on click', async () => {
    render(<LabGridItem {...lab} />);
    const link = screen.getByRole('link', { name: /my lab/i });
    await userEvent.click(link);

    expect(event).toHaveBeenCalledTimes(1);
    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Link',
      label: lab.title,
      value: 1,
    });
  });
});
