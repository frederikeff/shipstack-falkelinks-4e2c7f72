export const trackEvent = async (eventName: string, details: Record<string, unknown>) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: eventName, ...details }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
