import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  } as Response)
);

describe('ProjectLink', () => {
  it('sends an analytics event on click', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    );

    fireEvent.click(screen.getByRole('link'));

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
});
