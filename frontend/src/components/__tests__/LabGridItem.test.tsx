import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  const lab = {
    href: '/test-lab',
    title: 'Test Lab',
  };

  it('renders the lab grid item with the correct href and title', () => {
    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', lab.href);

    const titleElement = screen.getByText(lab.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('calls trackClick with the correct parameters when clicked', () => {
    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

    expect(trackClick).toHaveBeenCalledWith('Lab Link Click', {
      title: lab.title,
      href: lab.href,
    });
  });
});
