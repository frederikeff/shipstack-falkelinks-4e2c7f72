import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import { trackEvent } from '@/lib/analytics';

jest.mock('@/lib/analytics');

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tracks the click event', async () => {
    const props = {
      href: '/lab',
      title: 'Test Lab',
    };

    render(<LabGridItem {...props} />);

    await userEvent.click(screen.getByRole('link', { name: 'Test Lab' }));

    expect(trackEvent).toHaveBeenCalledWith('Lab Link Click', {
      href: props.href,
      title: props.title,
    });
  });
});
