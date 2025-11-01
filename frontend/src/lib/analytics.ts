export const trackEvent = (event: string, data: Record<string, any>) => {
  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event, ...data }),
  });
};
