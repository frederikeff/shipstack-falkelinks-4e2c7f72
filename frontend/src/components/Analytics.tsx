'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { pageview } from '@/lib/gtag'

export default function Analytics() {
  const pathname = usePathname()
  const gaTrackingId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (gaTrackingId) {
      pageview(pathname)
    }
  }, [pathname, gaTrackingId])

  if (!gaTrackingId) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTrackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
