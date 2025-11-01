/**
 * @jest-environment jsdom
 */
describe('gtag', () => {
    const GA_TRACKING_ID = 'G-XXXXXXXXXX';

    beforeEach(() => {
      jest.resetModules();
      process.env.NEXT_PUBLIC_GA_ID = GA_TRACKING_ID;
      window.gtag = jest.fn();
    });

    afterEach(() => {
      delete process.env.NEXT_PUBLIC_GA_ID;
    });

    it('pageview should call window.gtag with config and page_path', async () => {
      const { pageview } = await import('../gtag');
      const url = new URL('http://localhost:3000');
      pageview(url);
      expect(window.gtag).toHaveBeenCalledWith('config', GA_TRACKING_ID, {
        page_path: url,
      });
    });

    it('event should call window.gtag with event and event properties', async () => {
        const { event } = await import('../gtag');
        const eventData = {
          action: 'click',
          category: 'Project Link',
          label: 'Nxtconnect',
          value: 0,
        };
        event(eventData);
        expect(window.gtag).toHaveBeenCalledWith('event', eventData.action, {
          event_category: eventData.category,
          event_label: eventData.label,
          value: eventData.value,
        });
      });
  });
