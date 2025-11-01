
const getClientId = () => {
  if (typeof window === 'undefined') {
    return 'server';
  }
  let clientId = localStorage.getItem('clientId');
  if (!clientId) {
    clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('clientId', clientId);
  }
  return clientId;
};

export const trackEvent = async (eventName: string, data: Record<string, any>) => {
  try {
    const clientId = getClientId();
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName, clientId, ...data }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
