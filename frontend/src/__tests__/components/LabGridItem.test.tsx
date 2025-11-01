import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';
import * as analytics from '@/utils/analytics';

jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('LabGridItem component', () => {
  const lab = {
    href: 'https://example.com/lab',
    title: 'Example Lab',
  };

  it('should render the lab title', () => {
    render(<LabGridItem {...lab} />);
    expect(screen.getByText('Example Lab')).toBeInTheDocument();
  });

  it('should call trackClick with the correct URL when clicked', () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(<LabGridItem {...lab} />);
    fireEvent.click(screen.getByText('Example Lab'));
    expect(trackClickSpy).toHaveBeenCalledWith('https://example.com/lab');
  });
});
