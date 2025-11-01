import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem', () => {
  it('renders the lab grid item with the correct href and title', () => {
    render(<LabGridItem href="/lab" title="Test Lab" />);

    const link = screen.getByRole('link', { name: /Test Lab/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/lab');
  });

  it('calls trackClick with the correct href when clicked', async () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(<LabGridItem href="/lab" title="Test Lab" />);

    const link = screen.getByRole('link', { name: /Test Lab/i });
    await userEvent.click(link);

    expect(trackClickSpy).toHaveBeenCalledWith('/lab');
  });

  it('has the correct styling', () => {
    render(<LabGridItem href="/lab" title="Test Lab" />);

    const link = screen.getByRole('link', { name: /Test Lab/i });
    expect(link).toHaveClass('bg-gradient-to-br from-pink-500 to-purple-600');
  });
});
