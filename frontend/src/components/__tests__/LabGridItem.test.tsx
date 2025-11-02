import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the lab grid item with the correct href and title', () => {
    const lab = {
      href: '/builder-lab',
      title: 'Builder Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link', { name: lab.title });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', lab.href);
  });

  it('calls the event function on click', async () => {
    const lab = {
      href: '/builder-lab',
      title: 'Builder Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    await userEvent.click(linkElement);

    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: 'Builder Lab',
      value: 1,
    });
  });
});
