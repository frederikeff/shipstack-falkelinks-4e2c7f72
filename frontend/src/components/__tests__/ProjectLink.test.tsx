import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '../ProjectLink';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('ProjectLink', () => {
  const mockProps = {
    href: 'https://example.com',
    title: 'Test Project',
    imageSrc: 'https://via.placeholder.com/150',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the project link with the correct href', () => {
    render(<ProjectLink {...mockProps} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockProps.href);
  });

  it('renders the project image with the correct src and alt text', () => {
    render(<ProjectLink {...mockProps} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement).toHaveAttribute('alt', `${mockProps.title} logo`);
  });

  it('renders the project title', () => {
    render(<ProjectLink {...mockProps} />);
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('calls the analytics event function on click', () => {
    render(<ProjectLink {...mockProps} />);
    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: mockProps.title,
      value: 1,
    });
  });
});
