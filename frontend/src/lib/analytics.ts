export const trackEvent = (eventName: string, eventData: Record<string, unknown>) => {
  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventName, eventData }),
  });
};
