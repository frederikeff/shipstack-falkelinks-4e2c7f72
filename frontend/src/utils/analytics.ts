export const track = (eventName: string, eventData: Record<string, unknown>) => {
  console.log(`[Analytics] Event: ${eventName}`, eventData);
};
