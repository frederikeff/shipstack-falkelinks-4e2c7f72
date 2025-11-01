export const trackClick = (event: string, data: Record<string, unknown>) => {
  console.log(`[Analytics] Event: ${event}`, data);
};
