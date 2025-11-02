export {};

declare global {
  interface Window {
    gtag?: (
      event: string,
      action: string,
      options?: { [key: string]: any }
    ) => void;
  }
}
