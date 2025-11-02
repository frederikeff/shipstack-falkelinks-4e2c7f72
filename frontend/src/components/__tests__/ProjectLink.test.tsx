import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the project link', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example"
        imageSrc="https://via.placeholder.com/80"
      />
    );

    const link = screen.getByRole('link', { name: /Example logo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('sends an analytics event on click', () => {
    const eventSpy = jest.spyOn(gtag, 'event');
    render(
      <ProjectLink
        href="https://example.com"
        title="Example"
        imageSrc="https://via.placeholder.com/80"
      />
    );

    const link = screen.getByRole('link', { name: /Example logo/i });
    fireEvent.click(link);

    expect(eventSpy).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: 'Example',
      value: 1,
    });
  });
});
