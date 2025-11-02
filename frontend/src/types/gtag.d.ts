interface Window {
  gtag: (
    type: 'config' | 'event',
    trackingId: string,
    options?: {
      page_path?: URL
      event_category?: string
      event_label?: string
      value?: number
    }
  ) => void
}
