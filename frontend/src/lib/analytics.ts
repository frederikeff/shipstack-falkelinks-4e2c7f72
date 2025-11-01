// frontend/src/lib/analytics.ts
export const trackEvent = async (eventName: string) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
