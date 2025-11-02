interface Window {
  gtag: (
    type: "config" | "event",
    trackingId: string,
    config?: {
      page_path?: URL;
      event_category?: string;
      event_label?: string;
      value?: number;
    }
  ) => void;
}
