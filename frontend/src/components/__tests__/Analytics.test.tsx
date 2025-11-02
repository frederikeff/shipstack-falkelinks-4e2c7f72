import { render } from '@testing-library/react'
import Analytics from '../Analytics'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview } from '@/lib/gtag'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('@/lib/gtag', () => ({
  pageview: jest.fn(),
  GA_TRACKING_ID: 'test-ga-id',
}))

jest.mock('next/script', () => {
  const Script = ({ src, id, dangerouslySetInnerHTML }: any) => {
    if (dangerouslySetInnerHTML) {
      return <script id={id} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
    }
    return <script id={id} src={src} />
  }
  return Script
})

describe('Analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the Google Analytics scripts', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/test')
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())

    const { container } = render(<Analytics />)

    const gtagScript = container.querySelector(
      'script[src="https://www.googletagmanager.com/gtag/js?id=test-ga-id"]'
    )
    const gtagInitScript = container.querySelector('script#gtag-init')

    expect(gtagScript).toBeInTheDocument()
    expect(gtagInitScript).toBeInTheDocument()
    expect(gtagInitScript?.innerHTML).toContain(
      "window.dataLayer = window.dataLayer || [];"
    )
  })

  it('calls pageview on route change', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/test')
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('foo=bar'))

    render(<Analytics />)

    expect(pageview).toHaveBeenCalledWith(new URL('/test?foo=bar', window.location.origin))
  })
})
