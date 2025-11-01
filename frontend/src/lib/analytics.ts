export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    const payload = JSON.stringify({ eventName, data });
    navigator.sendBeacon("/api/track", payload);
  }
};
