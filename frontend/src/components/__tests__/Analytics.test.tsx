/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Analytics from '../Analytics';
import * as gtag from '@/lib/gtag';
import React from 'react';

// Mock the navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

// Mock the next/script component to render a plain script tag
jest.mock('next/script', () => {
  return ({ src, id, dangerouslySetInnerHTML, strategy }: { src?: string; id?: string; dangerouslySetInnerHTML?: { __html: string }; strategy?: string }) => {
    if (dangerouslySetInnerHTML) {
      return <script id={id} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
    }
    return <script src={src} />;
  };
});

// Mock the gtag library
jest.mock('@/lib/gtag');

describe('Analytics', () => {
  beforeEach(() => {
    // Clear mock history before each test
    jest.clearAllMocks();
    (window as any).gtag = jest.fn();
  });

  it('renders the Google Analytics scripts when GA_TRACKING_ID is present', () => {
    // Use a spy to mock the getter for the constant
    const mockedGtag = gtag as jest.Mocked<typeof gtag>;
    Object.defineProperty(mockedGtag, 'GA_TRACKING_ID', {
      get: jest.fn(() => 'G-XXXXXXXXXX'),
      configurable: true,
    });

    const { container } = render(<Analytics />);
    const scripts = container.querySelectorAll('script');

    expect(scripts).toHaveLength(2);
    expect(scripts[0].src).toContain('https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX');
    expect(scripts[1].innerHTML).toContain('window.dataLayer = window.dataLayer || [];');
    expect(mockedGtag.pageview).toHaveBeenCalled();
  });

  it('does not render scripts when GA_TRACKING_ID is not present', () => {
    const mockedGtag = gtag as jest.Mocked<typeof gtag>;
    Object.defineProperty(mockedGtag, 'GA_TRACKING_ID', {
      get: jest.fn(() => undefined),
      configurable: true,
    });

    const { container } = render(<Analytics />);
    const scripts = container.querySelectorAll('script');

    expect(scripts).toHaveLength(0);
    expect(mockedGtag.pageview).not.toHaveBeenCalled();
  });
});
