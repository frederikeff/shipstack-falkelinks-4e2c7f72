export const trackEvent = async (event: string, data: Record<string, any> = {}) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, ...data }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
