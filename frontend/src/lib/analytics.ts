
export const trackEvent = (eventName: string, data: Record<string, any>) => {
  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventName, ...data }),
  });
};
