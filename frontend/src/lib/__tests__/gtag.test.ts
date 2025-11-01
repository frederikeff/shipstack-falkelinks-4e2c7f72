import { pageview, event } from '../gtag';

describe('gtag', () => {
  beforeEach(() => {
    // @ts-ignore
    delete window.gtag;
    process.env.NEXT_PUBLIC_GA_ID = 'test-ga-id';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA_ID = '';
  });

  describe('pageview', () => {
    it('should call window.gtag with config and page_path', () => {
      window.gtag = jest.fn();
      pageview('/test-url');
      expect(window.gtag).toHaveBeenCalledWith('config', 'test-ga-id', {
        page_path: '/test-url',
      });
    });

    it('should not call window.gtag if GA_TRACKING_ID is not set', () => {
      process.env.NEXT_PUBLIC_GA_ID = '';
      window.gtag = jest.fn();
      pageview('/test-url');
      expect(window.gtag).not.toHaveBeenCalled();
    });

    it('should not call window.gtag if it does not exist', () => {
      // @ts-ignore
      delete window.gtag;
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      pageview('/test-url');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('event', () => {
    it('should call window.gtag with event data', () => {
      window.gtag = jest.fn();
      const eventData = {
        action: 'click',
        category: 'Test',
        label: 'Test Label',
        value: 1,
      };
      event(eventData);
      expect(window.gtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'Test',
        event_label: 'Test Label',
        value: 1,
      });
    });

    it('should not call window.gtag if GA_TRACKING_ID is not set', () => {
        process.env.NEXT_PUBLIC_GA_ID = '';
        window.gtag = jest.fn();
        const eventData = {
          action: 'click',
          category: 'Test',
          label: 'Test Label',
          value: 1,
        };
        event(eventData);
        expect(window.gtag).not.toHaveBeenCalled();
      });
  });
});
