import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';
import LabGridItem from '@/components/LabGridItem';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Event tracked' }),
  })
) as jest.Mock;

describe('Analytics Tracking', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should track clicks on ProjectLink', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    fireEvent.click(screen.getByText('Example Project'));

    expect(global.fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'project_link_click',
        title: 'Example Project',
        href: 'https://example.com',
      }),
    });
  });

  it('should track clicks on LabGridItem', () => {
    render(<LabGridItem href="/lab" title="Example Lab" />);

    fireEvent.click(screen.getByText('Example Lab'));

    expect(global.fetch).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'lab_grid_item_click',
        title: 'Example Lab',
        href: '/lab',
      }),
    });
  });
});
