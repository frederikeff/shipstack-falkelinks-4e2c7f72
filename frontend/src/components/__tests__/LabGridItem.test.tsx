import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackEvent } from '@/lib/analytics';

// Mock the analytics module
jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  it('renders the lab title and link', () => {
    const title = 'Test Lab';
    const href = '/test-lab';
    render(<LabGridItem title={title} href={href} />);

    const linkElement = screen.getByRole('link', { name: title });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', href);
  });

  it('calls trackEvent on click', async () => {
    const title = 'Test Lab';
    const href = '/test-lab';
    render(<LabGridItem title={title} href={href} />);

    const linkElement = screen.getByRole('link', { name: title });
    await userEvent.click(linkElement);

    expect(trackEvent).toHaveBeenCalledWith('Lab Grid Item Click', { href, title });
  });
});
