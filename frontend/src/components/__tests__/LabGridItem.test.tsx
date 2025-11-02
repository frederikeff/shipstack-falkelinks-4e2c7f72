import { render, screen, act } from '@testing-library/react';
import LabGridItem from '../LabGridItem';

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders a pulsing placeholder during loading', () => {
    const lab = {
      href: 'https://www.creativeailab.ai/builder-lab',
      title: 'Builder Lab',
    };

    render(<LabGridItem {...lab} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('animate-pulse');
  });

  it('renders a link with the correct href and title after loading', () => {
    const lab = {
      href: 'https://www.creativeailab.ai/builder-lab',
      title: 'Builder Lab',
    };

    render(<LabGridItem {...lab} />);

    act(() => {
      jest.runAllTimers();
    });

    const link = screen.getByRole('link', { name: lab.title });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', lab.href);
    expect(link).not.toHaveClass('animate-pulse');
  });
});
