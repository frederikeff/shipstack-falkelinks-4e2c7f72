interface Window {
  gtag: (
    event: string,
    action: string,
    options?: {
      page_path?: URL;
      event_category?: string;
      event_label?: string;
      value?: number;
    }
  ) => void;
}
