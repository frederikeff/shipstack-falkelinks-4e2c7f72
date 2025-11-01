export const trackClick = async (href: string, title: string) => {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ href, title }),
    });
  } catch (error) {
    console.error("Error tracking click:", error);
  }
};
