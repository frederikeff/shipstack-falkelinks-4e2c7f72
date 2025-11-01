import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectLink from '@/components/ProjectLink';
import LabGridItem from '@/components/LabGridItem';
import * as analytics from '@/utils/analytics';

// Mock the analytics module
jest.mock('@/utils/analytics', () => ({
  trackClick: jest.fn(),
}));

describe('ProjectLink', () => {
  it('should call trackClick on click', async () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="/path/to/image.png"
      />
    );

    await userEvent.click(screen.getByRole('link'));

    expect(trackClickSpy).toHaveBeenCalledWith({
      Categorie: 'Project Link',
      Title: 'Example Project',
      Url: 'https://example.com',
    });
  });
});

describe('LabGridItem', () => {
  it('should call trackClick on click', async () => {
    const trackClickSpy = jest.spyOn(analytics, 'trackClick');
    render(<LabGridItem href="/lab" title="Test Lab" />);

    await userEvent.click(screen.getByRole('link'));

    expect(trackClickSpy).toHaveBeenCalledWith({
      Categorie: 'Lab Grid',
      Title: 'Test Lab',
      Url: '/lab',
    });
  });
});
