export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify({ eventName, ...data })], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
  }
};
