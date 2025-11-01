export const trackEvent = async (eventName: string, data: Record<string, any> = {}) => {
  try {
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: eventName, ...data }),
    });

    if (!response.ok) {
      console.error('Failed to track event:', response.statusText);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
