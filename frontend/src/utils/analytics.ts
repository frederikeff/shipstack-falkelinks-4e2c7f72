export const trackClick = async (url: string) => {
  try {
    await fetch('/api/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};
