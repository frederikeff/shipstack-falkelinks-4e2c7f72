declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3?: object) => void;
  }
}

export const logEvent = (action: string, category: string, label: string) => {
  if (process.env.NODE_ENV === 'production' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};
