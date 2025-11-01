import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  const lab = {
    href: '/lab',
    title: 'Example Lab',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the lab grid item with the correct href and title', () => {
    render(<LabGridItem {...lab} />);
    const link = screen.getByRole('link', { name: /Example Lab/i });
    expect(link).toHaveAttribute('href', lab.href);
  });

  it('calls the event tracking function on click', async () => {
    render(<LabGridItem {...lab} />);
    const link = screen.getByRole('link', { name: /Example Lab/i });
    await userEvent.click(link);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: lab.title,
      value: 0,
    });
  });
});
