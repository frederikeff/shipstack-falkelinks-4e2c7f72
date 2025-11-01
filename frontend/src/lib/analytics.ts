export const trackEvent = (eventName: string, url: string) => {
  if (typeof navigator.sendBeacon === "function") {
    const data = JSON.stringify({ eventName, url });
    navigator.sendBeacon("/api/track", data);
  }
};
