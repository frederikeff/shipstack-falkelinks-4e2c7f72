import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('LabGridItem', () => {
  it('should call trackClick with the correct href on click', async () => {
    const lab = {
      href: 'https://example.com/lab',
      title: 'Example Lab',
    };

    render(<LabGridItem {...lab} />);

    const linkElement = screen.getByRole('link', { name: /Example Lab/i });
    await userEvent.click(linkElement);

    expect(trackClick).toHaveBeenCalledWith(lab.href);
  });
});
