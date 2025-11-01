import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('LabGridItem', () => {
  it('should call trackClick with the correct parameters when clicked', async () => {
    const lab = {
      href: 'https://example.com/lab',
      title: 'Example Lab',
    };

    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(trackClick).toHaveBeenCalledWith('Lab Link Clicked', {
      href: lab.href,
      title: lab.title,
    });
  });
});
