
export const trackEvent = async (eventName: string, data: Record<string, any>) => {
  await fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventName, ...data }),
  });
};
