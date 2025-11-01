export const trackEvent = async (eventName: string, properties: Record<string, any>) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: eventName, ...properties }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
