export const trackClick = (href: string, title: string) => {
  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ href, title }),
  });
};