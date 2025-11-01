import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  const lab = {
    href: '/lab/example',
    title: 'Example Lab',
  };

  it('renders the lab grid item with the correct title and href', () => {
    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link', { name: /Example Lab/i });
    expect(link).toHaveAttribute('href', lab.href);
  });

  it('calls logEvent with the correct parameters when clicked', async () => {
    const user = userEvent.setup();
    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link', { name: /Example Lab/i });
    await user.click(link);

    expect(gtag.logEvent).toHaveBeenCalledWith('click', 'Lab Grid Item', lab.title);
  });
});
