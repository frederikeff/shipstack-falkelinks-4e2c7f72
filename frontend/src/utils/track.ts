
export const trackClick = async (url: string, title: string) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, title }),
    });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};
