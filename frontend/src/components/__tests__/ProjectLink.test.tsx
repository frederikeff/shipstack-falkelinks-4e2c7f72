import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '../ProjectLink';
import { event } from '@/lib/gtag';

// Mock the gtag module
jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}));

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const project = {
    href: 'https://www.example.com',
    title: 'My Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  it('renders a link with the correct href and accessible name', () => {
    render(<ProjectLink {...project} />);
    const link = screen.getByRole('link', { name: /my project/i });
    expect(link).toHaveAttribute('href', project.href);
  });

  it('calls the event tracker on click', async () => {
    render(<ProjectLink {...project} />);
    const link = screen.getByRole('link', { name: /my project/i });
    await userEvent.click(link);

    expect(event).toHaveBeenCalledTimes(1);
    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: project.title,
      value: 1,
    });
  });
});
