export const trackClick = async (event: { Categorie: string; Title: string; Url: string }) => {
  try {
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Failed to track event');
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
