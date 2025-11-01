// src/components/__tests__/LabGridItem.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabGridItem from '../LabGridItem';
import * as analytics from '@/utils/analytics';

describe('LabGridItem', () => {
  it('should call the track function on click', async () => {
    const trackSpy = jest.spyOn(analytics, 'track');
    const lab = {
      href: 'https://example.com',
      title: 'Example',
    };
    render(<LabGridItem {...lab} />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackSpy).toHaveBeenCalledWith({
      eventName: 'labGridItemClicked',
      title: lab.title,
      href: lab.href,
    });
    trackSpy.mockRestore();
  });
});
