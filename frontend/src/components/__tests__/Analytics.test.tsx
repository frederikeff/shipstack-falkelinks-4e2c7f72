import { render, screen } from '@testing-library/react';
import Analytics from '@/components/Analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/gtag';

jest.mock('next/script', () => {
  const Script = (props: any) => {
    if (props.dangerouslySetInnerHTML) {
      return (
        <script
          {...props}
          dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
        />
      );
    }
    return <script {...props} />;
  };
  return Script;
});


jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/gtag', () => ({
  pageview: jest.fn(),
  GA_TRACKING_ID: 'test-ga-id',
}));

describe('Analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'production';
  });

  it('renders the Google Analytics scripts in production', () => {
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Analytics />);

    const script1 = screen.getByTestId('gtag-script');
    const script2 = screen.getByTestId('gtag-init-script');

    expect(script1).toHaveAttribute(
      'src',
      'https://www.googletagmanager.com/gtag/js?id=test-ga-id'
    );
    expect(script2).toHaveTextContent(
      /window.dataLayer = window.dataLayer || [];/
    );
  });

  it('does not render the Google Analytics scripts in development', () => {
    process.env.NODE_ENV = 'development';
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const { container } = render(<Analytics />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls pageview on route change', () => {
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Analytics />);

    expect(pageview).toHaveBeenCalledWith(new URL('/test-path', window.location.origin));
  });
});
