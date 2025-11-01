// A more robust analytics utility that can be extended for various providers.

interface AnalyticsEvent {
  name: string;
  params: Record<string, any>;
}

/**
 * A generic function to send analytics events.
 * For now, it logs to the console, but it can be extended
 * to send data to Google Analytics, etc.
 * @param event - The analytics event to send.
 */
const sendAnalyticsEvent = (event: AnalyticsEvent) => {
  // In the future, this could be replaced with a call to a real analytics provider.
  console.log(`[Analytics Event]: ${event.name}`, event.params);
};

/**
 * Tracks a click event.
 * @param eventName - The name of the click event.
 * @param data - Additional data associated with the event.
 */
export const trackClick = (eventName: string, data?: Record<string, any>) => {
  sendAnalyticsEvent({
    name: eventName,
    params: data || {},
  });
};
