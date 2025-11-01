import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  } as Response)
);

describe('LabGridItem', () => {
  it('sends an analytics event on click', () => {
    render(<LabGridItem href="/lab" title="Test Lab" />);

    fireEvent.click(screen.getByRole('link'));

    expect(global.fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'lab_grid_item_click',
        title: 'Test Lab',
        href: '/lab',
      }),
    });
  });
});
