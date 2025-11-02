interface Window {
  gtag: (
    type: "config" | "event",
    eventOrGAId: string,
    options?: {
      page_path?: URL;
      event_category?: string;
      event_label?: string;
      value?: number;
    }
  ) => void;
}
