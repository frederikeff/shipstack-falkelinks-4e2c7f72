export const trackEvent = (eventName: string, eventData: Record<string, any>) => {
  const data = JSON.stringify({ eventName, ...eventData });
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', data);
  } else {
    // Fallback to fetch for older browsers
    fetch('/api/track', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  }
};
