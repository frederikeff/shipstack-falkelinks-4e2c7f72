import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackClick } from '@/utils/analytics';

jest.mock('@/utils/analytics');

describe('LabGridItem', () => {
  it('should call trackClick with the correct parameters when clicked', async () => {
    render(<LabGridItem href="/lab" title="Test Lab" />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackClick).toHaveBeenCalledWith('lab_click', {
      href: '/lab',
      title: 'Test Lab',
    });
  });
});
