import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct href', () => {
    const lab = {
      href: '/test-lab',
      title: 'Test Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', lab.href);
  });

  it('calls trackClick with the correct arguments when clicked', async () => {
    const lab = {
      href: '/test-lab',
      title: 'Test Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    await userEvent.click(linkElement);

    expect(analytics.trackClick).toHaveBeenCalledWith('Lab Link Click', {
      title: lab.title,
    });
  });
});
