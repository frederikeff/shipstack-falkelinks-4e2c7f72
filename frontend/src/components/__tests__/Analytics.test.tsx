import { render, screen } from '@testing-library/react';
import Analytics from '@/components/Analytics';

jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: any) => {
    const { id, src, dangerouslySetInnerHTML } = props;
    const testId = id || src;
    const innerHTML = dangerouslySetInnerHTML ? dangerouslySetInnerHTML.__html : '';
    return (
      <div data-testid={testId} data-src={src}>
        {innerHTML}
      </div>
    );
  },
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/lib/gtag', () => ({
  ...jest.requireActual('@/lib/gtag'),
  GA_TRACKING_ID: 'test-id',
}));

describe('Analytics', () => {
  it('renders the Google Analytics scripts with the correct props', () => {
    render(<Analytics />);

    const script1 = screen.getByTestId(
      'https://www.googletagmanager.com/gtag/js?id=test-id'
    );
    expect(script1).toBeInTheDocument();
    expect(script1).toHaveAttribute(
      'data-src',
      'https://www.googletagmanager.com/gtag/js?id=test-id'
    );

    const script2 = screen.getByTestId('gtag-init');
    expect(script2).toBeInTheDocument();
    expect(script2).toHaveTextContent(
      "gtag('config', 'test-id'"
    );
  });
});
