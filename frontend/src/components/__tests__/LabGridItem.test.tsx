import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { event } from '@/lib/gtag';

jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}));

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const labProps = {
    href: '/lab',
    title: 'Test Lab',
  };

  it('renders a link with the correct href', () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', labProps.href);
  });

  it('renders the lab title', () => {
    render(<LabGridItem {...labProps} />);
    const title = screen.getByText(labProps.title);
    expect(title).toBeInTheDocument();
  });

  it('calls the event function on click', async () => {
    render(<LabGridItem {...labProps} />);
    const link = screen.getByRole('link');
    await userEvent.click(link);
    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: labProps.title,
    });
  });
});
