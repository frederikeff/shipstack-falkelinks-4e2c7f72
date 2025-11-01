import ReactGA from "react-ga4";

export const initGA = () => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (GA_TRACKING_ID) {
    ReactGA.initialize(GA_TRACKING_ID);
  }
};

export const logEvent = (category: string, action: string, label: string) => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (GA_TRACKING_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
