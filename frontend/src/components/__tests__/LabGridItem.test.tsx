import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '../LabGridItem';
import * as gtag from '@/lib/gtag';

jest.mock('@/lib/gtag');

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the lab grid item', () => {
    render(<LabGridItem href="/builder-lab" title="Builder Lab" />);

    const link = screen.getByRole('link', { name: /Builder Lab/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/builder-lab');
  });

  it('sends an analytics event on click', () => {
    const eventSpy = jest.spyOn(gtag, 'event');
    render(<LabGridItem href="/builder-lab" title="Builder Lab" />);

    const link = screen.getByRole('link', { name: /Builder Lab/i });
    fireEvent.click(link);

    expect(eventSpy).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: 'Builder Lab',
      value: 1,
    });
  });
});
