export const trackEvent = (event: string, properties: Record<string, any> = {}) => {
  console.log(`[Analytics Event] ${event}`, properties);
};
