export const trackClick = (eventName: string, eventProperties: Record<string, any>) => {
  console.log(`[Analytics] Event: ${eventName}`, eventProperties);
};
