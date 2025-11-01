export const track = (eventName: string, eventData: Record<string, any>) => {
  console.log(`Analytics event: ${eventName}`, eventData);
};
