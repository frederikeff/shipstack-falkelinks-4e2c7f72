export const trackEvent = async (
  event: string,
  data: Record<string, unknown>,
) => {
  try {
    const response = await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event, ...data }),
    });

    if (!response.ok) {
      console.error("Failed to track event:", response.statusText);
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};
