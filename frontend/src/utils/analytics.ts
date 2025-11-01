export const trackClick = (eventName: string, data?: Record<string, any>) => {
  console.log(`[Analytics] Event: ${eventName}`, data);
};
