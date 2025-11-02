declare global {
  interface Window {
    gtag: (
      type: "config" | "event",
      trackingId: string,
      options: Record<string, unknown>
    ) => void;
  }
}

export {};
