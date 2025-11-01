export const track = (eventName: string, eventProperties: Record<string, unknown>) => {
  console.log(`[Analytics] Event: ${eventName}`, eventProperties);
};
