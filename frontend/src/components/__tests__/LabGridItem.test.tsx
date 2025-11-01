import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { track } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  track: jest.fn(),
}));

describe('LabGridItem', () => {
  const lab = {
    href: '/builder-lab',
    title: 'Builder Lab',
  };

  it('renders the lab grid item with the correct href and title', () => {
    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', lab.href);

    const titleElement = screen.getByText(lab.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('calls the track function on click', async () => {
    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    await userEvent.click(linkElement);

    expect(track).toHaveBeenCalledWith('LabGridItem Clicked', {
      href: lab.href,
      title: lab.title,
    });
  });
});
