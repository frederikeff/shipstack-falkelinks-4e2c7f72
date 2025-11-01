// src/utils/analytics.ts

interface TrackEvent {
  eventName: string;
  [key: string]: any;
}

export const track = (event: TrackEvent) => {
  // In a real application, this would send data to an analytics service
  console.log('Analytics Event:', event);
};
