// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  const gaTrackingId = process.env.NEXT_PUBLIC_GA_ID
  if (gaTrackingId && window.gtag) {
    window.gtag('config', gaTrackingId, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  const gaTrackingId = process.env.NEXT_PUBLIC_GA_ID
  if (gaTrackingId && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
